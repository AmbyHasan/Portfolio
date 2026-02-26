"use client"
import AboutMeSection from "@/components/AboutMeSection";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/ProjectSection";
import AiChatbotSection from "@/components/AiChatbotSection";
import ProgrammingSection from "@/components/ProgrammingSection";
export default function Home() {
  return (

    <div className="flex min-h-screen flex-col bg-[#121212] w-full">
      <Navbar/>
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 py-4">
   <HeroSection/>

  <section id="about" className="scroll-mt-24">
  <AboutMeSection />
</section>

<section id="programming" className="scroll-mt-24">
  <ProgrammingSection/>
</section>

   <section id="projects" className="scroll-mt-24">
  <ProjectSection />
</section>

   <section id="contact" className="scroll-mt-24">
  <EmailSection />
</section>

 <section id="chatbot" className="scroll-mt-24">
  <AiChatbotSection />
</section>

   </div>  
   <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
     <Footer/>
   </div>
    </div>
  );
}
