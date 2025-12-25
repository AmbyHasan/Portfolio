"use client"
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import { useState } from "react";
import MenuCard from "./MenuCard";



//links in the navbar
const navLinks=[
    {
        title:"About" ,
        path:"#about"
    } ,
     {
        title:"Problem Solving",
        path: "#programming"
    } ,
    
    {
        title:"Projects" ,
        path:"#projects"
    } ,
    {
        title:"Contact" ,
        path:"#contact"

    } ,
   
]
const Navbar = () => {
     const [navbarOpen , setNavbarOpen]=useState(false);
  return (
   
    <nav className="sticky top-0 z-10 bg-[rgba(18,18,18,0.5)] backdrop-blur">
        <div className="flex flex-wrap items-center justify-between mx-auto p-5 ">
            {/* LOGO */}
     <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-linear-to-r from-purple-400 to-pink-500 text-white font-bold">
  AH
</div>

<div className="mobile-menu block md:hidden">
    {
        !navbarOpen ? ( //show the three lined icon
            <button  onClick={()=> setNavbarOpen(true)} className="flex text-slate-200 items-center px-2 py-2 border rounded border-slate-200 hover:text-white hover:border-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

            </button>
        ):(  //show the cross mark
             <button  onClick={()=> setNavbarOpen(false)}  className="flex text-slate-200 items-center px-2 py-2 border rounded border-slate-200 hover:text-white hover:border-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
        )
    }
</div>

<div className="menu hidden md:block md:w-auto" id="navbar">
    <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
        {
            navLinks.map((link ,index)=>(
                <li key={index}>
                    <NavLink href={link.path} title={link.title}/>
                </li>
            ))
        }
    </ul>
</div>
</div>
{navbarOpen ? <MenuCard links={navLinks}/> :null}
    </nav>
  );
};

export default Navbar;