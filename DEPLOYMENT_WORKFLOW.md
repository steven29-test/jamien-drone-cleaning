# Jamien Drone Cleaning - Deployment Workflow

## Branch Strategy

### `main` (Production)
- **URL:** https://www.jamiendrone.com.au (custom domain)
- **Deployment:** Automatic when commits pushed to `main`
- **Status:** LIVE - Public-facing
- **When to merge:** Only after verification on `stage` branch

### `stage` (Staging)
- **URL:** https://jamien-drone-cleaning-stage.vercel.app (or similar)
- **Deployment:** Automatic when commits pushed to `stage`
- **Status:** Pre-production testing environment
- **When to use:** Always push new features here first

## Workflow for New Features/Changes

### Step 1: Develop on Feature Branch
```bash
git checkout -b feature/your-feature-name
# Make changes, commit as usual
git add .
git commit -m "Your message"
```

### Step 2: Push to Stage for Testing
```bash
git push origin feature/your-feature-name
# Then create a pull request to 'stage' branch
# Or merge directly to stage if confident:
git checkout stage
git merge feature/your-feature-name
git push origin stage
```

### Step 3: Verify on Stage Environment
- Visit: https://jamien-drone-cleaning-stage.vercel.app
- Test all features thoroughly:
  - Contact form submission
  - Mobile responsiveness
  - Image slider
  - Video playback
  - SEO meta tags
  - Email notifications

### Step 4: Deploy to Production
Once verified on stage, merge to main:
```bash
git checkout main
git merge stage
git push origin main
```

## Quick Commands

### Deploy to stage immediately
```bash
git checkout stage
git merge main  # sync latest from main if needed
git push origin stage
```

### Deploy to production (after stage verification)
```bash
git checkout main
git pull origin stage  # or merge stage
git push origin main
```

### Check current branch
```bash
git branch -a
```

### View deployment history
```bash
git log --oneline -10
```

## Important Notes

1. **Never push directly to `main`** unless it's been tested on `stage` first
2. **Always merge `stage` into `main`**, not the other way around
3. **Stage environment is for QA** - test everything here
4. **Production is for users** - only deploy verified changes
5. **Contact form** - Verify emails are being sent correctly
6. **Images & Video** - Check loading and responsiveness
7. **Mobile** - Always test on mobile before going live

## Stage Branch Setup (Already Done)
- ✅ vercel.json configured for both main and stage
- ✅ Both branches have auto-deployment enabled
- ✅ Contact form requires checkbox agreement before submit
- ✅ No auto-submit (manual button click required)

## Testing Checklist for Stage Deployment

- [ ] Homepage loads without errors
- [ ] Contact form appears with all fields
- [ ] Submit button disabled until terms checkbox is checked
- [ ] Form requires all mandatory fields (name, email, message, terms agreement)
- [ ] Submit button sends data when all conditions met
- [ ] Success message displays after submission
- [ ] Email received at sales@jamiendrone.com.au
- [ ] Mobile menu works on small screens
- [ ] Image slider auto-rotates
- [ ] Video plays in hero section
- [ ] All links navigate correctly
- [ ] SEO meta tags present in page source
- [ ] No console errors

## Workflow Example

```bash
# 1. Create feature branch
git checkout -b feature/improve-form-validation
# Make changes...
git add .
git commit -m "Improve form validation"

# 2. Push to stage for testing
git checkout stage
git merge feature/improve-form-validation
git push origin stage
# Test at: https://jamien-drone-cleaning-stage.vercel.app

# 3. Verify everything works, then deploy to production
git checkout main
git merge stage
git push origin main
# Live at: https://www.jamiendrone.com.au
```

---

**Vercel Auto-Deployment:** Both branches are configured to deploy automatically, so you just need to push and wait for the deployment to complete (usually 1-2 minutes).
