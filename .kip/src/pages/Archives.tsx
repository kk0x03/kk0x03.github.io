import { Link } from 'react-router-dom'
import { getPostsByYear } from '../data/posts'
import './Archives.css'

function Archives() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="archives">
      <h1 className="page-title">Archives</h1>

      {years.map(year => (
        <div key={year} className="archive-year">
          <h2 className="year-title">{year}</h2>
          <ul className="archive-list">
            {postsByYear[year].map(post => (
              <li key={post.id} className="archive-item">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Archives
