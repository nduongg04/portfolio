'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiNestjs, SiTailwindcss } from 'react-icons/si'

const techStack = [
  { name: 'React', Icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
  { name: 'NestJS', Icon: SiNestjs, color: '#E0234E' },
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38B2AC' },
]

export default function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    // const containerWidth = scrollContainer.offsetWidth

    let scrollPosition = 0
    const scroll = () => {
      scrollPosition += 1
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 20)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section id="techstack" className="py-20 overflow-hidden z-50 relative bg-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>
        <div 
          className="relative w-full overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden"
            style={{ width: '200%' }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center mx-4 min-w-[100px]">
                <tech.Icon size={40} color={tech.color} className="mb-2" />
                <span className="text-sm text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}