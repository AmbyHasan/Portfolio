"use client"
import React, { startTransition } from 'react'
import Image from 'next/image'
import {useState , useTransition} from "react"
import TabButton from './TabButton'

//Data to be displayed in the tabs
const TAB_DATA=[
  {
    title:"Skills" ,
    id:"skills" ,
    content:(
         <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>
        <span className="font-semibold text-white">Languages:</span>{" "}
        C++, C, JavaScript (ES6+), TypeScript, Java, Python
      </li>

      <li>
        <span className="font-semibold text-white">Frontend:</span>{" "}
        React.js, Next.js, Tailwind CSS, HTML, CSS
      </li>

      <li>
        <span className="font-semibold text-white">Backend:</span>{" "}
        Node.js, Express.js, REST APIs, Authentication & Authorization
      </li>

      <li>
        <span className="font-semibold text-white">Databases:</span>{" "}
        MongoDB, MySQL
      </li>

      <li>
        <span className="font-semibold text-white">DevOps & Tools:</span>{" "}
        Git, GitHub, Docker (Basics), Postman
      </li>

      <li>
        <span className="font-semibold text-white">Core Concepts:</span>{" "}
        Data Structures & Algorithms (DSA), OOP, DBMS, OS, Low-Level Design (LLD)
      </li>
    </ul>
      
        )
  } ,
  {
    title:"Education",
    id:"education" ,
    content:(
         <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>
        <span className="font-semibold text-white">
          B.Tech in Computer Science and Engineering
        </span>{" "}
        — Pranveer Singh Institute of Technology (PSIT), Kanpur  
        <br />
        <span className="text-sm text-gray-400">
          2023 – 2027 | CGPA: 8.96
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          Senior Secondary Education (Class XII)
        </span>{" "}
        — Hudson Memorial Girls Inter College  
        <br />
        <span className="text-sm text-gray-400">
          2020 – 2022 | Percentage: 80%
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          Secondary Education (Class X)
        </span>{" "}
        — Hudson Memorial Girls Inter College  
        <br />
        <span className="text-sm text-gray-400">
          Percentage: 84.6%
        </span>
      </li>
    </ul>
    )

  } ,
  {
  title: "Certifications",
  id: "certifications",
  content: (
    <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>
        <span className="font-semibold text-white">
          Node.js & Express.js
        </span>{" "}
        — Simplilearn{" "}   
      
        <span className="text-sm text-gray-400">
          2025
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          Python for Data Science
        </span>{" "}
        — Infosys Springboard{" "}   
      
        <span className="text-sm text-gray-400">
          2024
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          HTML, CSS & JavaScript
        </span>{" "}
        — Infosys Springboard{" "}  
        
        <span className="text-sm text-gray-400">
          2024
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          C Programming & C++ Programming
        </span>{" "}
        — Infosys Springboard{" "}  
       
        <span className="text-sm text-gray-400">
          2024
        </span>
      </li>

      <li>
        <span className="font-semibold text-white">
          Introduction to Figma
        </span>{" "}
        — Simplilearn{" "} 
      
        <span className="text-sm text-gray-400">
          2025
        </span>
      </li>
    </ul>
  ),
}

]


//---------------------------------------------------------------------------------------------------------------------------------------------------

const AboutMeSection = () => {
  
    const [tab , setTab]= useState("skills");
    const [  isPending  , startTransition]=useTransition();

  //for the transition when we click on skills , certification and education
  
const handleTabChange=(id)=>{
  startTransition(()=>{
    setTab(id);
  })
}

  return (

    // ABOUT ME
    <div className="text-white ">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-1 xl:gap-16 sm:py-16 xl:px-16">
        <Image
        src="/AboutMe.png" width={500} height={500} alt="me"
        className="rounded-2xl "
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
        <h2  className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">About Me</h2>
      <p className="text-base sm:p-0">I am a Computer Science and Engineering student at Pranveer Singh Institute of Technology (PSIT), Kanpur, with strong foundations in Data Structures and Algorithms and hands-on experience in full-stack web development. I enjoy building scalable, user-focused applications using modern technologies.
</p>
<br/> <p>I have solved 1000+ problems on LeetCode, which has strengthened my problem-solving skills and ability to write efficient, maintainable code. I am a continuous learner and am actively seeking opportunities to contribute to real-world projects and grow as an engineer.
</p>
   
 {/* TAB Headings */}
 <div className="flex flex-row justify-start mt-8">
    <TabButton selectTab={()=> handleTabChange("skills")} active = {tab === "skills"}>{" "}Skills{" "}</TabButton>
    <TabButton selectTab={()=> handleTabChange("education")} active = {tab === "education"}>{" "}Education{" "}</TabButton>
    <TabButton selectTab={()=> handleTabChange("certifications")} active = {tab === "certifications"}>{" "}Certifications{" "}</TabButton>
   </div>

 {/* displaying the tab content */}
<div className="mt-8">{TAB_DATA.find((t)=> t.id===tab).content}</div>




</div>
      </div>
     
    </div>
  )
}

export default AboutMeSection
