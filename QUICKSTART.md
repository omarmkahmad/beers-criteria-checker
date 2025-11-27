# QUICK START - 5 Minutes to Deploy

## What You Need
- Anthropic API key (get from https://console.anthropic.com/)
- GitHub account
- Vercel account (sign up free at https://vercel.com)

## 3 Simple Steps

### 1. Push to GitHub
```bash
cd beers-checker-deploy
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/beers-criteria-checker.git
git push -u origin main
```

### 2. Deploy on Vercel
- Go to https://vercel.com/new
- Import your GitHub repo
- Click Deploy

### 3. Add API Key
- In Vercel: Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your API key
- Redeploy

## Done! 🎉

Your site is live at: `https://your-project.vercel.app`

---

**Need help?** See full README.md for detailed instructions.
