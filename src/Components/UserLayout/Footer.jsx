import React, { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import "./Footer.css"
const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const handleScroll = () => {
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollThreshold = 100; // Adjust this threshold as needed

        if (footerPosition < windowHeight - scrollThreshold) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <footer ref={footerRef} className={`bg-black text-white py-8 ${isVisible ? 'footer-visible' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h1 className="text-3xl font-bold mb-4">{import.meta.env.VITE_SITE_NAME}®</h1>
              <p className="mb-4">Free forever.</p>
              <button className="bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-gray-200 hover:text-black transform hover:scale-105 hover:shadow-lg">
                Get Started &rarr;
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Resources</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">About</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Learn</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Blog</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Follow Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Advertise</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Partners</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Support</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Suggestions</a></li>
                <li className="mb-2 transform transition-transform duration-300 hover:translate-x-2"><a href="#">Verification Request</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="transition-transform transform hover:scale-125 hover:text-pink-500"><FaInstagram size="1.5em" /></a>
                <a href="#" className="transition-transform transform hover:scale-125 hover:text-blue-700"><FaLinkedin size="1.5em" /></a>
                <a href="#" className="transition-transform transform hover:scale-125 hover:text-gray-500"><FaGithub size="1.5em" /></a>
                <a href="#" className="transition-transform transform hover:scale-125 hover:text-blue-400"><FaTwitter size="1.5em" /></a>
                <a href="#" className="transition-transform transform hover:scale-125 hover:text-blue-600"><FaFacebook size="1.5em" /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p>&copy; 2024 {import.meta.env.VITE_SITE_NAME}®. All rights reserved.</p>
            <div>
              <a href="#" className="mr-4 transition-colors duration-300 hover:text-gray-400">Terms and Conditions</a>
              <a href="#" className="transition-colors duration-300 hover:text-gray-400">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;