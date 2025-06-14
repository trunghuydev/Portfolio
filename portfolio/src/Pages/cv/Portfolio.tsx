// pages/Portfolio.tsx
import React from 'react';
import About from '@/Components/About/About';
import Contact from '@/Components/Contact/Contact';
import Experience from '@/Components/Experience/Experience';
import Footer from '@/Components/Footer/Footer';
import Personal from '@/Components/Personal/personal';
import Projects from '@/Components/Projects/Project';
import Skills from '@/Components/Skills/Skill';
import Navbar from '@/Components/Header/Header';
import data from '@/MockData/cv1';

import { useAutoLogin } from '../Login/Hook/useAutoLogin';

const Portfolio: React.FC = () => {
  const username = 'trunghuy';
  const password = '123456789';

  useAutoLogin(username, password);

  return (
    <>
      <Navbar />
      <main className="scroll-smooth">
        <section id="home">
          <Personal {...data.personal} />
        </section>
        <section id="about">
          <About background={data.about.background} mindset={data.about.mindset} avatarUrl={''} />
        </section>
        <section id="experience">
          <Experience items={data.experience} />
        </section>
        <section id="projects">
          <Projects projects={data.projects} />
        </section>
        <section id="skills">
          <Skills skillGroups={data.skills} />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Portfolio;
