import './About.css'

const baseUrl = import.meta.env.BASE_URL

function About() {
  return (
    <div className="about-page">
      <h1 className="page-title">About</h1>

      <div className="about-content">
        <div className="about-avatar">
          <img src={`${baseUrl}images/avatar.png`} alt="Avatar" />
        </div>

        <section className="about-section">
          <h2>Hello!</h2>
          <p>
            Welcome to my blog! I'm a developer passionate about building things
            for the web. This is my personal space where I share my thoughts,
            projects, and learnings.
          </p>
        </section>

        <section className="about-section">
          <h2>What I Do</h2>
          <p>
            I specialize in frontend development with a focus on React and modern
            JavaScript. I enjoy creating clean, performant, and user-friendly
            interfaces.
          </p>
          <ul>
            <li>Frontend Development (React, Vue, TypeScript)</li>
            <li>UI/UX Design</li>
            <li>Open Source Contribution</li>
            <li>Technical Writing</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out if you want to collaborate on a project,
            have questions, or just want to say hi!
          </p>
          <div className="contact-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="mailto:hello@example.com">
              Email
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
