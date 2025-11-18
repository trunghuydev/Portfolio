import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '@/Interface/TPersonalInfo';
import { WorkExp } from '@/Interface/TWorkExp';
import { Project } from '@/Interface/TProject';
import { SkillGroup } from '@/Interface/TSkills';
import { EmailPayload } from '@/Interface/TEmail';
import Header from './Header';
import Hero from './Hero';
import Highlights from './Highlights';
import About from './About';
import Timeline from './Timeline';
import SkillsPanel from './SkillsPanel';
import Projects from './Projects';
import ContactForm from './ContactForm';
import Footer from './Footer';
import SEOHead from './SEOHead';

interface CorporatePortfolioProps {
  profile: PersonalInfo;
  workExp: WorkExp[];
  projects: Project[];
  skillGroups: SkillGroup[];
  onSendEmail: (data: EmailPayload) => Promise<void>;
}

const CorporatePortfolio: React.FC<CorporatePortfolioProps> = ({
  profile,
  workExp,
  projects,
  skillGroups,
  onSendEmail,
}) => {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const yearsOfExperience = profile.workExpOfYear || 0;
  const projectCount = projects.length;
  const techStackCount = skillGroups.reduce((acc, group) => acc + group.skills.length, 0);

  const heroTitle = profile.position_career || `${profile.fullname} - Software Developer`;
  const heroSubtitle =
    profile.background?.substring(0, 150) ||
    'Experienced software developer passionate about building scalable and efficient solutions.';

  return (
    <div className="min-h-screen bg-white">
      <SEOHead profile={profile} />
      <Header currentSection={currentSection} />

      <main>
        <Hero
          title={heroTitle}
          subtitle={heroSubtitle}
          ctaPrimary={{ label: 'View Projects', href: '#projects' }}
          ctaSecondary={{ label: 'Contact Me', href: '#contact' }}
          avatarUrl={profile.avatar}
        />

        <Highlights
          yearsOfExperience={yearsOfExperience}
          projectCount={projectCount}
          techStackCount={techStackCount}
        />

        <About
          fullname={profile.fullname}
          position_career={profile.position_career}
          background={profile.background}
          mindset={profile.mindset}
          avatar={profile.avatar}
          university_name={profile.university_name}
          address={profile.address}
          email={profile.email}
          phone_number={profile.phone_number}
        />

        {workExp.length > 0 && <Timeline items={workExp} />}

        {skillGroups.length > 0 && <SkillsPanel groups={skillGroups} />}

        {projects.length > 0 && <Projects projects={projects} />}

        <ContactForm
          onSubmit={onSendEmail}
          email={profile.email}
          phone_number={profile.phone_number}
          address={profile.address}
        />
      </main>

      <Footer
        github={profile.github}
        linkedin_url={profile.linkedin_url}
        email={profile.email}
        fullname={profile.fullname}
      />
    </div>
  );
};

export default CorporatePortfolio;

