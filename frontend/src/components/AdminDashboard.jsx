import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ setIsAuthenticated }) {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectLink: '',
    githubLink: '',
    image: '',
    date: '',
    name: '',
    proficiency: '',
    icon: '',
    resume: null,
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchCertificates();
    fetchSkills();
    fetchResume();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get('/api/certificates');
      setCertificates(res.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      setSkills(res.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchResume = async () => {
    try {
      const res = await axios.get('/api/resumes');
      setResume(res.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      projectLink: formData.projectLink,
      githubLink: formData.githubLink,
      image: formData.image,
    };

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      if (editing) {
        await axios.put(`/api/projects/${editing}`, data, config);
      } else {
        await axios.post('/api/projects', data, config);
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      date: formData.date,
      image: formData.image,
    };

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      if (editing) {
        await axios.put(`/api/certificates/${editing}`, data, config);
      } else {
        await axios.post('/api/certificates', data, config);
      }
      fetchCertificates();
      resetForm();
    } catch (err) {
      console.error('Error submitting certificate:', err);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      const skillData = {
        name: formData.name,
        proficiency: formData.proficiency,
        icon: formData.icon,
      };
      if (editing) {
        await axios.put(`/api/skills/${editing}`, skillData, config);
      } else {
        await axios.post('/api/skills', skillData, config);
      }
      fetchSkills();
      resetForm();
    } catch (err) {
      console.error('Error submitting skill:', err);
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.resume) data.append('resume', formData.resume);

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      await axios.post('/api/resumes', data, config);
      fetchResume();
      resetForm();
    } catch (err) {
      console.error('Error submitting resume:', err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      await axios.delete(`/api/${type}/${id}`, config);
      if (type === 'projects') fetchProjects();
      if (type === 'certificates') fetchCertificates();
      if (type === 'skills') fetchSkills();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      projectLink: '',
      githubLink: '',
      image: '',
      date: '',
      name: '',
      proficiency: '',
      icon: '',
      resume: null,
    });
    setEditing(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Project Form */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Manage Projects</h3>
      <form onSubmit={handleProjectSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleInputChange}
            placeholder="Project Link (Optional)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleInputChange}
            placeholder="GitHub Link"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          {editing ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      {/* Project List */}
      <div className="mb-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg mb-2"
          >
            <div>
              <h4 className="font-semibold text-gray-800">{project.title}</h4>
              <p className="text-gray-600">{project.description}</p>
              {project.projectLink && (
                <p className="text-blue-500">
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </p>
              )}
              {project.githubLink && (
                <p className="text-blue-500">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setFormData({
                    title: project.title,
                    description: project.description,
                    projectLink: project.projectLink || '',
                    githubLink: project.githubLink || '',
                    image: project.image || '',
                  });
                  setEditing(project._id);
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete('projects', project._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Form */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Manage Certificates</h3>
      <form onSubmit={handleCertificateSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Certificate Title"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          {editing ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </form>

      {/* Certificate List */}
      <div className="mb-8">
        {certificates.map((certificate) => (
          <div
            key={certificate._id}
            className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg mb-2"
          >
            <div>
              <h4 className="font-semibold text-gray-800">{certificate.title}</h4>
              <p className="text-gray-600">
                Date: {new Date(certificate.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setFormData({
                    title: certificate.title,
                    date: certificate.date.split('T')[0],
                    image: certificate.image || '',
                  });
                  setEditing(certificate._id);
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete('certificates', certificate._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Form */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Manage Skills</h3>
      <form onSubmit={handleSkillSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Skill Name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="proficiency"
            value={formData.proficiency}
            onChange={handleInputChange}
            placeholder="Proficiency (e.g., Expert)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder="Icon URL (Optional)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          {editing ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      {/* Skill List */}
      <div className="mb-8">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg mb-2"
          >
            <div>
              <h4 className="font-semibold text-gray-800">{skill.name}</h4>
              <p className="text-gray-600">{skill.proficiency}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setFormData({
                    name: skill.name,
                    proficiency: skill.proficiency,
                    icon: skill.icon || '',
                  });
                  setEditing(skill._id);
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete('skills', skill._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resume Form */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Manage Resume</h3>
      <form onSubmit={handleResumeSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="p-3 border rounded-lg"
            accept="application/pdf"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Upload Resume
        </button>
      </form>

      {/* Resume Display */}
      {resume && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-800">
            Current Resume: <a href={resume.filePath} className="text-blue-500 hover:underline">View Resume</a>
          </p>
          <p className="text-gray-600">
            Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;