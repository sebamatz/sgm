import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 🛠️ Configure the secure tunnel to Google SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🛠️ Construct the email packet
    const mailOptions = {
      from: `SGM Website <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends to your own inbox
      replyTo: email, // Hitting 'reply' replies to the client
      subject: `[SGM Inquiry] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #000; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">New Contact Request</h2>
          <p style="color: #333;"><strong>Name:</strong> ${name}</p>
          <p style="color: #333;"><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #2563eb;">
            <p style="color: #111; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
