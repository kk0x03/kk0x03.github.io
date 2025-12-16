import { useParams, Link } from 'react-router-dom'
import { getPostById } from '../data/posts'
import './PostDetail.css'

function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const post = getPostById(postId || '')

  if (!post) {
    return (
      <div className="post-detail">
        <div className="not-found">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="post-detail">
      <Link to="/" className="back-link">← Back to Home</Link>

      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="meta-separator">•</span>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <Link key={tag} to={`/tags/${tag}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div
        className="post-content markdown-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="post-footer">
        <div className="post-nav">
          <Link to="/" className="nav-link">← All Posts</Link>
        </div>
      </footer>
    </article>
  )
}

export default PostDetail
