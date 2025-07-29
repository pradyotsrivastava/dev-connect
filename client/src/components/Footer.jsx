// Footer.jsx
import { BsGlobe2, BsPhone } from "react-icons/bs";
import { FaGithub, FaLaptop, FaLinkedin } from "react-icons/fa";
import { HiMail, HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-10 mt-auto items-end">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-y-8">
        {/* About Me */}
        <div className="min-w-[200px] flex-1">
          <h3 className="text-3xl font-semibold mb-3">Pradyot Srivastava</h3>
          <p className="text-xl font-semibold mb-3">Full Stack Developer</p>
          <p className="flex items-center gap-2 mt-1 m-0">
            <FaLaptop className="text-xl" />
            <span className="text-lg">Noida, Uttar Pradesh</span>
          </p>
        </div>

        {/* Contact Info */}
        <div className="min-w-[200px] flex-1">
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-center m-0">
              <HiMail className="text-lg" />
              <a
                href="mailto:pradyotsrivastava93@gmail.com"
                className="hover:underline"
              >
                pradyotsrivastava93@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2 m-0">
              <BsPhone className="text-lg" /> +91 8303180457
            </p>
            <p className="flex items-center gap-2 mt-1 m-0">
              <HiOutlineLocationMarker className="text-lg" />
              <span>Prayagraj, Uttar Pradesh</span>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="min-w-[200px] flex-1">
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/pradyotsrivastava/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn/pradyotsrivastava
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaGithub />
              <a
                href="https://github.com/pradyotsrivastava"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub/pradyotsrivastava
              </a>
            </li>
            <li className="flex items-center gap-2">
              <BsGlobe2 />
              <a
                href="https://pradyot-portfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Portfolio/pradyot-portfolio
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Pradyot Srivastava. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
