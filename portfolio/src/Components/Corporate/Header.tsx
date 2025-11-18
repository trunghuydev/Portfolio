import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
  currentSection?: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Header: React.FC<HeaderProps> = ({ currentSection = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    console.log('Download CV clicked');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl lg:text-2xl font-bold text-corp-navy focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2 rounded"
            aria-label="Home"
          >
            Portfolio
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm lg:text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2 rounded px-2 py-1 ${
                  currentSection === item.id
                    ? 'text-corp-accent border-b-2 border-corp-accent'
                    : 'text-corp-gray-700 hover:text-corp-accent'
                }`}
                aria-current={currentSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleDownloadCV}
              className="ml-4 px-4 py-2 text-sm font-semibold text-corp-accent border-2 border-corp-accent rounded-md hover:bg-corp-accent hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2"
              aria-label="Download CV"
            >
              Download CV
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-corp-navy focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2 rounded"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" aria-hidden="true" />
            ) : (
              <FiMenu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          >
            <div
              className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4 mt-16">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-lg font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2 ${
                      currentSection === item.id
                        ? 'text-corp-accent bg-corp-gray-100'
                        : 'text-corp-gray-700 hover:bg-corp-gray-100 hover:text-corp-accent'
                    }`}
                    aria-current={currentSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={handleDownloadCV}
                  className="mt-4 px-4 py-2 text-base font-semibold text-corp-accent border-2 border-corp-accent rounded-md hover:bg-corp-accent hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2"
                  aria-label="Download CV"
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

