import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full p-3 text-gray-600 bg-bgBase border-t border-primary">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left text-xs font-semibold">
                    © {new Date().getFullYear()} ChatUP. All rights reserved. Developed by:
                    <span className="text-primary font-medium ml-1">Vishnu Cheruvakkara</span>
                </div>

                <div className="flex gap-8 ">
                    <a
                        href="https://linkedin.com/in/YOUR_LINKEDIN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    <a
                        href="https://instagram.com/YOUR_INSTAGRAM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary transition duration-300 hover:text-bgBase"
                        
                    >
                        <FaInstagram size={20} />
                    </a>

                    <a
                        href="https://github.com/YOUR_GITHUB"
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
