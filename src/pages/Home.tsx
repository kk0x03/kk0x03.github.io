import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { siteConfig } from '../data/config'
import './Home.css'

const baseUrl = import.meta.env.BASE_URL

function Home() {
  return (
    <div className="home">
      <header className="profile">
        <div className="avatar">
          <img src={`${baseUrl}${siteConfig.avatar}`} alt={siteConfig.name} />
        </div>
        <h1 className="name">{siteConfig.name}</h1>
        <p className="bio">{siteConfig.bio}</p>
        {siteConfig.social && (
          <div className="social-links">
            {siteConfig.social.github && (
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            )}
            {siteConfig.social.twitter && (
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            )}
            {siteConfig.social.email && (
              <a href={`mailto:${siteConfig.social.email}`}>Email</a>
            )}
          </div>
        )}
      </header>

      <section className="projects-section">
        <h2>Projects</h2>
        <ul className="project-list">
          {projects.map(project => (
            <li key={project.id} className={`project-item ${project.image ? 'has-image' : ''}`}>
              {project.image && (
                <div className="project-image">
                  <img src={`${baseUrl}${project.image}`} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Open →
                </a>
              ) : (
                <Link to={`/projects/${project.id}`} className="project-link">
                  View →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
      </footer>
    </div>
  )
}

export default Home
