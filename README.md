# Kip

A simple, minimal blog framework for showcasing your projects. Built with React + Vite + TypeScript, deploy to GitHub Pages.

## Features

- **Simple & Clean** - Profile + project list, nothing more
- **5 Themes** - Dark, light, ocean, forest, sunset
- **3 Layouts** - List, grid, or cards view
- **Markdown** - Write projects in markdown with frontmatter
- **Notion Support** - Link to Notion documents
- **TypeScript** - Full type safety
- **CLI Tool** - Easy commands for dev, build, deploy
- **GitHub Pages** - One command deployment

## Installation

### Option 1: npm (Recommended)

```bash
# Install globally
npm install -g @kk0x03/kip

# Create a new project
kip create my-portfolio

# Navigate and start
cd my-portfolio
npm install
kip dev
```

### Option 2: Clone Repository

```bash
# Clone directly
git clone https://github.com/kk0x03/kip.git my-portfolio
cd my-portfolio

# Install dependencies
npm install

# Link CLI globally (optional)
npm link

# Start development
kip dev
```

## Quick Start

```bash
# 1. Edit your info
nano _config.yml

# 2. Add your avatar
cp your-photo.png public/images/avatar.png

# 3. Create a project
kip new project

# 4. Preview locally
kip dev

# 5. Deploy
kip deploy
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `kip create <name>` | Create a new Kip project |
| `kip dev` | Start development server (localhost:5173) |
| `kip build` | Build for production |
| `kip preview` | Preview production build locally |
| `kip deploy` | Build + commit + push to GitHub |
| `kip new [project]` | Create new project entry interactively |
| `kip help` | Show help message |

### Creating a Project

```bash
$ kip new project

📦 Create New Project

Title: My Awesome App
Description (optional): A cool app I built
External link (optional):
Image path (optional): images/my-app.png
Tags (comma separated): react, typescript
Order (99): 1
Draft? (y/n): n

✅ Created: projects/my-awesome-app.md
```

## Project Structure

```
kip/
├── _config.yml           # Site configuration
├── bin/
│   ├── kip.js            # CLI wrapper
│   └── kip.ts            # CLI source
├── projects/             # Your project markdown files
│   ├── project-one.md
│   ├── project-two.md
│   └── draft-project.md
├── public/
│   └── images/           # Static images
│       ├── avatar.svg
│       └── placeholder.svg
├── scripts/
│   └── build-content.ts  # Generates data from markdown
├── src/
│   ├── pages/            # React page components
│   ├── components/       # Reusable components
│   ├── styles/           # CSS and themes
│   ├── types/            # TypeScript types
│   └── data/             # Auto-generated data files
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite config
```

## Configuration

Edit `_config.yml` to customize your site:

```yaml
# ===================
# Site Configuration
# ===================

# Your Info
name: Your Name
bio: Developer, designer, creator. Building things for the web.
avatar: images/avatar.png

# Social Links (all optional)
social:
  github: https://github.com/yourusername
  twitter: https://twitter.com/yourusername
  email: hello@example.com

# Site Settings
title: My Portfolio
root: /your-repo-name/    # Must match your GitHub repo name

# ===================
# Theme & Layout
# ===================

# Theme: dark | light | ocean | forest | sunset
theme: dark

# Layout Options
layout:
  style: list      # list | grid | cards
  avatar: circle   # circle | square
  card: bordered   # bordered | shadow | flat

# ===================
# Integrations
# ===================

# Notion (optional)
notion:
  api_key: YOUR_NOTION_API_KEY
```

### Configuration Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Your display name |
| `bio` | Yes | Short bio/tagline |
| `avatar` | Yes | Path to avatar image |
| `social.github` | No | GitHub profile URL |
| `social.twitter` | No | Twitter profile URL |
| `social.email` | No | Email address |
| `title` | Yes | Site title |
| `root` | Yes | Base path (must match repo name) |
| `theme` | Yes | Color theme |
| `layout.style` | No | Project list layout |
| `layout.avatar` | No | Avatar shape |
| `layout.card` | No | Card style |

## Creating Projects

### Method 1: CLI (Recommended)

```bash
kip new project
```

### Method 2: Manual

Create a markdown file in `projects/`:

```markdown
---
title: Project Name
description: Brief description for the list view
image: images/project-screenshot.png
link: https://external-url.com
order: 1
tags:
  - react
  - typescript
draft: false
---

# Project Name

Your detailed project description here...

## Features

- Feature 1
- Feature 2

## Tech Stack

- React
- TypeScript
```

### Project Fields

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `title` | Yes | - | Project name |
| `description` | No | - | Brief description (shown in list) |
| `image` | No | - | Thumbnail image path |
| `link` | No | - | External URL (opens in new tab) |
| `order` | No | 99 | Sort order (lower = first) |
| `tags` | No | [] | Array of tag strings |
| `draft` | No | false | Set `true` to hide from list |

### Project Types

**1. Internal Project** (with content)
```yaml
---
title: My App
description: A cool app
image: images/my-app.png
---

# My App
Full project details here...
```

**2. External Link** (opens in new tab)
```yaml
---
title: GitHub Repo
description: Check out my code
link: https://github.com/user/repo
---
```

**3. Draft** (hidden from list)
```yaml
---
title: Work in Progress
draft: true
---
```

## Themes

### Available Themes

| Theme | Description |
|-------|-------------|
| `dark` | Dark background, blue accents (default) |
| `light` | Light background, blue accents |
| `ocean` | Deep blue background, cyan accents |
| `forest` | Green background, mint accents |
| `sunset` | Purple background, pink accents |

### Theme Colors

```
dark    → #0d1117 bg, #0d6efd accent
light   → #ffffff bg, #0969da accent
ocean   → #03045e bg, #00b4d8 accent
forest  → #1b4332 bg, #52b788 accent
sunset  → #240046 bg, #f72585 accent
```

## Layout Options

### Project List Styles

| Style | Description |
|-------|-------------|
| `list` | Horizontal rows, image on left (default) |
| `grid` | Responsive grid, 2-3 columns |
| `cards` | Large cards with full-width images |

### Avatar Shapes

| Shape | Description |
|-------|-------------|
| `circle` | Round avatar (default) |
| `square` | Rounded square avatar |

### Card Styles

| Style | Description |
|-------|-------------|
| `bordered` | Border outline (default) |
| `shadow` | Drop shadow effect |
| `flat` | No border or shadow |

### Example Combinations

```yaml
# Minimal
layout:
  style: list
  card: flat

# Modern
layout:
  style: cards
  card: shadow

# Classic
layout:
  style: grid
  card: bordered
```

## Deployment

### GitHub Pages Setup

1. **Create GitHub repo** with your desired name (e.g., `portfolio`)

2. **Update `_config.yml`**
   ```yaml
   root: /portfolio/  # Must match repo name
   ```

3. **Update `vite.config.ts`**
   ```typescript
   base: '/portfolio/'  # Must match repo name
   ```

4. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USER/REPO.git
   git push -u origin main
   ```

5. **Enable GitHub Pages**
   - Go to repo **Settings** → **Pages**
   - Set **Source** to **GitHub Actions**

6. **Deploy**
   ```bash
   kip deploy
   ```

### Your Site URL

```
https://USERNAME.github.io/REPO-NAME/
```

### Automatic Deployment

The included `.github/workflows/deploy.yml` automatically deploys when you push to `main`. You can also manually trigger deployment with `kip deploy`.

## Development

### Local Development

```bash
# Start dev server with hot reload
kip dev

# Or use npm directly
npm run dev
```

### Build

```bash
# Build for production
kip build

# Preview production build
kip preview
```

### How It Works

1. `scripts/build-content.ts` reads `projects/*.md` files
2. Parses frontmatter and converts markdown to HTML
3. Generates `src/data/projects.ts` and `src/data/config.ts`
4. Vite builds the React app with the generated data

## Adding Images

Place images in `public/images/`:

```
public/
└── images/
    ├── avatar.png        # Your profile photo
    ├── project-1.png     # Project screenshots
    └── project-2.png
```

Reference in markdown:
```yaml
image: images/project-1.png
```

## Notion Integration

Link to Notion pages (opens in new tab):

```yaml
---
title: My Notion Doc
description: Detailed documentation
link: https://notion.so/your-page-id
---
```

## Troubleshooting

### Images not showing
- Check path is relative to `public/` folder
- Use `images/file.png` not `/images/file.png`

### 404 on GitHub Pages
- Ensure `root` in `_config.yml` matches repo name
- Ensure `base` in `vite.config.ts` matches repo name
- Check GitHub Pages source is set to "GitHub Actions"

### CLI not found
- Run `npm link` in the project directory
- Or use `node bin/kip.js` directly

### Build errors
- Run `npm install` to ensure dependencies
- Check TypeScript errors with `npx tsc --noEmit`

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **TypeScript 5** - Type safety
- **React Router 7** - Client-side routing
- **gray-matter** - Frontmatter parsing
- **marked** - Markdown to HTML

## License

MIT
