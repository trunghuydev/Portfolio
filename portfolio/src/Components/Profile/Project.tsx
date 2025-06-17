import { Project } from '@/Interface/TProject';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="w-full bg-[#F9FBFC] py-20">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="mb-4 text-4xl font-extrabold text-purple-600 md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-500">A collection of my recent work</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          spaceBetween={40}
          slidesPerView={1}
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx}>
              <div className="h-[550px] max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid h-full grid-cols-1 md:grid-cols-2">
                  {/* Ảnh */}
                  {project.img_url ? (
                    <div className="flex items-center justify-center p-4">
                      <img
                        src={project.img_url}
                        alt={project.project_name}
                        className="object-contain w-full max-h-52"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-gray-100">No Image</div>
                  )}

                  {/* Nội dung */}
                  <div className="p-6 overflow-y-auto">
                    <h3 className="mb-1 text-2xl font-bold text-gray-800">
                      {project.project_name}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">{project.project_type}</p>
                    <p className="mb-3 text-base text-gray-700">{project.description}</p>

                    {project.teches && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.teches.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full"
                          >
                            {tech.tech_name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-6 text-base font-medium">
                      {project.url_github && (
                        <a
                          href={project.url_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          Code
                        </a>
                      )}
                      {project.url_demo && (
                        <a
                          href={project.url_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Projects;
