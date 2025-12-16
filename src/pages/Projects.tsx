import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './Projects.css'

const baseUrl = import.meta.env.BASE_URL

function Projects() {
  return (
    <div className="projects-page">
      <h1 className="page-title">Projects</h1>

      <div className="projects-grid">
        {projects.map(project => (
          <article key={project.id} className="project-card">
            {project.image && (
              <div className="project-image">
                <img src={`${baseUrl}${project.image}`} alt={project.title} />
              </div>
            )}
            <div className="project-info">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <Link to={`/projects/${project.id}`} className="project-link">
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Projects
