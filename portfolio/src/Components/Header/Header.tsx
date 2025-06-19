import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState('introduction');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          if (scrollPosition + windowHeight >= documentHeight - 10) {
            setActiveId('contact');
          } else {
            for (let i = NAV_ITEMS.length - 2; i >= 0; i--) {
              const section = document.getElementById(NAV_ITEMS[i].id);
              if (section && section.getBoundingClientRect().top <= 100) {
                setActiveId(NAV_ITEMS[i].id);
                break;
              }
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed z-50 hidden gap-8 px-6 py-3 rounded-full shadow-lg sm:flex top-4 right-4 backdrop-blur-md bg-white/30">
      {NAV_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`text-lg font-semibold transition-colors duration-300 ${
            activeId === id ? 'text-blue-600' : 'text-black hover:text-blue-500'
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
