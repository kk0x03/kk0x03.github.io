import { Link } from 'react-router-dom'
import { getAllTags } from '../data/posts'
import './Tags.css'

function Tags() {
  const tagCount = getAllTags()
  const tags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])

  return (
    <div className="tags-page">
      <h1 className="page-title">Tags</h1>

      <div className="tags-cloud">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="tag-item"
            style={{
              fontSize: `${Math.min(1 + count * 0.2, 1.8)}rem`
            }}
          >
            {tag}
            <span className="tag-count">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tags
