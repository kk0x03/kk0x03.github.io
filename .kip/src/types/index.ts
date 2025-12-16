export interface Post {
  id: string
  title: string
  date: string
  tags?: string[]
  excerpt: string
  content: string
  html: string
}

export interface Project {
  id: string
  title: string
  description: string
  link?: string
  image?: string | null
  order?: number
  tags?: string[]
  draft?: boolean
  content: string
  html: string
  source: string
}

export interface SiteConfig {
  name: string
  bio: string
  avatar: string
  social?: {
    github?: string
    twitter?: string
    email?: string
    [key: string]: string | undefined
  }
  title: string
  subtitle?: string
  description?: string
  author?: string
  root: string
  theme: string
  layout?: {
    style?: 'list' | 'grid' | 'cards'
    avatar?: 'circle' | 'square'
    card?: 'bordered' | 'shadow' | 'flat'
  }
  profileContent?: string
  profileHtml?: string
}
