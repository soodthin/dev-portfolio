# Developer Portfolio — Pure Typographic Edition

A minimalist, high-performance web developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

Designed following the **Editorial / Pure Typographic** philosophy:
* **Zero Icons & Zero Emojis**: 100% focused on sharp typography, structural layout, and clean content presentation.
* **Architectural Avatar Frame**: Dedicated personal avatar display with clean alignment.
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
│   ├── layout.tsx              # Root Layout + SEO Metadata (Permanent Dark Mode)
│   ├── page.tsx                # Composition of portfolio sections
│   └── globals.css             # Tailwind v4 configuration + Lo-Fi Nighttime palette
├── components/
│   ├── navbar.tsx              # Minimalist sticky navigation
│   ├── hero.tsx                # Hero banner with circular avatar radar frame
│   ├── experience.tsx          # Enterprise internship & work experience
│   ├── projects.tsx            # Numbered project cards with tech tags
│   ├── about.tsx               # Academic background, languages & skills matrix
│   └── contact.tsx             # Direct reachout and verified social channels
├── data/
│   └── portfolio-data.ts       # Single Source of Truth for all content
├── types/
│   └── portfolio.ts            # Strict TypeScript interfaces & models
├── public/
│   └── images/
│       └── avatar.png          # Circular developer portrait photo
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

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### Build Production Export
```bash
npm run build
```
This compiles the application and generates a standalone, static HTML export inside the `out/` directory.

---

## How to Personalize Your Portfolio

All personal information, links, projects, and skills are separated into **one single file**:
[`data/portfolio-data.ts`](data/portfolio-data.ts)

1. **Avatar Image**: Drop your portrait photo (e.g. `avatar.jpg`) into `public/images/avatar.jpg`, then update `avatarUrl: "/images/avatar.jpg"` in `data/portfolio-data.ts`.
2. **Projects**: Add or edit projects in the `projects` array with your actual GitHub links and live demos.
3. **Skills & Experiences**: Update the `skills` and `experiences` arrays to showcase your personal journey.

---

## Deploying to GitHub Pages

1. Push all changes to the `main` branch of your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete pure typographic dev portfolio"
   git push origin main
   ```
2. On GitHub, go to your repository:
   * Navigate to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will now automatically build and publish your portfolio at:
   `https://soodthin.github.io/dev-portfolio/`
