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
    <section id="projects" className="max-w-6xl px-6 py-24 mx-auto">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-center text-center mb-14">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-4 text-5xl font-extrabold text-purple-600">Featured Projects</h2>
        </ScrollFloat>
        <p className="max-w-xl text-lg text-gray-500">A collection of my recent work</p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {/* Image */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-52 rounded-t-2xl"
              />
            )}

            {/* Content */}
            <div className="p-6">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">{project.title}</h3>
              <p className="mb-4 text-base text-gray-600">{project.description}</p>

              {/* Tech stack */}
              {project.techs && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techs.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-6 text-base font-medium">
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    className="text-purple-600 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                    rel="noopener noreferrer"
                  >
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
