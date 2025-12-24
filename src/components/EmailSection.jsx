"use client";
import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

import Link from "next/link";
import Image from "next/image";




const EmailSection = () => {
 
   const [state, handleSubmit] = useForm("xvzpylkw");
  
  // if (state.succeeded) {
  //   return <p className="text-green-400">Thanks for reaching out! 💜</p>;
  // }


   
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
     <div className=" absolute top-3/4 -left-4 h-80 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.6),transparent_70%)]  blur-2xl -translate-x-2   -translate-y-1/2   z-0 "
></div>
      <div className="z-10">
        <h5 className="text-4xl font-bold mt-4 my-2 bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2 ">
          <Link href="https://github.com/AmbyHasan">
          <div className="bg-white rounded-full mr-4 ">
            <Image src="/github-icon.svg" width={24} height={24} alt="Github Icon" />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/amber-hasan-b280b61b9/">
           <div className="bg-white rounded-sm ">
            <Image src="/linkedin-icon.svg" width={24} height={24}  alt="Linkedin Icon" />
            </div>
          </Link>
        </div>
      </div>
      <div>
      
      
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col" >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-md font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="you@gmail.com"/>
 
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-md mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                  
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"/>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-md mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
           
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."/>
                 <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="px-6 py-4 w-full rounded-full text-white  bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-600"
            >
               {state.submitting ? "Sending..." : "Send Message"}
            </button>


          </form>
        
      </div>

      { 
        state.succeeded && <p className="text-green-400">Thanks for reaching out! 💜</p> 
      }

    </section>
  );
};

export default EmailSection;