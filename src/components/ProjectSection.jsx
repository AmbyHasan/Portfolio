"use client"
import React, { useRef } from 'react'
import ProjectCard from './ProjectCard'
import { motion, useInView } from 'framer-motion'


//data for the project cards
const projectsData=[

  {
  id: 1,
  title: "InterviewX",
  description: "AI-powered interview platform that simulates real interviews with voice-based interaction and structured feedback.",
  image: "/InterviewX.png",
  url:"https://github.com/AmbyHasan/InterviewX-v1.git"
},
{
  id: 2,
  title: "Blogify",
  description: "Full-stack blogging platform with authentication, role-based access, and rich content management features.",
  image: "/Blogify.png",
  url:"https://github.com/AmbyHasan/BlogiFy.git"
},
{
  id: 3,
  title: "BubbleBrain",
  description: "A personal knowledge management app to store, organize, and revisit ideas with a clean and intuitive UI.",
  image: "/BubbleBrain.png",
  url:"https://github.com/AmbyHasan/BUBBLE_BRAIN.git"
},
{
  id: 4,
  title: "Chrome Extension",
  description: "Lightweight Chrome extension built to enhance productivity through browser-based automation and utilities.",
  image: "/ChromeExtension.png",
  url:"https://github.com/AmbyHasan/My_Chrome_Extension.git"
},
{
  id: 5,
  title: "Netflix UI Clone",
  description: "A responsive Netflix-inspired UI clone focusing on modern layouts, animations, and component-based design.",
  image: "/NetflixClone.png",
  url:"https://github.com/AmbyHasan/NETFLIX_CLONE.git"
},
{
  id: 6,
  title: "JWT Authentication",
  description: "Secure authentication system implementing JWT-based login, protected routes, and role-based authorization.",
  image: "/JWT_Authentication.png",
  url:"https://github.com/AmbyHasan/AUTHENTICATION.git"
},
{
  id: 7,
  title: "React Task Management App",
  description: "Task management application built with React featuring CRUD operations and intuitive state handling.",
  image: "/React_Task_Management_App.png",
  url:"https://github.com/AmbyHasan/REACT_Task_manager_App.git"
},
{
  id: 8,
  title: "X.com UI Clone",
  description: "Pixel-perfect UI clone of X.com (Twitter) built to practice responsive design and modern frontend techniques.",
  image: "/X.comClone.png",
  url:"https://github.com/AmbyHasan/X.com-Clone.git"
}
]

const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
        <motion.div 
          className="text-center text-4xl font-bold mt-4 mb-8 md:mb-12 bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            {projectsData.map((project, index)=> (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard title={project.title} description={project.description} imgUrl={project.image} url={project.url} />
              </motion.div>
            ))}
        </motion.div>
      
    </div>
  )
}

export default ProjectSection
