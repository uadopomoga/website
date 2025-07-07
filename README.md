# uadopomoga

A website for promoting volunteerism and mutual aid culture in Ukraine.

## URL's

| Environment | URL                                                    |
| ----------- | ------------------------------------------------------ |
| prod        | [uadopomoga.com.ua](https://uadopomoga.com.ua)         |
| dev         | [dev.uadopomoga.com.ua](https://dev.uadopomoga.com.ua) |

## About the Project

UAdopomoga is a website built with Astro that showcases volunteer initiatives, resources, and news for those providing help in Ukraine. The platform aims to connect volunteers, share important information, and promote a culture of mutual assistance.

## Features

- **Mail Sending**: Send emails using [Resend](https://resend.com) for contact forms and notifications
- **Content Management**: Easy content updates through Decap CMS

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/uadopomoga/website

# Navigate to project directory
cd uadopomoga

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
uadopomoga/
├── _posts/                        # Blog posts (Markdown files managed by Decap CMS)
├── public/
│   ├── admin/                     # Decap CMS admin config
│   └── content-images/
│     ├── new-posts/               # Images for new posts added via Decap CMS
│     └── old-posts/               # Images for blog posts migrated from previous version
├── src/
│   ├── assets/                    # Static assets (CSS, fonts, theme images)
│   ├── components/                # Astro components
│   ├── data/                      # JSON data files and legacy posts
│   ├── layouts/                   # Page layouts
│   ├── pages/
│   │   └── posts/                 # Dynamic post pages ([slug].astro)
│   └── utils/                     # Utility functions (get_posts.mjs)
└── README.md                      # Project documentation

```

## Content Management

### Using Decap CMS (Recommended)

The easiest way to add and manage content is through Decap CMS, a web-based interface that allows you to create and edit posts without directly working with code.

#### Accessing Decap CMS

1. **Development**: Navigate to `https://dev.uadopomoga.com.ua/admin/` (or your deployed development environment URL + `/admin/`)
2. **Production**: Go to `https://uadopomoga.com.ua/admin/` (or your deployed URL + `/admin/`)

#### Creating New Posts via CMS

1. Open the Decap CMS admin interface at `/admin/`
2. Authenticate with your GitHub account
3. Click "New Blog" to create a new post
4. Fill in the form fields:
   - **Title**: The post title
   - **Images**: Upload multiple images for the post gallery
   - **Image Alt Text**: Description for accessibility
   - **Background Image**: Main featured image for the post
   - **Background Image Alt Text**: Description for the featured image
   - **Video**: Optional YouTube or video URL
   - **Publish Date**: When the post should be published
   - **CTA**: Call-to-action text (defaults to "Читати далі")
   - **Content**: Main post content in Markdown format
5. Click "Publish" to save the post

#### How It Works

- **Posts** are automatically saved to the `_posts/` folder as Markdown files
- **Images** are uploaded to `public/content-images/new-posts/` and are web-accessible
- **Publishing** creates a commit and push to the GitHub repository (main)
- **Live Updates**: Changes appear on the website after automatical redeployment

### Manual Content Management via GitHub (Alternative)

If you prefer to work directly with files, you can still add posts manually:

1. Navigate to the repository on GitHub
2. Go to the `public/content-images/new-posts/` directory to upload images
3. Go to the `_posts/` directory to create new post files
4. Create a new `.md` file with the following structure:

#### Manual Post Template

```markdown
---
title: 'Your Post Title'
image:
  - '/content-images/new-posts/image1.jpg'
  - '/content-images/new-posts/image2.jpg'
image_alt: 'Description for accessibility'
background_image: '/content-images/new-posts/featured-image.jpg'
background_image_alt: 'Featured image description'
video: 'https://youtube.com/watch?v=example' # Optional
date: 2025-01-01T12:00:00.000Z
cta: 'Дізнатись більше'
---

Your post content goes here in **Markdown** format.

You can include:

- Lists and bullet points
- **Bold** and _italic_ text
- [Links](https://example.com)
- Images: ![Alt text](/content-images/new-posts/image.jpg)

## Subheadings

More content...
```

### Image Management

All images for new posts are stored in `public/content-images/new-posts/` and are accessible via `/content-images/new-posts/filename.jpg` URLs.

**Important Notes:**

- Use the **Decap CMS** interface for the best experience
- Image paths should always start with `/content-images/new-posts/`
- The CMS automatically handles proper file organization and paths
- Manual editing is available but the CMS is recommended for content creators

## Development

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note:** The `npm run preview` command may not work correctly with the Cloudflare adapter. For testing production builds with Cloudflare Pages adapter, use:

- Local development: `npm run dev`
- Production testing: Deploy to a staging environment or use Cloudflare's preview deployments

### Adding Components

To add a new component:

1. Create a new file in `src/components/`
2. Import and use it in your pages or other components

## Deployment

This project is specifically configured for **Cloudflare Pages** deployment with the `@astrojs/cloudflare` adapter.

### Cloudflare Pages (Current Setup)

The project is automatically deployed on Cloudflare Pages:

- **Production**: [uadopomoga.com.ua](https://uadopomoga.com.ua)
- **Development**: [dev.uadopomoga.com.ua](https://dev.uadopomoga.com.ua)

### Environment Variables

The following environment variables need to be set in Cloudflare:

1. **RESEND_API_KEY**: Your Resend API key for email functionality

#### Setting Environment Variables in Cloudflare:

**Option 1: Using Wrangler CLI**

```bash
wrangler secret put RESEND_API_KEY
# Enter your API key when prompted
```

**Option 2: Using Cloudflare Dashboard**

1. Go to your Cloudflare Workers dashboard
2. Select your worker
3. Go to Settings > Variables
4. Add `RESEND_API_KEY` as a secret variable

### Email Configuration

The contact form uses `onboarding@resend.dev` which works for testing. For production:

1. **Verify a domain with Resend** (recommended)
2. Update the `from` field in the email configuration
3. Or keep using `onboarding@resend.dev` for basic functionality

### Testing the Deployed Contact Form

You can test the deployed contact form API directly:

```bash
curl -X POST https://your-domain.com/api/sendEmail.json \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "message=Test message"
```

This should return a JSON response with a success message.

### Troubleshooting Deployment

If you're experiencing issues after deployment:

1. Check Cloudflare Worker logs for any errors
2. Verify the RESEND_API_KEY is properly set
3. Check if the API endpoint is accessible at `your-domain.com/api/sendEmail.json`
4. Ensure the contact form is submitting to the correct endpoint

### Alternative Hosting Platforms

While configured for Cloudflare, the project can be adapted for other static hosting platforms:

- Netlify (requires adapter change)
- Vercel (requires adapter change)
- GitHub Pages (requires adapter change)

**Note:** To use other platforms, you would need to modify `astro.config.mjs` and change from `@astrojs/cloudflare` to the appropriate adapter.
