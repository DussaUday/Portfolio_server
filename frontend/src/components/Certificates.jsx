import { useState, useEffect } from 'react';
import axios from 'axios';

function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get('/api/certificates');
        setCertificates(res.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section
      id="certificates"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Certificates
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((certificate) => (
          <div
            key={certificate._id}
            className="relative group bg-secondary/20 dark:bg-secondary/10 rounded-lg p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-glow"
          >
            <h3 className="text-2xl font-semibold text-dark dark:text-secondary mb-3 animate-slide-up">
              {certificate.title}
            </h3>
            <p className="text-dark/80 dark:text-secondary/80 animate-slide-up">
              Date: {new Date(certificate.date).toLocaleDateString()}
            </p>
            {certificate.image && (
              <img
                src={certificate.image}
                alt={certificate.title}
                className="mt-4 w-full h-32 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;