import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Profile', href: '#profile' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white fixed w-full top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight animate-scale-pulse cursor-glow">
          Uday Krishna
        </h1>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium hover:text-highlight transition-colors duration-300 cursor-glow"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-dark dark:bg-dark dark:text-secondary hover:bg-highlight transition-colors duration-300 cursor-glow"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
          </button>
        </div>
        <button
          className="md:hidden text-2xl focus:outline-none cursor-glow"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-dark dark:bg-primary transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium hover:text-highlight transition-colors duration-300 cursor-glow"
              onClick={toggleMenu}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-dark dark:bg-dark dark:text-secondary hover:bg-highlight transition-colors duration-300 cursor-glow"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;