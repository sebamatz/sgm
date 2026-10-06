# SGM Software Developers Website

Website for SGM Software Developers, built with Next.js and deployed on Vercel.

## Features

- Modern, responsive design
- Multi-language support
- Secure contact form with email delivery
- Comprehensive anti-spam and bot protection

## Contact Form Setup

The contact form includes email delivery to Gmail with multiple layers of security and spam protection.

### Required: Gmail Configuration

To enable email delivery, you need to set up a Gmail account with an App Password:

#### Step 1: Enable 2-Step Verification

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the steps to enable 2-Step Verification

#### Step 2: Create an App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** → **App passwords** (at the bottom)
3. Select **Mail** and **Other (Custom name)**
4. Enter "SGM Website Contact Form" as the name
5. Click **Generate**
6. Copy the 16-character password (without spaces)

#### Step 3: Configure Environment Variables

Set the following environment variables in your Vercel project:

**Required:**
- `GMAIL_USER` - Your Gmail address (e.g., hello@sgmsoftware.com)
- `GMAIL_APP_PASSWORD` - The 16-character App Password from Step 2

**Optional:**
- `CONTACT_TO_EMAIL` - Send emails to a different address (defaults to GMAIL_USER)

### Optional: Cloudflare Turnstile Bot Protection

By default, the contact form uses Vercel's built-in BotID on Vercel deployments. For additional protection or local development, you can optionally configure Cloudflare Turnstile:

1. Create a free account at [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Turnstile** and create a new site
3. Copy your Site Key and Secret Key
4. Set environment variables:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Your Turnstile site key (public)
   - `TURNSTILE_SECRET_KEY` - Your Turnstile secret key (server-side)

### Anti-Spam & Security Layers

The contact form includes multiple layers of protection:

#### 1. Server-Side Validation
- All fields validated with Zod schema
- Email format validation
- Length limits (name: 2-100 chars, email: max 255, message: 10-5000 chars)
- Header injection prevention (blocks newlines in name/email)
- HTML escaping in email body

#### 2. Honeypot Field
- Hidden field that legitimate users won't fill
- Bots that auto-fill all fields will be silently rejected

#### 3. Time-to-Submit Check
- Tracks when the form is loaded
- Rejects submissions completed in less than 3 seconds
- Prevents automated form submissions

#### 4. Bot Protection
- **Vercel deployments**: Automatically uses Vercel BotID (no configuration needed)
- **Optional**: Cloudflare Turnstile for additional protection
- Gracefully degrades in local development

#### 5. Rate Limiting
- Maximum 3 submissions per 10 minutes per IP address
- In-memory rate limiter (suitable for serverless)
- For production: Consider using Upstash Redis for distributed rate limiting

#### 6. Content Heuristics
- Rejects messages with more than 2 links
- Helps prevent spam and phishing attempts
- Low false-positive rate

### Email Template

Emails are sent with both plain text and HTML formatting:
- Clear subject line: "New contact form message from [Name]"
- Reply-To set to visitor's email for easy replies
- Professional HTML template with form data
- Plain text fallback for email clients that don't support HTML

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This project is configured for deployment on Vercel.

### Environment Variables for Vercel

1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (see `.env.example` for details):
   - `GMAIL_USER` (required)
   - `GMAIL_APP_PASSWORD` (required)
   - `CONTACT_TO_EMAIL` (optional)
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (optional)
   - `TURNSTILE_SECRET_KEY` (optional)

### Testing the Contact Form

1. Submit a valid form with your name, email, and message
2. Wait at least 3 seconds before submitting (time-to-submit check)
3. Check the recipient's inbox for the email
4. Verify the Reply-To is set to the visitor's email

**Test spam protection:**
- Fill the hidden honeypot field → should be silently accepted but not sent
- Submit faster than 3 seconds → should be silently accepted but not sent
- Submit more than 3 times in 10 minutes → should return rate limit error
- Include more than 2 links in message → should return validation error

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel

## License

Private - © SGM Software Developers
