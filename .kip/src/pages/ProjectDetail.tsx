import { useParams, Link } from 'react-router-dom'
import { getProjectById } from '../data/projects'
import './ProjectDetail.css'

const baseUrl = import.meta.env.BASE_URL

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = getProjectById(projectId || '')

  if (!project) {
    return (
      <div className="project-detail">
        <div className="not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <article className="project-detail">
      <Link to="/" className="back-link">← Back to Home</Link>

      {project.image && (
        <div className="project-hero">
          <img src={`${baseUrl}${project.image}`} alt={project.title} />
        </div>
      )}

      <header className="project-header">
        <h1>{project.title}</h1>
        {project.description && (
          <p className="project-subtitle">{project.description}</p>
        )}
        {project.source === 'notion' && (
          <span className="source-badge">From Notion</span>
        )}
      </header>

      <div
        className="project-content markdown-body"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />
    </article>
  )
}

export default ProjectDetail
