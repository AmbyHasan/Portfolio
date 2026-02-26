"use client"
import React, { useRef } from "react";
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer 
      ref={ref}
      className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container p-5 flex items-center justify-center">
        
        <p className="text-slate-600">All rights reserved by Amber Hasan</p>
      </div>
    </motion.footer>
  );
};

export default Footer;