# Developer Portfolio — Modern Minimalist Edition

A minimalist, high-performance web developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Lucide React**.

Designed following the **Editorial / Modern Minimalist** philosophy:
* **Minimalist & Expressive Typography**: Clean layout, sharp editorial typography, and high information density.
* **Lucide React & Micro-interactions**: Lightweight, clean vector icons for navigation, actions, and media.
* **Architectural Avatar Frame**: Dedicated personal portrait display with clean alignment.
* **Dual Theme & Bilingual Support**: Seamless Light / Dark modes and instant English / Vietnamese locale toggling.
* **Command Palette (Cmd+K)**: Instant keyboard-driven navigation across sections and projects.
* **Strict Type Safety**: Comprehensive TypeScript data modeling with zero `any` usage.
* **Automated GitHub Pages CI/CD**: Automatic static site generation (SSG) and global deployment via GitHub Actions.

---

## Architecture & Project Structure

```
dev-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD to deploy to GitHub Pages
├── app/
│   ├── layout.tsx              # Root Layout + SEO Metadata + Inline Theme Script
│   ├── page.tsx                # Composition of portfolio sections
│   └── globals.css             # Tailwind v4 configuration + Custom animations
├── components/
│   └── deck/
│       ├── CommandPalette.tsx    # Cmd+K quick navigation & action modal
│       ├── ProjectImageStack.tsx # Interactive multi-screenshot deck with captions
│       └── VerticalStackDeck.tsx # Primary vertical presentation deck
├── data/
│   └── portfolio-data.ts       # Single Source of Truth for all content
├── lib/
│   ├── asset.ts                # Base path helper for GitHub Pages static assets
│   ├── i18n.ts                 # Full English & Vietnamese dictionary
│   └── sound.ts                # Audio feedback utilities
├── types/
│   └── portfolio.ts            # Strict TypeScript interfaces & models
├── public/
│   └── images/
│       ├── avatar.png          # Circular developer portrait photo
│       ├── flexiconnect/       # FlexiConnect Web screenshots
│       └── restaurant/         # Restaurant Booking app screenshots
└── next.config.ts              # Next.js static export ('output: export')
```

---

## Getting Started Locally

### Prerequisites
* **Node.js** v20+ or v22+
* **npm**

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/soodthin/dev-portfolio.git
cd dev-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server (port 3002)
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to view the application.

### Build Production Export
```bash
npm run build
```
This compiles the application and generates a standalone, static HTML export inside the `out/` directory.

---

## How to Personalize Your Portfolio

All personal information, links, projects, and skills are organized into:
* [`data/portfolio-data.ts`](data/portfolio-data.ts): Profile details, projects, education, and skills.
* [`lib/i18n.ts`](lib/i18n.ts): English and Vietnamese localized copy and section titles.

1. **Avatar Image**: Drop your portrait photo into `public/images/avatar.png`, then update `avatarUrl: "/images/avatar.png"` in `data/portfolio-data.ts`.
2. **Projects**: Add or edit projects in the `projects` array with your actual GitHub links and live demos.
3. **Skills & Experiences**: Update the `skills` and `experiences` arrays to showcase your personal journey.

---

## Deploying to GitHub Pages

1. Push all changes to the `main` branch of your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete modern minimalist dev portfolio"
   git push origin main
   ```
2. On GitHub, go to your repository:
   * Navigate to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will now automatically build and publish your portfolio at:
   `https://soodthin.github.io/dev-portfolio/`
