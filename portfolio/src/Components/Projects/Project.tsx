import ScrollFloat from '@/Util/Animation/scrollFloat';

type Project = {
  title: string;
  description: string;
  link?: string;
  codeLink?: string;
  image?: string;
  techs?: string[];
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="max-w-6xl px-6 py-16 mx-auto">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-center mb-10 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-2 text-4xl font-bold text-purple-600">Featured Projects</h2>
        </ScrollFloat>
        <p className="text-gray-500">A collection of my recent work</p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {/* Image */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-40 rounded-t-xl"
              />
            )}

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-1 text-xl font-bold text-gray-800">{project.title}</h3>
              <p className="mb-3 text-sm text-gray-600">{project.description}</p>

              {/* Tech stack */}
              {project.techs && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4 text-sm font-medium">
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    className="text-purple-600 hover:underline"
                  >
                    Code
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" className="text-blue-500 hover:underline">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
