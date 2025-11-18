import React from 'react';
import { FiArrowRight, FiMail } from 'react-icons/fi';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  avatarUrl?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  avatarUrl,
}) => {
  const handleCTAClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-corp-navy via-corp-navy to-corp-accent overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleCTAClick(ctaPrimary.href)}
                className="group px-6 py-3 bg-corp-accent text-white font-semibold rounded-md hover:bg-corp-accent/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-corp-navy flex items-center justify-center gap-2"
                aria-label={ctaPrimary.label}
              >
                {ctaPrimary.label}
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => handleCTAClick(ctaSecondary.href)}
                className="px-6 py-3 bg-transparent text-white font-semibold border-2 border-white rounded-md hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-corp-navy flex items-center justify-center gap-2"
                aria-label={ctaSecondary.label}
              >
                <FiMail className="w-5 h-5" aria-hidden="true" />
                {ctaSecondary.label}
              </button>
            </div>
          </div>

          {avatarUrl && (
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-corp-accent rounded-full blur-2xl opacity-30 animate-pulse" />
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-white shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

