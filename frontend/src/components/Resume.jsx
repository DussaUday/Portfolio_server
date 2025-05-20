import { useState, useEffect } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import pdf from '../assets/resume.pdf';

function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    
    // Verify the resume exists
    const checkResume = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(pdf, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Resume file not found');
        }
      } catch (error) {
        console.error('Error checking resume:', error);
        setError('Resume is temporarily unavailable');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkResume();
  }, []);

  return (
    <section
      id="resume"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Resume
      </h2>
      
      <div className="text-center animate-slide-up">
        {isLoading ? (
          <p className="text-dark/80 dark:text-secondary/80">Loading resume...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <>
            <div className="mb-6">
              <a
                href={pdf}
                download="uday_Resume.pdf"
                className="inline-flex items-center bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full font-semibold hover:bg-gradient-to-l transition-all duration-300 transform hover:scale-110 shadow-lg cursor-glow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineDownload className="mr-2" />
                Download Resume (PDF)
              </a>
            </div>
            
            <p className="text-dark/80 dark:text-secondary/80 mb-4">
              For complete resume view, please download it :)
            </p>
            
            <iframe
              src={pdf}
              className="mx-auto border-2 border-gray-200"
              style={{
                width: width < 768 ? '100%' : '75%',
                height: '75vh'
              }}
              title="Resume Preview"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Resume;