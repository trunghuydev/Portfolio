import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

interface FooterProps {
  github?: string;
  linkedin_url?: string | null;
  email?: string;
  fullname?: string;
}

const Footer: React.FC<FooterProps> = ({
  github,
  linkedin_url,
  email,
  fullname,
}) => {
  const currentYear = new Date().getFullYear();
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (clicks >= 5) {
      navigate('/a-dmin/edit-profile');
    }

    const timer = setTimeout(() => setClicks(0), 1500);
    return () => clearTimeout(timer);
  }, [clicks, navigate]);

  return (
    <footer className="bg-corp-navy text-white py-8" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            className="text-sm text-white/80 select-none cursor-pointer" 
            onClick={() => setClicks((prev) => prev + 1)}
          >
            © {currentYear} {fullname || 'Portfolio'}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-corp-navy"
                aria-label="GitHub profile"
              >
                <FiGithub className="w-5 h-5" aria-hidden="true" />
              </a>
            )}

            {linkedin_url && (
              <a
                href={linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-corp-navy"
                aria-label="LinkedIn profile"
              >
                <FiLinkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-corp-navy"
                aria-label="Send email"
              >
                <FiMail className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

