import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Resume from '../components/Resume';
import Certificates from '../components/Certificates';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Home() {
  useEffect(() => {
    socket.on('projectUpdate', () => {
      window.location.reload();
    });

    return () => {
      socket.off('projectUpdate');
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary dark:bg-dark flex flex-col transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-6 pt-24 flex-grow">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-dark dark:text-secondary animate-slide-up">
          Dussa Uday Krishna - Computer Science Student
        </h1>
        <Profile />
        <Skills />
        <Projects />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Home;