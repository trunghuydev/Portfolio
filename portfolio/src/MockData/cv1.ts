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
    description: 'A full-stack e-commerce solution with modern UI and secure payment processing.',
    techs: ['React', 'Node.js', 'MongoDB'],
    codeLink: '#',
    link: '#',
    image: '/images/ecommerce.jpg',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team features.',
    techs: ['Vue.js', 'Express', 'PostgreSQL'],
    codeLink: '#',
    link: '#',
    image: '/images/task-app.jpg',
  },
  {
    title: 'Mobile App Design',
    description: 'Modern mobile app with intuitive UX and beautiful animations.',
    techs: ['React Native', 'Firebase', 'Figma'],
    codeLink: '#',
    link: '#',
    image: '/images/mobile-ui.jpg',
  },
  ],

  skills:[
  {
    category: 'Frontend Development',
    color: 'text-blue-600',
    skills: ['React / Next.js', 'TypeScript', 'Vue.js', 'CSS / Tailwind'],
  },
  {
    category: 'Backend Development',
    color: 'text-purple-600',
    skills: ['Node.js / Express', 'Python / Django', 'PostgreSQL / MongoDB', 'AWS / Docker'],
  },
  {
    category: 'Design & Tools',
    color: 'text-cyan-600',
    skills: ['Figma', 'Adobe XD', 'Git & GitHub', 'Vercel / Netlify'],
  },
],
};

export default cv1;
