# Beers Criteria Checker - Deployment Instructions

## Prerequisites
- Node.js 16+ installed
- A GitHub account
- A Vercel account (free tier works)
- An Anthropic API key

## Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. **Save this key** - you'll need it for Vercel

## Step 2: Set Up the Project Locally

Open terminal and run:

```bash
cd beers-checker-deploy
npm install
```

Test locally (optional):
```bash
npm run dev
```

## Step 3: Push to GitHub

1. Go to https://github.com/new
2. Create a new repository (name it "beers-criteria-checker")
3. Don't initialize with README

In your terminal (in the beers-checker-deploy folder):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beers-criteria-checker.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Click "Deploy"
6. **IMPORTANT:** Before the first build completes, go to Settings

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts.

## Step 5: Add Environment Variable (CRITICAL)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key from Step 1
   - **Environment:** Production, Preview, Development (check all)
4. Click "Save"
5. Go to "Deployments" → Click "..." → "Redeploy"

## Step 6: Test Your Site

Your site will be at: `https://your-project-name.vercel.app`

Test with example medications:
```
diphenhydramine 25mg daily
diazepam 5mg BID
lisinopril 10mg daily
```

## Troubleshooting

### "Failed to fetch" error
- Check that ANTHROPIC_API_KEY is set in Vercel
- Redeploy after adding the environment variable

### 500 error
- Check Vercel function logs (Dashboard → Functions → View logs)
- Verify API key is valid

### Build errors
- Make sure all files are committed to GitHub
- Check Node.js version (should be 16+)

## Custom Domain (Optional)

1. In Vercel dashboard: Settings → Domains
2. Add your domain
3. Update DNS records as instructed

## Costs

- **Vercel:** Free tier (100GB bandwidth/month)
- **Anthropic API:** Pay per use (~$0.003 per analysis)

## Support

For issues, check:
- Vercel logs: Dashboard → Functions
- Console errors: Browser DevTools → Console
