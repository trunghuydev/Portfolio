import React from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Project } from '@/Interface/TProject';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 border border-corp-gray-200 group">
      {project.img_url && (
        <div className="relative h-48 overflow-hidden bg-corp-gray-200">
          <img
            src={project.img_url}
            alt={project.project_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-corp-navy mb-2">
          {project.project_name}
        </h3>
        <p className="text-corp-gray-700 mb-4 line-clamp-2">
          {project.description}
        </p>

        {project.teches && project.teches.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.teches.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-corp-gray-100 text-corp-gray-700 rounded-md"
              >
                {tech.tech_name}
              </span>
            ))}
            {project.teches.length > 4 && (
              <span className="text-xs px-2 py-1 bg-corp-gray-100 text-corp-gray-700 rounded-md">
                +{project.teches.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {project.url_github && (
            <a
              href={project.url_github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-corp-accent border-2 border-corp-accent rounded-md hover:bg-corp-accent hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2"
              aria-label={`View ${project.project_name} code on GitHub`}
            >
              <FiGithub className="w-4 h-4" aria-hidden="true" />
              Code
            </a>
          )}
          {(project.url_demo || project.url_project) && (
            <a
              href={project.url_demo || project.url_project}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-corp-accent rounded-md hover:bg-corp-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2"
              aria-label={`View ${project.project_name} live demo`}
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

