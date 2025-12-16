import { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { posts, getAllTags } from '../data/posts'
import { siteConfig } from '../data/config'
import './Layout.css'

const baseUrl = import.meta.env.BASE_URL

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const tagCount = getAllTags()
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  return (
    <div className="layout">
      <header className="site-header">
        <div className="header-content">
          <Link to="/" className="site-title">
            <h1>{siteConfig.title}</h1>
          </Link>
          <p className="site-subtitle">{siteConfig.subtitle}</p>
        </div>
        <nav className="site-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/archives">Archives</NavLink>
          <NavLink to="/tags">Tags</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <div className="site-content">
        <main className="main-content">
          {children}
        </main>

        <aside className="sidebar">
          <div className="widget profile-widget">
            <div className="avatar">
              <img src={`${baseUrl}${siteConfig.avatar}`} alt="Avatar" />
            </div>
            <h3 className="profile-name">{siteConfig.author}</h3>
            <p className="profile-bio">{siteConfig.description}</p>
            {siteConfig.social && (
              <div className="social-links">
                {siteConfig.social.github && (
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                )}
                {siteConfig.social.twitter && (
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                )}
              </div>
            )}
          </div>

          <div className="widget">
            <h3 className="widget-title">Recent Posts</h3>
            <ul className="recent-posts">
              {recentPosts.map(post => (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="widget">
            <h3 className="widget-title">Tags</h3>
            <div className="tag-cloud">
              {topTags.map(([tag]) => (
                <Link key={tag} to={`/tags/${tag}`} className="tag">{tag}</Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {siteConfig.title}. Powered by React + Vite</p>
      </footer>
    </div>
  )
}

export default Layout
