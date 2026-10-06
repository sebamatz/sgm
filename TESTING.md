# Contact Form Testing Guide

This document provides comprehensive testing instructions for the SGM Software contact form.

## Prerequisites

Before testing, ensure:
- The application is running (locally or on Vercel)
- Environment variables are configured:
  - `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
  - `CONTACT_TO_EMAIL` is set (or emails will go to GMAIL_USER)

## Test Cases

### 1. Valid Submission (Happy Path)

**Steps:**
1. Navigate to the contact form section
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john.doe@example.com"
   - Message: "Hello, I would like to discuss a project."
3. Wait at least 3 seconds after the page loads
4. Click Submit

**Expected Results:**
- ✅ Button shows "SENDING..." during submission
- ✅ Button turns green and shows "SENT" with checkmark
- ✅ Form fields are cleared
- ✅ Success state disappears after 5 seconds
- ✅ Email received at the configured recipient address
- ✅ Email subject: "New contact form message from John Doe"
- ✅ Email Reply-To set to: "john.doe@example.com"
- ✅ Email contains formatted name, email, and message

---

### 2. Validation Tests

#### 2a. Empty Fields
**Steps:** Try to submit without filling any fields

**Expected:** HTML5 validation prevents submission (browser shows "Please fill out this field")

#### 2b. Invalid Email Format
**Steps:**
1. Name: "John Doe"
2. Email: "invalid-email"
3. Message: "Test message"
4. Submit

**Expected:** HTML5 validation shows "Please enter a valid email address"

#### 2c. Name Too Short
**Steps:**
1. Name: "A" (1 character)
2. Valid email
3. Valid message
4. Submit

**Expected:** Server returns error "Validation error: Name must be at least 2 characters"

#### 2d. Message Too Short
**Steps:**
1. Valid name
2. Valid email
3. Message: "Hi" (2 characters)
4. Submit

**Expected:** Server returns error "Validation error: Message must be at least 10 characters"

#### 2e. Too Many Links
**Steps:**
1. Valid name
2. Valid email
3. Message: "Check out https://site1.com and https://site2.com and https://site3.com"
4. Submit

**Expected:** Server returns error "Message contains too many links (max 2)"

---

### 3. Anti-Spam Tests

#### 3a. Honeypot Field
**Steps:**
1. Open browser developer tools
2. In Console, run:
   ```javascript
   document.querySelector('input[name="website"]').value = 'bot-filled-this';
   ```
3. Fill valid name, email, message
4. Submit

**Expected:**
- ✅ Form appears to accept submission (shows success state)
- ✅ No email is actually sent (silently rejected)
- ✅ Console may show warning: "Honeypot triggered from IP: [IP]"

#### 3b. Time-to-Submit Check
**Steps:**
1. Load the page
2. Immediately fill all fields (use autofill or paste)
3. Submit within 2 seconds of page load

**Expected:**
- ✅ Form appears to accept submission
- ✅ No email is actually sent
- ✅ Server log shows: "Submission too fast from IP: [IP] ([time]ms)"

#### 3c. Rate Limiting
**Steps:**
1. Submit valid form (wait for success)
2. Submit again immediately (wait for success)
3. Submit third time (wait for success)
4. Submit fourth time within 10 minutes

**Expected:**
- ✅ First 3 submissions succeed and send emails
- ✅ 4th submission returns error: "Too many submissions. Please try again later."
- ✅ HTTP status 429 (Too Many Requests)
- ✅ After 10 minutes, can submit again

---

### 4. Bot Protection Tests

#### 4a. Vercel BotID (on Vercel deployment)
**Steps:**
1. Deploy to Vercel
2. Submit form normally

**Expected:**
- ✅ Form works normally for human users
- ✅ High bot scores (> 0.5) are rejected
- ✅ Check server logs for bot detection warnings

#### 4b. Cloudflare Turnstile (if configured)
**Steps:**
1. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
2. Reload page
3. Verify Turnstile widget appears
4. Complete challenge
5. Submit form

**Expected:**
- ✅ Turnstile widget renders above submit button
- ✅ Challenge must be completed before submission works
- ✅ Form submission includes token
- ✅ Server verifies token before sending email

---

### 5. Security Tests

#### 5a. Header Injection Prevention
**Steps:**
1. Name: "John Doe\nBCC: hacker@evil.com"
2. Valid email
3. Valid message
4. Submit

**Expected:** Server returns error "Validation error: Name cannot contain line breaks"

#### 5b. Email Header Injection
**Steps:**
1. Valid name
2. Email: "test@example.com\nBCC: hacker@evil.com"
3. Valid message
4. Submit

**Expected:** Server returns error "Validation error: Email cannot contain line breaks"

#### 5c. HTML Injection in Email Body
**Steps:**
1. Valid name
2. Valid email
3. Message: "<script>alert('xss')</script>Hello"
4. Submit

**Expected:**
- ✅ Submission succeeds
- ✅ Email received with HTML escaped: `&lt;script&gt;alert('xss')&lt;/script&gt;Hello`
- ✅ Script does not execute when viewing email

---

### 6. User Experience Tests

#### 6a. Loading State
**Steps:**
1. Fill valid form
2. Click Submit
3. Observe button

**Expected:**
- ✅ Button becomes disabled
- ✅ Text changes to "SENDING..."
- ✅ Pulsing animation appears
- ✅ Form inputs become disabled

#### 6b. Success State
**Steps:**
1. Submit valid form
2. Wait for success

**Expected:**
- ✅ Button turns green
- ✅ Shows checkmark icon and "SENT" text
- ✅ Form fields are cleared immediately
- ✅ Success state persists for 5 seconds
- ✅ Button returns to normal state after 5 seconds

#### 6c. Error Display
**Steps:**
1. Submit form with validation error (e.g., too many links)
2. Observe error display

**Expected:**
- ✅ Error message appears in red box above button
- ✅ Shows alert icon
- ✅ Clear, readable error text
- ✅ Error persists until next submission

#### 6d. Network Error Handling
**Steps:**
1. Disconnect internet or block API route
2. Submit form

**Expected:**
- ✅ Error message: "Network error. Please check your connection and try again."
- ✅ Form can be resubmitted once connection is restored

---

### 7. Accessibility Tests

#### 7a. Keyboard Navigation
**Steps:**
1. Use Tab key to navigate through form
2. Fill fields with keyboard only
3. Press Enter to submit

**Expected:**
- ✅ Can reach all form fields with Tab
- ✅ Labels are properly associated
- ✅ Can submit with Enter key

#### 7b. Screen Reader
**Steps:**
1. Use screen reader (NVDA, JAWS, VoiceOver)
2. Navigate form

**Expected:**
- ✅ Labels are announced
- ✅ Required fields are indicated
- ✅ Error messages are announced
- ✅ Success state is announced

---

### 8. Edge Cases

#### 8a. Very Long Message
**Steps:**
1. Valid name and email
2. Message: 5000 characters (max length)
3. Submit

**Expected:**
- ✅ Submission succeeds
- ✅ Email contains full message

#### 8b. Special Characters
**Steps:**
1. Name: "João O'Connor-Smith"
2. Valid email
3. Message: "Testing 日本語 émojis 🎉"
4. Submit

**Expected:**
- ✅ Submission succeeds
- ✅ Email displays all characters correctly

#### 8c. Multiple Concurrent Submissions
**Steps:**
1. Open form in two browser tabs
2. Submit from both tabs simultaneously

**Expected:**
- ✅ Both submissions are processed
- ✅ Rate limiting counts both submissions
- ✅ Both emails are sent

---

## Automated Testing Script

You can use this JavaScript snippet in the browser console to automate some tests:

```javascript
// Test 1: Valid submission
async function testValidSubmission() {
  const form = document.querySelector('form');
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageTextarea = form.querySelector('textarea');
  
  nameInput.value = 'Test User';
  emailInput.value = 'test@example.com';
  messageTextarea.value = 'This is a test message from automated testing.';
  
  // Trigger change events
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  emailInput.dispatchEvent(new Event('input', { bubbles: true }));
  messageTextarea.dispatchEvent(new Event('input', { bubbles: true }));
  
  console.log('✓ Form filled. Wait 3 seconds before submitting...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  form.requestSubmit();
  console.log('✓ Form submitted');
}

// Test 2: Trigger honeypot
function testHoneypot() {
  document.querySelector('input[name="website"]').value = 'bot-value';
  console.log('✓ Honeypot triggered');
}

// Test 3: Rapid submission (should be blocked)
function testRapidSubmission() {
  const form = document.querySelector('form');
  form.requestSubmit();
  console.log('✓ Attempted rapid submission');
}

// Run tests
console.log('Starting tests...');
testValidSubmission();
```

---

## Monitoring & Debugging

### Server Logs to Check

When testing, monitor server logs for:
- `Honeypot triggered from IP: [IP]` - Honeypot caught a bot
- `Submission too fast from IP: [IP]` - Time-to-submit check caught rapid submission
- `Bot protection failed from IP: [IP]` - Bot score too high
- `Vercel BotID detected potential bot (score: X)` - Bot detection warning
- `Missing Gmail credentials` - Configuration error
- `SMTP Error:` - Email sending failed

### Common Issues

**Email not received:**
1. Check environment variables are set correctly
2. Verify Gmail App Password (not regular password)
3. Check spam/junk folder
4. Verify 2-Step Verification is enabled on Google account
5. Check server logs for SMTP errors

**Rate limiting not working in dev:**
- In-memory rate limiter resets when server restarts
- Test on deployed version for persistent rate limiting

**Turnstile not appearing:**
- Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Check browser console for errors
- Verify site key is valid

---

## Performance Testing

### Load Testing

To test rate limiting and server performance:

```bash
# Install Apache Bench (if not installed)
# macOS: brew install ab
# Ubuntu: apt-get install apache2-utils

# Send 10 requests with concurrency of 2
ab -n 10 -c 2 -p payload.json -T "application/json" https://your-domain.com/api/contact

# payload.json content:
# {"name":"Load Test","email":"test@example.com","message":"Load testing the contact form"}
```

**Expected:**
- First 3 requests succeed (200)
- Subsequent requests return 429 (rate limited)

---

## Checklist for Production Deployment

Before deploying to production:

- [ ] Environment variables set in Vercel
- [ ] Test email delivery from production
- [ ] Verify Reply-To works correctly
- [ ] Test all anti-spam measures
- [ ] Confirm rate limiting works
- [ ] Check error messages are user-friendly
- [ ] Verify success state works correctly
- [ ] Test on multiple devices/browsers
- [ ] Verify accessibility with screen reader
- [ ] Monitor server logs for errors

---

## Support

If issues arise:
1. Check server logs for errors
2. Verify environment variables
3. Test locally first
4. Review Gmail App Password setup
5. Check Vercel function logs in dashboard
