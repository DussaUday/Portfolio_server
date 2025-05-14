import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus('Failed to send message. Please try again.');
          console.error('EmailJS error:', error);
        }
      );
  };

  return (
    <section
      id="contact"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div className="animate-slide-up">
          <label htmlFor="name" className="block text-dark dark:text-secondary font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-secondary/30 dark:border-secondary/50 rounded-lg focus:ring-2 focus:ring-primary dark:bg-dark dark:text-secondary transition-all duration-300"
            required
          />
        </div>
        <div className="animate-slide-up">
          <label htmlFor="email" className="block text-dark dark:text-secondary font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-secondary/30 dark:border-secondary/50 rounded-lg focus:ring-2 focus:ring-primary dark:bg-dark dark:text-secondary transition-all duration-300"
            required
          />
        </div>
        <div className="animate-slide-up">
          <label htmlFor="message" className="block text-dark dark:text-secondary font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-secondary/30 dark:border-secondary/50 rounded-lg focus:ring-2 focus:ring-primary dark:bg-dark dark:text-secondary transition-all duration-300"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-full font-semibold hover:bg-gradient-to-l transition-all duration-300 transform hover:scale-105 shadow-lg cursor-glow animate-slide-up"
        >
          Send Message
        </button>
        {status && (
          <p
            className={`text-center animate-slide-up ${
              status.includes('success') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;