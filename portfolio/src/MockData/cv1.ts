import type { ExperienceItem } from '@/Components/Experience/Experience';

const experience: ExperienceItem[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    years: '2022 - Present',
    description: 'Led the development of responsive web applications using React and Node.js. Collaborated with design teams to implement pixel-perfect UI components.',
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    years: '2020 - 2022',
    description: 'Developed and maintained full-stack applications using modern frameworks. Implemented CI/CD pipelines and optimized application performance.',
    skills: ['Vue.js', 'Python', 'AWS'],
  },
  {
    title: 'Junior Developer',
    company: 'WebAgency Ltd.',
    years: '2019 - 2020',
    description: 'Started my journey as a junior developer, working on client websites and learning industry best practices.',
    skills: ['HTML/CSS', 'JavaScript', 'WordPress'],
  },
];




const cv1 = {
  personal: {
    name: 'Trung Huy',
    title: 'Full-Stack Developer ',
    email: 'trunghuy@email.com',
    location: 'Cambodia',
    gpa: '10',
  },

  about: {
    background: 'I am a full-stack developer with over 5 years of experience in building responsive web applications.',
    mindset: 'I believe that good software is built through clear communication, clean code, and a strong understanding of user needs.',
  },

  experience,

  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A scalable, responsive e-commerce app with Stripe integration.',
      link: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio built with React, Tailwind CSS, and hosted on Vercel.',
      link: '#',
    },
    {
      title: 'Mobile UI Kit',
      description: 'Cross-platform UI components used in several apps.',
      link: '#',
    },
  ],
};

export default cv1;
