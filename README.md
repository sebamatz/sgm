# SGM Software Developers Website

Website for SGM Software Developers, built with Next.js and deployed on Vercel.

## Features

- Modern, responsive design
- Multi-language support
- Secure contact form with email delivery
- Comprehensive anti-spam and bot protection

## Contact Form Setup

The contact form includes email delivery via Resend with multiple layers of security and spam protection.

### Required: Resend Configuration

To enable email delivery, you need to set up a Resend account and API key:

#### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

#### Step 2: Generate an API Key

1. Go to your [Resend Dashboard](https://resend.com/api-keys)
2. Click **Create API Key**
3. Give it a name (e.g., "SGM Website Contact Form")
4. Copy the API key (it starts with `re_`)

#### Step 3: Configure Environment Variables

Set the following environment variables in your Vercel project:

**Required:**
- `RESEND_API_KEY` - Your Resend API key (from Step 2)

**Optional:**
- `CONTACT_TO_EMAIL` - Recipient email address (defaults to sevastosmatzouranis@gmail.com)
- `CONTACT_FROM_EMAIL` - Sender email address (defaults to "SGM Website <onboarding@resend.dev>")
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key (public)
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key (server-side)

**Note:** The default sender email `onboarding@resend.dev` is provided by Resend for testing. For production use, you should verify your own domain in the Resend dashboard and update `CONTACT_FROM_EMAIL` to use your domain.

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
- Missing or invalid timestamps treated as suspicious

#### 4. Bot Protection
- **Vercel BotID**: Automatic invisible bot detection (no configuration needed, powered by Kasada)
- **Optional Cloudflare Turnstile**: Additional CAPTCHA layer if configured
- Both checks fail closed (deny access if verification fails)

#### 5. Rate Limiting
- Maximum 3 submissions per 10 minutes per IP address
- In-memory rate limiter (suitable for serverless)
- Returns 429 status when exceeded

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
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Testing the Contact Form

### Valid Submission
1. Fill name, email, and message
2. Wait at least 3 seconds after page load
3. Submit and verify email received
4. Check Reply-To is set to visitor's email

### Anti-Spam Tests
- **Honeypot**: Fill hidden field → silently rejected (appears successful, no email sent)
- **Speed check**: Submit in < 3 seconds → silently rejected
- **Missing timestamp**: Direct POST without timestamp → silently rejected
- **Rate limit**: Submit 4 times in 10 minutes → 4th returns 429 error
- **Too many links**: Include 3+ links in message → validation error
- **Bot detection**: Vercel BotID automatically blocks bots

### Security Tests
- **Header injection**: Name/email with newlines → validation error
- **HTML injection**: Message with `<script>` tags → HTML escaped in email

## Deployment

This project is configured for deployment on Vercel.

### Environment Variables for Vercel

1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (see `.env.example` for details):

**Required:**
- `RESEND_API_KEY` - Your Resend API key (get from resend.com/api-keys)

**Optional:**
- `CONTACT_TO_EMAIL` - Different recipient email (defaults to sevastosmatzouranis@gmail.com)
- `CONTACT_FROM_EMAIL` - Sender email address (defaults to "SGM Website <onboarding@resend.dev>")
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key

### Vercel BotID Configuration

Vercel BotID is automatically enabled when deployed on Vercel. For enhanced protection:

1. Go to your Vercel project dashboard
2. Navigate to **Firewall** tab
3. Click **Configure**
4. Enable **Vercel BotID Deep Analysis** (recommended for production)

No API keys or additional configuration needed - BotID works automatically.

## Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod
- **Email**: Resend
- **Bot Protection**: Vercel BotID (powered by Kasada)
- **Deployment**: Vercel

## License

Private - © SGM Software Developers
