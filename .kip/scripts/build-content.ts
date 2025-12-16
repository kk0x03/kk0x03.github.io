#!/usr/bin/env tsx

/**
 * Build Content Script
 * Reads markdown files and Notion pages
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { marked } from 'marked'
import yaml from 'js-yaml'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

interface ProfileData {
  name?: string
  bio?: string
  avatar?: string
  social?: {
    github?: string
    twitter?: string
    email?: string
    [key: string]: string | undefined
  }
  content?: string
  html?: string
}

interface Config {
  name?: string
  bio?: string
  avatar?: string
  social?: {
    github?: string
    twitter?: string
    email?: string
    [key: string]: string | undefined
  }
  title?: string
  subtitle?: string
  description?: string
  author?: string
  root?: string
  theme?: string
  layout?: {
    style?: string
    avatar?: string
    card?: string
  }
  notion?: {
    api_key?: string
  }
}

interface ProjectData {
  id: string
  title?: string
  description?: string
  link?: string
  image?: string | null
  order?: number
  tags?: string[]
  draft?: boolean
  notion_id?: string
  content: string
  html: string
  source: string
}

function readConfig(): Config {
  const configPath = path.join(rootDir, '_config.yml')
  if (fs.existsSync(configPath)) {
    return yaml.load(fs.readFileSync(configPath, 'utf-8')) as Config
  }
  return {}
}

async function readProfile(): Promise<ProfileData> {
  const profilePath = path.join(rootDir, 'blog', 'profile.md')
  if (!fs.existsSync(profilePath)) {
    return {}
  }

  const content = fs.readFileSync(profilePath, 'utf-8')
  const { data, content: markdown } = matter(content)
  const trimmedMarkdown = markdown.trim()
  const html = trimmedMarkdown ? await marked(trimmedMarkdown) : ''

  return {
    ...data,
    content: trimmedMarkdown || undefined,
    html: html || undefined
  } as ProfileData
}

function initNotion(apiKey?: string): Client | null {
  if (!apiKey || apiKey === 'YOUR_NOTION_API_KEY') {
    return null
  }
  return new Client({ auth: apiKey })
}

async function fetchNotionContent(notion: Client, pageId: string): Promise<string | null> {
  try {
    const n2m = new NotionToMarkdown({ notionClient: notion })
    const mdBlocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdBlocks)
    return (mdString as { parent: string }).parent || mdString as unknown as string
  } catch (error) {
    const err = error as Error
    console.log(`  ⚠️  Failed to fetch Notion: ${pageId} - ${err.message}`)
    return null
  }
}

async function readMarkdownFiles(dir: string, notion: Client | null): Promise<ProjectData[]> {
  const dirPath = path.join(rootDir, dir)
  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'))
  const projects: ProjectData[] = []

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data, content: markdown } = matter(content)
    const id = path.basename(file, '.md')

    let finalMarkdown = markdown.trim()
    let source = 'markdown'

    if (data.notion_id && notion) {
      console.log(`  📡 Fetching Notion: ${data.notion_id}`)
      const notionContent = await fetchNotionContent(notion, data.notion_id)
      if (notionContent) {
        finalMarkdown = notionContent
        source = 'notion'
      }
    }

    const html = await marked(finalMarkdown)

    projects.push({
      id,
      ...data,
      content: finalMarkdown,
      html,
      source
    } as ProjectData)
  }

  return projects
}

function generateProjectsData(projects: ProjectData[]): void {
  const published = projects.filter(p => p.draft !== true)

  published.sort((a, b) => {
    const orderA = a.order ?? 999
    const orderB = b.order ?? 999
    if (orderA !== orderB) return orderA - orderB
    return (a.title || '').localeCompare(b.title || '')
  })

  const code = `// Auto-generated - do not edit

import type { Project } from '../types'

export const projects: Project[] = ${JSON.stringify(published, null, 2)}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
`
  fs.writeFileSync(path.join(rootDir, 'src', 'data', 'projects.ts'), code)
  console.log(`✅ Generated src/data/projects.ts (${published.length} projects, ${projects.length - published.length} drafts)`)
}

function generateConfigData(config: Config, profile: ProfileData): void {
  // Profile data takes precedence over _config.yml for personal info
  const safeConfig = {
    ...config,
    name: profile.name || config.name,
    bio: profile.bio || config.bio,
    avatar: profile.avatar || config.avatar,
    social: profile.social || config.social,
    profileContent: profile.content,
    profileHtml: profile.html
  }
  delete safeConfig.notion

  const code = `// Auto-generated from _config.yml and profile.md

import type { SiteConfig } from '../types'

export const siteConfig: SiteConfig = ${JSON.stringify(safeConfig, null, 2)}
`
  fs.writeFileSync(path.join(rootDir, 'src', 'data', 'config.ts'), code)
  console.log('✅ Generated src/data/config.ts')
}

function copyImages(): void {
  const srcDir = path.join(rootDir, 'blog', 'images')
  const destDir = path.join(rootDir, 'public', 'images')

  if (!fs.existsSync(srcDir)) {
    return
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const files = fs.readdirSync(srcDir)
  for (const file of files) {
    const srcPath = path.join(srcDir, file)
    const destPath = path.join(destDir, file)
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
  console.log(`📷 Copied ${files.length} images to public/images`)
}

async function main(): Promise<void> {
  console.log('\n📦 Building content...\n')

  const dataDir = path.join(rootDir, 'src', 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Copy images from blog/images to public/images
  copyImages()

  const config = readConfig()
  const profile = await readProfile()
  generateConfigData(config, profile)

  const notion = initNotion(config.notion?.api_key)
  if (notion) {
    console.log('🔑 Notion API connected')
  }

  const projects = await readMarkdownFiles('blog/projects', notion)
  console.log(`📁 Found ${projects.length} projects`)

  generateProjectsData(projects)

  console.log('\n✅ Done!\n')
}

main().catch(console.error)
