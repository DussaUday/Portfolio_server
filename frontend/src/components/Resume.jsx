import { useState, useEffect } from 'react';
import axios from 'axios';

function Resume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get('/api/resumes');
        setResume(res.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };
    fetchResume();
  }, []);

  return (
    <section
      id="resume"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Resume
      </h2>
      <p className="text-dark/80 dark:text-secondary/80 mb-6 text-center max-w-md mx-auto animate-slide-up">
        Download my resume to explore my education, experience, and skills in detail.
      </p>
      <div className="text-center animate-slide-up">
        {resume ? (
          <a
            href={resume.filePath}
            download
            className="inline-block bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full font-semibold hover:bg-gradient-to-l transition-all duration-300 transform hover:scale-110 shadow-lg cursor-glow"
          >
            Download Resume
          </a>
        ) : (
          <p className="text-dark/80 dark:text-secondary/80">No resume uploaded yet.</p>
        )}
      </div>
    </section>
  );
}

export default Resume;