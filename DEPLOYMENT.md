# Deployment Checklist for Contact Form

## Environment Variables to Set in Cloudflare

1. **RESEND_API_KEY**: Your Resend API key

### How to set environment variables in Cloudflare:

#### Option 1: Using Wrangler CLI

```bash
wrangler secret put RESEND_API_KEY
# Enter your API key when prompted
```

#### Option 2: Using Cloudflare Dashboard

1. Go to your Cloudflare Workers dashboard
2. Select your worker
3. Go to Settings > Variables
4. Add `RESEND_API_KEY` as a secret variable

## Email Configuration

The code now uses `onboarding@resend.dev` which should work for testing. For production:

1. **Verify a domain with Resend** (recommended)
2. Update the `from` field in the email configuration
3. Or keep using `onboarding@resend.dev` for basic functionality

## Troubleshooting

If you're still getting empty responses after deployment:

1. Check Cloudflare Worker logs for any errors
2. Verify the RESEND_API_KEY is properly set
3. Check if the API endpoint is accessible at `your-domain.com/api/sendEmail.json`

## Testing the Deployed API

You can test the deployed API directly:

```bash
curl -X POST https://your-domain.com/api/sendEmail.json \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "message=Test message"
```

This should return a JSON response with a success message.
