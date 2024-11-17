import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { FaLaptopCode, FaRocket, FaLightbulb } from 'react-icons/fa'

const About = forwardRef<HTMLElement>((props, ref) => {
  const skills = [
    { name: 'Web Development', icon: FaLaptopCode, description: 'Building responsive and interactive web applications' },
    { name: 'Problem Solving', icon: FaLightbulb, description: 'Tackling complex challenges with creative solutions' },
    { name: 'Continuous Learning', icon: FaRocket, description: 'Always expanding my knowledge and staying up-to-date with the latest technologies' },
  ]

  return (
    <section id="about" ref={ref} className="py-20">
      <div className="container mx-auto px-4 relative z-20">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-700 border-gray-600 shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-300 mb-4">
                  As an aspiring full-stack developer, I'm passionate about creating efficient, user-friendly web applications. Although I'm at the beginning of my journey, I'm dedicated to continuous learning and improving my skills in Node.js, Next.js, NestJS, React, TypeScript, HTML, CSS, and Tailwind CSS.
                </p>
                <p className="text-gray-300">
                  I'm excited to take on new challenges and contribute to innovative projects. My goal is to build scalable, performant web applications that provide great user experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {skills.map((skill, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 shadow-lg">
                <CardContent className="p-4 flex items-start">
                  <skill.icon className="text-4xl text-blue-400 mr-4 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{skill.name}</h3>
                    <p className="text-gray-300">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About