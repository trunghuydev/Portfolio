type Project = {
  title: string;
  description: string;
  link?: string;
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="max-w-6xl px-6 py-12 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-purple-700">Featured Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div key={idx} className="p-4 bg-white border rounded-lg shadow-md">
            <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
            <p className="mb-2 text-sm text-gray-600">{project.description}</p>
            {project.link && (
              <a href={project.link} className="text-sm text-blue-600 underline">
                Live Demo
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
