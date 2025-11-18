import React from 'react';
import { Project } from '@/Interface/TProject';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="projects-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-corp-navy mb-12 text-center"
        >
          Featured Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-center text-corp-gray-600">No projects available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

