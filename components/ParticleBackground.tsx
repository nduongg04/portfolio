// 'use client'

// import React, { useRef, useEffect, useState } from 'react'
// import * as THREE from 'three'

// const ParticleBackground: React.FC = () => {
//   const mountRef = useRef<HTMLDivElement>(null)
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   useEffect(() => {
//     if (!isClient || !mountRef.current) return

//     // Scene setup
//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

//     renderer.setSize(window.innerWidth, window.innerHeight)
//     mountRef.current.appendChild(renderer.domElement)

//     // Particle system
//     const particleCount = 3000
//     const particles = new THREE.BufferGeometry()
//     const positions = new Float32Array(particleCount * 3)

//     for (let i = 0; i < particleCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 10
//       positions[i + 1] = (Math.random() - 0.5) * 10
//       positions[i + 2] = (Math.random() - 0.5) * 10
//     }

//     particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

//     const material = new THREE.PointsMaterial({
//       size: 0.02,
//       color: 0xffffff,
//       transparent: true,
//       blending: THREE.AdditiveBlending,
//       opacity: 0.8,
//     })

//     const particleSystem = new THREE.Points(particles, material)
//     scene.add(particleSystem)

//     camera.position.z = 5

//     // Mouse interaction
//     const mouse = new THREE.Vector2()
//     const target = new THREE.Vector2()
//     const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)

//     const onMouseMove = (event: MouseEvent) => {
//       mouse.x = (event.clientX - windowHalf.x) / windowHalf.x
//       mouse.y = (event.clientY - windowHalf.y) / windowHalf.y * -1
//     }

//     window.addEventListener('mousemove', onMouseMove, false)

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate)

//       target.x = mouse.x * 0.3
//       target.y = mouse.y * 0.3

//       particleSystem.rotation.x += 0.0003
//       particleSystem.rotation.y += 0.0003

//       particleSystem.rotation.x += (target.y - particleSystem.rotation.x) * 0.02
//       particleSystem.rotation.y += (target.x - particleSystem.rotation.y) * 0.02

//       const positions = particles.attributes.position.array as Float32Array
//       for (let i = 0; i < particleCount * 3; i += 3) {
//         const x = positions[i]
//         const y = positions[i + 1]
//         const z = positions[i + 2]

//         positions[i] = x + Math.sin(Date.now() * 0.001 + x * 0.5) * 0.003
//         positions[i + 1] = y + Math.cos(Date.now() * 0.001 + y * 0.5) * 0.003
//         positions[i + 2] = z + Math.sin(Date.now() * 0.001 + z * 0.5) * 0.003
//       }
//       particles.attributes.position.needsUpdate = true

//       renderer.render(scene, camera)
//     }

//     animate()

//     // Resize handler
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight
//       camera.updateProjectionMatrix()
//       renderer.setSize(window.innerWidth, window.innerHeight)
//       windowHalf.set(window.innerWidth / 2, window.innerHeight / 2)
//     }

//     window.addEventListener('resize', handleResize, false)
// 	const mount = mountRef.current

//     // Cleanup
//     return () => {
//       window.removeEventListener('mousemove', onMouseMove)
//       window.removeEventListener('resize', handleResize)
//       mount?.removeChild(renderer.domElement)
//       scene.remove(particleSystem)
//       particles.dispose()
//       material.dispose()
//       renderer.dispose()
//     }
//   }, [isClient])

//   return <div ref={mountRef} className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
// }

// export default ParticleBackground

'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const ParticleBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Particle system
    const particleCount = 3000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = Math.random() * 20 - 10
      positions[i + 1] = Math.random() * 20 - 10
      positions[i + 2] = Math.random() * 20 - 10

      velocities[i] = (Math.random() - 0.5) * 0.01
      velocities[i + 1] = (Math.random() - 0.5) * 0.01
      velocities[i + 2] = (Math.random() - 0.5) * 0.01

      colors[i] = Math.random()
      colors[i + 1] = Math.random()
      colors[i + 2] = Math.random()
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    })

    const particleSystem = new THREE.Points(particles, material)
    scene.add(particleSystem)

    camera.position.z = 5

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const lastMouse = new THREE.Vector2()
    const mouseVelocity = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      lastMouse.copy(mouse)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      mouseVelocity.subVectors(mouse, lastMouse)
    }

    window.addEventListener('mousemove', onMouseMove, false)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      const positions = particles.attributes.position.array as Float32Array
      const colors = particles.attributes.color.array as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        // Update position based on velocity
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Apply mouse influence
        const distance = Math.sqrt(
          Math.pow(positions[i] - mouse.x * 10, 2) +
          Math.pow(positions[i + 1] - mouse.y * 10, 2)
        )
        const influence = Math.max(0, 5 - distance) / 5

        velocities[i] += mouseVelocity.x * influence * 0.1
        velocities[i + 1] += mouseVelocity.y * influence * 0.1

        // Wrap particles around the screen
        if (positions[i] > 10) positions[i] = -10
        if (positions[i] < -10) positions[i] = 10
        if (positions[i + 1] > 10) positions[i + 1] = -10
        if (positions[i + 1] < -10) positions[i + 1] = 10
        if (positions[i + 2] > 10) positions[i + 2] = -10
        if (positions[i + 2] < -10) positions[i + 2] = 10

        // Apply some drag to slow particles
        velocities[i] *= 0.99
        velocities[i + 1] *= 0.99
        velocities[i + 2] *= 0.99

        // Update colors based on velocity
        const speed = Math.sqrt(
          velocities[i] * velocities[i] +
          velocities[i + 1] * velocities[i + 1] +
          velocities[i + 2] * velocities[i + 2]
        )
        colors[i] = Math.min(1, speed * 100)
        colors[i + 1] = Math.max(0, 1 - speed * 50)
        colors[i + 2] = 0.5 + Math.sin(speed * 20) * 0.5
      }

      particles.attributes.position.needsUpdate = true
      particles.attributes.color.needsUpdate = true

      // Reset mouse velocity
      mouseVelocity.set(0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize, false)
    const mount = mountRef.current

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      mount?.removeChild(renderer.domElement)
      scene.remove(particleSystem)
      particles.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isClient])

  return <div ref={mountRef} className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
}

export default ParticleBackground