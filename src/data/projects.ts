// Auto-generated - do not edit

import type { Project } from '../types'

export const projects: Project[] = [
  {
    "id": "project-one",
    "title": "Project One",
    "description": "Your first project. Add a brief description here.",
    "image": "images/placeholder.svg",
    "order": 1,
    "tags": [
      "featured",
      "demo"
    ],
    "draft": false,
    "content": "# Project One\n\nDescribe your project here. What problem does it solve? What makes it interesting?\n\n## Features\n\n- Feature one\n- Feature two\n- Feature three\n\n## Tech Stack\n\n- Technology 1\n- Technology 2\n- Technology 3\n\n## Links\n\n- [Live Demo](#)\n- [Source Code](#)",
    "html": "<h1>Project One</h1>\n<p>Describe your project here. What problem does it solve? What makes it interesting?</p>\n<h2>Features</h2>\n<ul>\n<li>Feature one</li>\n<li>Feature two</li>\n<li>Feature three</li>\n</ul>\n<h2>Tech Stack</h2>\n<ul>\n<li>Technology 1</li>\n<li>Technology 2</li>\n<li>Technology 3</li>\n</ul>\n<h2>Links</h2>\n<ul>\n<li><a href=\"#\">Live Demo</a></li>\n<li><a href=\"#\">Source Code</a></li>\n</ul>\n",
    "source": "markdown"
  },
  {
    "id": "project-two",
    "title": "Project Two",
    "description": "Another project. This one links to an external site.",
    "link": "https://github.com/yourusername",
    "order": 2,
    "tags": [
      "external"
    ],
    "draft": false,
    "content": "",
    "html": "",
    "source": "markdown"
  },
  {
    "id": "project-three",
    "title": "Project Three",
    "description": "A simple project without an image.",
    "order": 3,
    "tags": [
      "simple"
    ],
    "draft": false,
    "content": "# Project Three\n\nA project without a thumbnail image. The content is displayed directly on the detail page.\n\n## About\n\nAdd your project details here.\n\n## What I Learned\n\nShare what you learned from building this project.",
    "html": "<h1>Project Three</h1>\n<p>A project without a thumbnail image. The content is displayed directly on the detail page.</p>\n<h2>About</h2>\n<p>Add your project details here.</p>\n<h2>What I Learned</h2>\n<p>Share what you learned from building this project.</p>\n",
    "source": "markdown"
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
