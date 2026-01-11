# GitHub Pages Setup Instructions

## Configuration Steps

1. **Repository Settings**: 
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Base Path Configuration**:
   - In `svelte.config.js`, make sure the `paths.base` matches your repository name
   - For example: if your repo is `username/saraylo_app_web`, set `base: '/saraylo_app_web'`

3. **Deployment**:
   - Push changes to main branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at: `https://username.github.io/saraylo_app_web`

## Troubleshooting

If you encounter the Jekyll error:
- Make sure `.nojekyll` file exists in repository root
- Verify that GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check that the workflow file is in `.github/workflows/deploy.yml`