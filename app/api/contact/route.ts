import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .refine((val) => !val.includes("\n") && !val.includes("\r"), {
      message: "Name cannot contain line breaks",
    }),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .refine((val) => !val.includes("\n") && !val.includes("\r"), {
      message: "Email cannot contain line breaks",
    }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  honeypot: z.string().optional(),
  timestamp: z.number().optional(),
  botToken: z.string().optional(),
});

const MINIMUM_SUBMIT_TIME = 3000;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const MAX_LINKS_IN_MESSAGE = 2;

const ipSubmissions = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = ipSubmissions.get(ip) || [];
  const recentSubmissions = submissions.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return true;
  }

  recentSubmissions.push(now);
  ipSubmissions.set(ip, recentSubmissions);

  setTimeout(() => {
    const current = ipSubmissions.get(ip) || [];
    const filtered = current.filter((time) => Date.now() - time < RATE_LIMIT_WINDOW);
    if (filtered.length === 0) {
      ipSubmissions.delete(ip);
    } else {
      ipSubmissions.set(ip, filtered);
    }
  }, RATE_LIMIT_WINDOW);

  return false;
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

function checkContentHeuristics(message: string): string | null {
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urls = message.match(urlPattern) || [];
  
  if (urls.length > MAX_LINKS_IN_MESSAGE) {
    return `Message contains too many links (max ${MAX_LINKS_IN_MESSAGE})`;
  }

  return null;
}

async function verifyBotProtection(
  request: Request,
  botToken?: string
): Promise<boolean> {
  const vercelBotScore = request.headers.get("x-vercel-bot-score");
  
  if (vercelBotScore !== null) {
    const score = parseFloat(vercelBotScore);
    if (score > 0.5) {
      console.warn(`Vercel BotID detected potential bot (score: ${score})`);
      return false;
    }
    return true;
  }

  if (process.env.TURNSTILE_SECRET_KEY && botToken) {
    try {
      const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const verifyResponse = await fetch(verifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: botToken,
        }),
      });

      const verifyData = await verifyResponse.json();
      return verifyData.success === true;
    } catch (error) {
      console.error("Turnstile verification error:", error);
      return true;
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: `Validation error: ${errors}` },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot, timestamp, botToken } = parsed.data;

    if (honeypot) {
      console.warn(`Honeypot triggered from IP: ${clientIp}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (timestamp) {
      const timeTaken = Date.now() - timestamp;
      if (timeTaken < MINIMUM_SUBMIT_TIME) {
        console.warn(`Submission too fast from IP: ${clientIp} (${timeTaken}ms)`);
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }

    const botCheckPassed = await verifyBotProtection(request, botToken);
    if (!botCheckPassed) {
      console.warn(`Bot protection failed from IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Bot protection verification failed" },
        { status: 403 }
      );
    }

    const contentError = checkContentHeuristics(message);
    if (contentError) {
      return NextResponse.json(
        { error: contentError },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      console.error("Missing Gmail credentials in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const sanitizedName = sanitizeHtml(name);
    const sanitizedMessage = sanitizeHtml(message);

    const mailOptions = {
      from: `SGM Website <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New contact form message from ${sanitizedName}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #111827; margin: 0 0 24px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">New Contact Form Submission</h2>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</p>
              <p style="margin: 0; color: #111827; font-size: 16px;">${sanitizedName}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
              <p style="margin: 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-size: 16px;">${email}</a></p>
            </div>
            <div style="margin-top: 24px;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb;">
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
              </div>
            </div>
          </div>
          <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center;">This message was sent via the contact form on sgmsoftware.gr</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
