# Qoder Developer Website

A modern, multi-page developer portfolio website built with SvelteKit featuring a dashboard-style interface with minimalist design and vibrant accent colors.

## 🚀 Features

- **Multi-page Architecture**: Home, Products, About, and Contact pages
- **Dashboard-style Navigation**: Persistent sidebar with active state indicators
- **Responsive Design**: Mobile-friendly with collapsible navigation
- **Modern Animations**: Smooth transitions, hover effects, and micro-interactions
- **Glassmorphism Effects**: Frosted glass UI elements with subtle shadows
- **Component-based Structure**: Reusable components for maintainability

## 🎨 Design System

### Color Palette
- **Primary Accents**: Lime (#a3e635), Peach (#f97316), Fuchsia (#e879f9)
- **Neutrals**: Light gray backgrounds with dark text for contrast
- **Effects**: Glowing accents, soft shadows, and glass-like transparency

### Typography
- **Headings**: Monospace fonts (JetBrains Mono, Fira Code)
- **Body Text**: Clean UI fonts (Inter, Segoe UI)
- **Hierarchy**: Clear typographic scale with proper spacing

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   ├── data/          # Static data and content
│   ├── styles/        # Global CSS and design tokens
│   └── types/         # TypeScript interfaces
├── routes/            # Page routes
│   ├── products/      # Products listing and detail pages
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   └── +page.svelte   # Home page
└── app.html          # Base HTML template
```

## 🛠️ Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: CSS with custom properties
- **Build Tool**: Vite
- **Deployment**: Ready for any static hosting

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## ☁️ Deployment

Проект готов к деплою через GitHub Actions. Подробная инструкция находится в файле [DEPLOYMENT.md](DEPLOYMENT.md).

Кратко:
1. Включите GitHub Pages в Settings → Pages → Source: GitHub Actions
2. Workflow автоматически задеплоит сайт при пуше в main/master ветку
3. Сайт будет доступен по адресу: `https://ваш-логин.github.io/название-репозитория`

⚠️ **Важно**: Для корректной работы используется `@sveltejs/adapter-static` вместо `adapter-auto`.

## 📱 Pages

### Home (/)
- Brand introduction with animated hero section
- Development philosophy showcase
- Featured applications preview

### Products (/products)
- Filterable grid of applications (Desktop/Mobile)
- Product cards with hover animations
- Detailed filtering system

### Product Detail (/products/[id])
- Individual product showcase
- Image gallery with navigation
- Feature lists and technology stack
- Interactive elements

### About (/about)
- Company story and values
- Development approach methodology
- Skills showcase with animated metrics
- Technology stack breakdown

### Contact (/contact)
- Contact information cards
- Functional contact form
- Social media links
- Response time expectations

## 🔧 Customization

### Adding New Products
1. Edit `src/lib/data/products.ts`
2. Add new product objects with required fields
3. Images are automatically handled with placeholders

### Modifying Colors
1. Update CSS custom properties in `src/lib/styles/global.css`
2. Change `--color-lime`, `--color-peach`, `--color-fuchsia` values
3. All components will automatically reflect changes

### Adding Pages
1. Create new folder in `src/routes/`
2. Add `+page.svelte` file
3. Update navigation in `src/lib/components/Layout.svelte`

## 🎯 Key Components

### Layout.svelte
Main navigation component with responsive sidebar

### ProductCard.svelte
Reusable product card with hover animations

### Page Transitions
Smooth fade-in animations for all content sections

## 📈 Performance

- Optimized bundle size
- Lazy loading components
- Efficient CSS with custom properties
- Minimal JavaScript footprint

## 📝 License

MIT License - feel free to use this as a template for your own projects!

---

Built with ❤️ using SvelteKit