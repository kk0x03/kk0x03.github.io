import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { siteConfig } from './data/config'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import './App.css'

function App() {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', siteConfig.theme || 'dark')
    root.setAttribute('data-layout', siteConfig.layout?.style || 'list')
    root.setAttribute('data-avatar', siteConfig.layout?.avatar || 'circle')
    root.setAttribute('data-card', siteConfig.layout?.card || 'bordered')
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App
