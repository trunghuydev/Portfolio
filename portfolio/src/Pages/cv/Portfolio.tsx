import About from '@/Components/About/About';
import Experience from '@/Components/Experience/Experience';
import Personal from '@/Components/Personal/personal';
import data from '@/MockData/cv1';
import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <>
      <Personal {...data.personal} />
      <About background={data.about.background} mindset={data.about.mindset} avatarUrl={''} />
      <Experience items={data.experience} />
    </>
  );
};

export default Portfolio;
