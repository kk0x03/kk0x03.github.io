import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './ProjectList.css'

const baseUrl = import.meta.env.BASE_URL

function ProjectList() {
  return (
    <section className="project-list">
      <h2>Projects</h2>
      <ul className="projects">
        {projects.map((project) => (
          <li key={project.id} className={`project-item ${project.image ? 'has-image' : ''}`}>
            {project.image && (
              <div className="project-image">
                <img src={`${baseUrl}${project.image}`} alt={project.title} />
              </div>
            )}
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <Link to={`/projects/${project.id}`} className="project-link">
              View Project →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectList
