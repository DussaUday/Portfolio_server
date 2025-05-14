import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

function Skills() {
  const [skills, setSkills] = useState([]);

  const defaultSkills = [
    { _id: '1', name: 'MERN Stack', proficiency: 'Advanced', icon: <FaReact className="w-8 h-8" /> },
    { _id: '2', name: 'Node.js', proficiency: 'Advanced', icon: <FaNodeJs className="w-8 h-8" /> },
    { _id: '3', name: 'MongoDB', proficiency: 'Advanced', icon: <SiMongodb className="w-8 h-8" /> },
    { _id: '4', name: 'Express.js', proficiency: 'Advanced', icon: <SiExpress className="w-8 h-8" /> },
    { _id: '5', name: 'DBMS', proficiency: 'Intermediate', icon: <FaDatabase className="w-8 h-8" /> },
    { _id: '6', name: 'DevOps', proficiency: 'Beginner', icon: <FaDocker className="w-8 h-8" /> },
    { _id: '7', name: 'Git', proficiency: 'Advanced', icon: <FaGitAlt className="w-8 h-8" /> },
    { _id: '8', name: 'JavaScript', proficiency: 'Advanced', icon: <FaJsSquare className="w-8 h-8" /> },
    { _id: '9', name: 'HTML5', proficiency: 'Advanced', icon: <FaHtml5 className="w-8 h-8" /> },
    { _id: '10', name: 'CSS3', proficiency: 'Advanced', icon: <FaCss3Alt className="w-8 h-8" /> },
    { _id: '11', name: 'Tailwind CSS', proficiency: 'Intermediate', icon: <SiTailwindcss className="w-8 h-8" /> },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('/api/skills');
        setSkills(res.data.length > 0 ? res.data : defaultSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkills(defaultSkills);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex items-center p-4 bg-secondary/20 dark:bg-secondary/10 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-glow"
          >
            {skill.icon && typeof skill.icon === 'string' ? (
              <img src={skill.icon} alt={skill.name} className="w-10 h-10 mr-4 rounded" />
            ) : (
              <div className="text-primary">{skill.icon}</div>
            )}
            <div className="ml-4 animate-slide-up">
              <h3 className="text-lg font-semibold text-dark dark:text-secondary">
                {skill.name}
              </h3>
              <p className="text-dark/80 dark:text-secondary/80">{skill.proficiency}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;