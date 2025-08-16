import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { BsGlobe } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="w-full py-3 sm:px-10 px-3  text-gray-600 bg-bgBase border-t border-primary">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left text-xs font-semibold">
                    © {new Date().getFullYear()} ChatUP. All rights reserved. Developed by:
                    <span className="text-primary font-medium ml-1">Vishnu Cheruvakkara</span>
                </div>

                <div className="flex gap-8 ">
                    <a
                        href="https://vishnu-cheruvakkara-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                    >
                        <BsGlobe size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vishnu-cheruvakkara-231b8b235/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    <a
                        href="https://www.instagram.com/vishnu_c_dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                        
                    >
                        <FaInstagram size={20} />
                    </a>

                    <a
                        href="https://github.com/VishnuCheruvakkara"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                       
                    >
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
