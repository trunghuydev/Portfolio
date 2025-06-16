import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section && section.getBoundingClientRect().top <= 80) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed z-50 flex gap-8 px-8 py-4 rounded-full shadow-lg top-6 right-6 backdrop-blur-md bg-white/30">
      {NAV_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`text-lg font-semibold transition-colors ${
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
