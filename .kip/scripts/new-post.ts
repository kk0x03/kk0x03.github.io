#!/usr/bin/env tsx

/**
 * New Post Script
 * Usage: npm run new "Post Title"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function main(): void {
  const title = process.argv[2]

  if (!title) {
    console.log('\nUsage: npm run new "Post Title"\n')
    console.log('Example: npm run new "My First Post"\n')
    process.exit(1)
  }

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]
  const postsDir = path.join(rootDir, 'posts')

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  const filePath = path.join(postsDir, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    console.log(`\n❌ Post already exists: ${filePath}\n`)
    process.exit(1)
  }

  const content = `---
title: ${title}
date: ${date}
tags:
  -
---

# ${title}

Write your content here...
`

  fs.writeFileSync(filePath, content)
  console.log(`\n✅ Created new post: posts/${slug}.md\n`)
  console.log('Edit the file and run "npm run dev" to preview.\n')
}

main()
