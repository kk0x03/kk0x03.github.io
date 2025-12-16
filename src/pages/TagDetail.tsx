import { useParams, Link } from 'react-router-dom'
import { getPostsByTag } from '../data/posts'
import './TagDetail.css'

function TagDetail() {
  const { tagName } = useParams<{ tagName: string }>()
  const posts = getPostsByTag(tagName || '')

  if (posts.length === 0) {
    return (
      <div className="tag-detail">
        <div className="not-found">
          <h1>Tag Not Found</h1>
          <p>No posts found with the tag "{tagName}".</p>
          <Link to="/tags" className="back-link">← All Tags</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="tag-detail">
      <Link to="/tags" className="back-link">← All Tags</Link>

      <h1 className="page-title">
        <span className="tag-label">Tag:</span> {tagName}
        <span className="post-count">{posts.length} posts</span>
      </h1>

      <ul className="tag-posts">
        {posts.map(post => (
          <li key={post.id} className="tag-post-item">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <div className="post-info">
              <Link to={`/posts/${post.id}`} className="post-title">
                {post.title}
              </Link>
              <p className="post-excerpt">{post.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagDetail
