"use client"
import AboutMeSection from "@/components/AboutMeSection";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/ProjectSection";
import AiChatbotSection from "@/components/AiChatbotSection";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212] container sm:mx-auto lg:px-12 py-4 w-full  ">
      <Navbar/>
    <div className="lg:container mx-auto px-12 py-4  ">
   <HeroSection/>
  <section id="about" className="scroll-mt-24">
  <AboutMeSection />
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
   <Footer/>
    </div>
  );
}
