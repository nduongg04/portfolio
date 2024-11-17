'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiNestjs, SiTailwindcss, SiAmazonec2, SiDocker, SiGithubactions } from 'react-icons/si'

const techStack = [
  { name: 'React', Icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
  { name: 'NestJS', Icon: SiNestjs, color: '#E0234E' },
  { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38B2AC' },
	{name: 'AWS EC2', Icon: SiAmazonec2 , color: '#FF9900'},
	{name: 'Docker', Icon: SiDocker , color: '#2496ED'},
	{name: 'Github Actions', Icon: SiGithubactions , color: '#2088FF'},
]

export default function TechStack() {
  return (
    <section id="techstack" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden container">
      
      <motion.h2
        className="text-4xl font-bold mb-12 text-center text-white z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tech Stack
      </motion.h2>
      
      <div className="w-full overflow-hidden z-10">
        <div 
          className="relative w-full overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <motion.div 
            className="flex"
            animate={{
              x: [0, -100 * techStack.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: techStack.length * 2,
                ease: "linear",
              },
            }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center mx-4 min-w-[100px]">
                <tech.Icon size={60} color={tech.color} className="mb-3" />
                <span className="text-sm text-white font-semibold">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <motion.p
        className="text-xl text-center text-gray-300 mt-12 max-w-2xl px-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Empowering your projects with cutting-edge technologies and robust solutions.
      </motion.p>
    </section>
  )
}