function Profile() {
  return (
    <section
      id="profile"
      className="mb-12 p-8 bg-white dark:bg-dark rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl animate-slide-up"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-dark dark:text-secondary animate-slide-up">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src="https://res.cloudinary.com/drc8bufjn/image/upload/v1746783787/message_attachments/of811hnjf5vktehbbvki.jpg"
          alt="Dussa Uday Krishna"
          className="w-40 h-40 rounded-full border-4 border-primary shadow-lg transform hover:scale-110 transition-transform duration-500 cursor-glow"
        />
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-semibold text-dark dark:text-secondary mb-4 animate-slide-up">
            Dussa Uday Krishna
          </h3>
          <p className="text-dark dark:text-secondary/80 text-lg leading-relaxed mb-4 animate-slide-up">
            I'm a passionate Computer Science student at Lakireddy Bali Reddy College of Engineering, specializing in full-stack development with the MERN stack. I love building scalable, user-friendly web applications and exploring technologies like DevOps and cloud computing. My goal is to create impactful solutions that solve real-world problems.
          </p>
          <p className="text-dark dark:text-secondary/80 text-lg animate-slide-up">
            <span className="font-semibold">Email:</span>{' '}
            <a href="mailto:dussauday469@gmail.com" className="text-primary hover:text-highlight cursor-glow">
              dussauday469@gmail.com
            </a>{' '}
            |{' '}
            <span className="font-semibold">GitHub:</span>{' '}
            <a href="https://github.com/DussaUday" className="text-primary hover:text-highlight cursor-glow">
              GitHub Profile
            </a>{' '}
            |{' '}
            <span className="font-semibold">LinkedIn:</span>{' '}
            <a href="https://linkedin.com/in/uday-dussa-088ba52aa" className="text-primary hover:text-highlight cursor-glow">
              LinkedIn Profile
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;