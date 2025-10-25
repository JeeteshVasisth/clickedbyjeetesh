# Netlify Deployment Guide

This guide will help you deploy your photography portfolio application to Netlify using serverless functions.

## Prerequisites

- A Netlify account (sign up at https://www.netlify.com)
- Your project code in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. **Push your code to a Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Log in to your Netlify account
   - Click "Add new site" > "Import an existing project"
   - Connect to your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**:
   Netlify should auto-detect the settings from `netlify.toml`, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy your site automatically
   - You'll get a URL like `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize the project**:
   ```bash
   netlify init
   ```

4. **Deploy**:
   ```bash
   # Deploy to draft URL for testing
   netlify deploy

   # Deploy to production
   netlify deploy --prod
   ```

## How It Works

### Architecture

Your application is now fully serverless:

- **Frontend**: Static React application built with Vite
- **Backend**: Express API converted to Netlify serverless functions
- **API Routes**: All `/api/*` requests are handled by Netlify Functions

### API Routing

The `netlify.toml` configuration redirects API requests:
- Frontend requests to `/api/photos` 
- → Netlify redirects to `/.netlify/functions/api/photos`
- → Your serverless function handles the request

### File Structure

```
project/
├── client/              # React frontend
├── netlify/
│   └── functions/
│       └── api.ts      # Serverless function wrapping Express routes
├── server/
│   └── storage.ts      # Data storage layer
├── netlify.toml        # Netlify configuration
└── package.json
```

## Local Development

To test the Netlify Functions locally:

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Start local development server
netlify dev
```

This will:
- Start your Vite dev server
- Run Netlify Functions locally
- Make your app available at `http://localhost:8888`

## Environment Variables

If you add environment variables in the future:

1. **In Netlify Dashboard**:
   - Go to Site Settings > Environment Variables
   - Add your variables

2. **For local development**, create a `.env` file:
   ```
   VARIABLE_NAME=value
   ```

## Custom Domain

To use a custom domain:

1. Go to your site settings in Netlify
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Follow the instructions to configure DNS

## Continuous Deployment

Once connected to Git, Netlify automatically:
- Deploys when you push to your main branch
- Creates preview deployments for pull requests
- Runs build checks before deployment

## Performance & Limits

### Netlify Free Tier Limits:
- **Bandwidth**: 100 GB/month
- **Build minutes**: 300 minutes/month
- **Function invocations**: 125,000/month
- **Function execution**: 100 hours/month

### Function Specifications:
- **Timeout**: 10 seconds (free tier), 26 seconds (paid)
- **Memory**: 1024 MB
- **Payload size**: 6 MB

## Troubleshooting

### Build fails
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version is set to 20 in `netlify.toml`

### Functions not working
- Check function logs in Netlify dashboard
- Verify redirects are configured correctly in `netlify.toml`
- Test locally with `netlify dev` first

### API returns 404
- Ensure the redirect rules in `netlify.toml` are correct
- Check that your function is deployed (visible in Functions tab)

### Photographer portrait not showing
- The portrait image should be in `client/public/photo.jpg`
- Vite automatically copies files from `client/public/` to the build output
- After updating the image, rebuild and redeploy to Netlify

## Next Steps

After deployment:
1. Test all features on the live site
2. Set up custom domain (optional)
3. Configure analytics (Netlify provides built-in analytics)
4. Set up form submissions if needed (Netlify Forms)

## Support

- Netlify Documentation: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com
- Netlify Status: https://www.netlifystatus.com

---

**Your application is now ready for deployment! 🚀**
