import { FaWhatsapp, FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/+916304478845',
      icon: <FaWhatsapp className="w-6 h-6" />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/DussaUday',
      icon: <FaGithub className="w-6 h-6" />,
    },
    {
      name: 'Email',
      href: 'mailto:dussauday469@gmail.com',
      icon: <FaEnvelope className="w-6 h-6" />,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/uday-dussa-088ba52aa',
      icon: <FaLinkedin className="w-6 h-6" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-dark to-primary text-secondary dark:bg-gradient-to-r dark:from-primary dark:to-dark dark:text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-6 animate-slide-up">
          Connect with Me
        </h3>
        <div className="flex justify-center space-x-8 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary dark:text-white hover:text-highlight transition-colors duration-300 transform hover:scale-110 cursor-glow"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-sm animate-slide-up">
          © {new Date().getFullYear()} Dussa Uday Krishna. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;