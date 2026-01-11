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

### Dynamic Routes Error
If you see "Encountered dynamic routes" error:
- This happens because the site has API routes and dynamic pages
- The `strict: false` option in `svelte.config.js` allows these routes to be skipped during static generation
- Dynamic pages will work through client-side routing
- API routes are meant for server-side usage and aren't needed for static deployment

### 404 Errors on Routes
If you encounter 404 errors when navigating to pages like `/about` or `/products`:
- This happens because GitHub Pages expects physical HTML files for each route
- Solution uses SvelteKit's `fallback: 'index.html'` configuration with `@sveltejs/adapter-static`
- GitHub Actions workflow creates redirect pages in subdirectories that point to the main SPA
- All routes are handled by the client-side SvelteKit router
- Direct access to URLs works through automatic redirection to the SPA with proper base path

**Important**: Make sure the repository name in `svelte.config.js` matches your actual GitHub repository name (`/saraylov` in this case, not `saraylo_app_web`)

### Jekyll Error
- Make sure `.nojekyll` file exists in repository root
- Verify that GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check that the workflow file is in `.github/workflows/deploy.yml`