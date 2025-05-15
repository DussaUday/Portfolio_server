import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative group bg-secondary/20 dark:bg-secondary/10 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-dark dark:text-secondary mb-3 animate-slide-up">
                {project.title}
              </h3>
              <p className="text-dark/80 dark:text-secondary/80 mb-4 animate-slide-up">
                {project.description}
              </p>
              <div className="flex space-x-4 animate-slide-up">
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-highlight font-semibold transition-colors duration-300 z-10 relative"
                  >
                    View Project →
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-dark dark:text-secondary hover:text-highlight transition-colors duration-300 z-10 relative"
                  >
                    <FaGithub className="w-5 h-5 mr-2" /> GitHub
                  </a>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;