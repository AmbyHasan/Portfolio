import React from 'react'
import Link from 'next/link'

const ProjectCard = ({imgUrl , title , description ,url}) => {
  return (
    <div className="bg-black backdrop-blur-lg p-3 rounded-xl hover:-translate-y-2 active:-translate-y-2   md:shadow-none md:hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.3)]  ">
      <div className="h-52 mb-2 md:h-72 rounded-t-xl relative group bg-white" style={{background: `url(${imgUrl})` , backgroundSize:"cover"}}>
      <div className="items-center justify-center overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-[rgba(18,18,18,0.7)] group-active:flex group-active:bg-[rgba(18,18,18,0.7)] group-hover:backdrop-blur group-active:backdrop-blur transition-all duration-500   ">
       <Link   target="_blank" rel="noopener noreferrer" href={url} className="h-14 w-14 relative rounded-full border-2 border-[#ADB7BE] hover:border-white active:border-white flex items-center justify-center">

       {/* code bracket icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>

       </Link> 
      </div>
      </div>
      <div classame="text-white rounded-b-xl bg-[#181818] py-6 px-4">
      <h5 className="font-xl font-semibold mb-2">{title}</h5>
      <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  )
}

export default ProjectCard
