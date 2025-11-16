# Deployment Guide

## GitHub Repository

✅ Your code is now pushed to: https://github.com/stegerzoltan/currency-change

## Deploy to Vercel (Recommended - FREE)

### Option 1: Automatic Deployment (Recommended)

1. **Visit Vercel:** https://vercel.com

2. **Sign in with GitHub** (or create an account)

3. **Import your project:**

   - Click "Add New" → "Project"
   - Select your GitHub repository: `stegerzoltan/currency-change`
   - Vercel will auto-detect it's a Next.js project
   - Click "Deploy"

4. **That's it!**
   - Your app will be live in ~2-3 minutes
   - You'll get a URL like: `https://currency-change.vercel.app`
   - Every push to `main` branch auto-deploys!

### Option 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
cd /home/stege/exchange
vercel

# Follow the prompts to link your GitHub account
```

## Alternative Deployment Options

### Deploy to Netlify

1. Visit https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select the repository
5. Deploy!

### Deploy to Railway

1. Visit https://railway.app
2. Create new project → Import GitHub repo
3. Connect to your repository
4. Deploy!

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app and deploy
heroku create currency-change
git push heroku main
```

## After Deployment

✅ Your app will be available at a public URL
✅ Can share with anyone
✅ Real-time currency updates will work
✅ Free tier includes generous bandwidth

## Custom Domain (Optional)

Once deployed, you can add a custom domain:

- Go to your deployment settings
- Add your custom domain
- Update DNS settings at your domain registrar

## Environment Variables (if needed)

If you want to add an API key for higher rate limits:

1. Create `.env.local` in your project root
2. Add: `NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_key`
3. Push to GitHub
4. Vercel will auto-redeploy with the new env var

## Troubleshooting

**Issue: Build fails**

- Check that Node.js version is compatible
- Verify all dependencies are installed
- Check for TypeScript errors

**Issue: API not working**

- CORS should work fine (ExchangeRate-API allows it)
- Check network tab in browser DevTools
- Verify internet connection

**Issue: Slow performance**

- Edge functions might need optimization
- Check Vercel Analytics dashboard
- Consider caching strategies

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- ExchangeRate-API: https://www.exchangerate-api.com/docs

---

**Your app is production-ready!** 🚀
