# Saraylo Developer Studio

Professional software development portfolio website deployed on GitHub Pages.

## Deployment Method

This site uses **GitHub Pages "Deploy from a branch"** method with the `/docs` folder as source.

### Setup Instructions

1. **Repository Settings:**
   - Go to Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /docs

2. **Directory Structure:**
   ```
   docs/
   ├── index.html          # Main page
   ├── 404.html           # SPA routing fallback
   ├── favicon.png        # Site icon
   ├── .nojekyll          # Disable Jekyll processing
   └── [about|products|contact]/index.html  # Redirect pages
   ```

3. **URL Structure:**
   - Main site: `https://username.github.io/repository-name/`
   - All assets served from root path `/`

### Features

- Fully static HTML/CSS/JavaScript
- Responsive design with modern aesthetics
- Smooth scrolling navigation
- SPA-like routing with 404 fallback
- No build process required
- Works reliably on GitHub Pages

### Development

To update the site:
1. Edit `docs/index.html`
2. Commit and push to main branch
3. GitHub Pages will automatically deploy

### Why This Approach?

- **Reliability:** No complex build pipelines or dynamic imports
- **Performance:** All content served statically
- **Compatibility:** Works with GitHub Pages restrictions
- **Simplicity:** Easy to maintain and debug