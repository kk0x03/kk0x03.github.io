#!/usr/bin/env tsx

/**
 * Blog Init Script
 * Usage: npm run init
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (prompt: string): Promise<string> =>
  new Promise((resolve) => rl.question(prompt, resolve))

async function init(): Promise<void> {
  console.log('\n🚀 Blog Initialization\n')
  console.log('This will set up your blog configuration.\n')

  const title = await question('Blog title (My Blog): ') || 'My Blog'
  const subtitle = await question('Subtitle (A place for my thoughts): ') || 'A place for my thoughts'
  const author = await question('Author name (Your Name): ') || 'Your Name'
  const github = await question('GitHub username: ') || 'yourusername'
  const repoName = await question('Repository name (blog): ') || 'blog'

  const config = `# Blog Configuration
# Edit this file to customize your blog

# Site Info
title: ${title}
subtitle: ${subtitle}
description: ${subtitle}
author: ${author}
language: en

# URL
url: https://${github}.github.io
root: /${repoName}/

# Social Links
social:
  github: https://github.com/${github}
  twitter: https://twitter.com/${github}
  email: hello@example.com

# Theme
theme:
  primary_color: "#0d6efd"

# Avatar
avatar: images/avatar.png

# Pagination (posts per page)
per_page: 10
`

  fs.writeFileSync(path.join(rootDir, '_config.yml'), config)
  console.log('\n✅ Created _config.yml')

  const postsDir = path.join(rootDir, 'posts')
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  const today = new Date().toISOString().split('T')[0]
  const samplePost = `---
title: Hello World
date: ${today}
tags:
  - introduction
  - blog
---

# Hello World

Welcome to my new blog! This is my first post.

## About This Blog

I created this blog to share my thoughts, projects, and learnings.

## What to Expect

- Technical tutorials
- Project showcases
- Random thoughts

Stay tuned for more content!
`

  fs.writeFileSync(path.join(postsDir, 'hello-world.md'), samplePost)
  console.log('✅ Created sample post: posts/hello-world.md')

  const projectsDir = path.join(rootDir, 'projects')
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true })
  }

  const sampleProject = `---
title: Sample Project
description: A sample project to demonstrate the project showcase feature.
image: images/sample-project.png
---

# Sample Project

This is a sample project to show how projects are displayed.

## Features

- Feature one
- Feature two
- Feature three

## Tech Stack

- React
- Vite
- CSS
`

  fs.writeFileSync(path.join(projectsDir, 'sample-project.md'), sampleProject)
  console.log('✅ Created sample project: projects/sample-project.md')

  const imagesDir = path.join(rootDir, 'public', 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }
  console.log('✅ Created public/images directory')

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/${repoName}/',
})
`

  fs.writeFileSync(path.join(rootDir, 'vite.config.ts'), viteConfig)
  console.log('✅ Updated vite.config.ts')

  console.log('\n🎉 Blog initialized successfully!\n')
  console.log('Next steps:')
  console.log('  1. Add your avatar to public/images/avatar.png')
  console.log('  2. Edit _config.yml to customize your blog')
  console.log('  3. Add posts to the posts/ directory')
  console.log('  4. Run "npm run dev" to preview your blog')
  console.log('  5. Run "npm run build" to build for production\n')

  rl.close()
}

init().catch(console.error)
