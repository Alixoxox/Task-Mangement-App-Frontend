import React from 'react';
import { FaFacebookF, FaTwitter, FaGithub, FaDribbble, FaLinkedin, FaBehance, FaMedium } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white py-4 px-6 h-20 flex justify-center lg:md:w-[88vw] sm:w-[95vw] shadow-sm rounded-lg mx-auto">
      <div className="max-w-5xl w-full h-full flex flex-row items-center justify-between">
        
        {/* Left: Text */}
        <p className="text-sm text-gray-500">
          © 2025 Aykays Agency. All rights reserved.
        </p>

        {/* Right: Social icons */}
        <div className="flex items-center space-x-4 text-gray-800 text-sm">
          <a href="https://www.facebook.com/AykaysAgency/" target="_blank" aria-label="Facebook" className="hover:text-blue-600" >
            <FaFacebookF size={18} />
          </a>
          <a href="https://www.behance.net/aykaysagency" target="_blank" aria-label="Behance" className="hover:text-blue-400">
            <FaBehance size={18}/>
          </a>
          <a href="https://medium.com/@paulrivera0019" target="_blank" aria-label="Medium" className="hover:text-gray-600" >
            <FaMedium size={18}/>
          </a>
          <a href="https://aykays.com/" target="_blank" aria-label="Dribbble" className="hover:text-pink-500">
            <FaDribbble size={18}/>
          </a>
          <a href="https://www.linkedin.com/company/aykays/posts/?feedView=all" target="_blank"  aria-label="Linkedin" className="hover:text-blue-400">
            <FaLinkedin size={18}/>
          </a>
        </div>
      </div>
    </footer>
  );
}
