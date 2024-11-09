'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Home from '@/components/Home'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Projects from '@/components/Projects'
// import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Home setActiveSection={setActiveSection} />
        <About />
        <TechStack />
        <Projects />
        {/* <Experience /> */}
        <Contact />
      </main>
    </div>
  )
}