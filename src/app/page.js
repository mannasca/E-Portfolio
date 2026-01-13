'use client';

import emailjs from '@emailjs/browser';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Github,
  Linkedin,
  Mail,
  Send,
  ExternalLink,
  ChevronDown,
  User,
  Briefcase,
  Code,
} from 'lucide-react';

// ✅ Disable SSR for Typewriter (CRITICAL FIX)
const Typewriter = dynamic(
  () => import('react-simple-typewriter').then((mod) => mod.Typewriter),
  { ssr: false }
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  /* ============================
     Initialize EmailJS + Scroll + Scroll Spy
  ============================ */
  useEffect(() => {
    // Initialize EmailJS
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log('EmailJS Public Key:', publicKey);
    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS public key is not defined');
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  /* ============================
     Data
  ============================ */
  const socials = [
    { href: 'https://github.com/mannasca', icon: Github, label: 'GitHub' },
    {
      href: 'https://www.linkedin.com/in/mannas23/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    { href: 'mailto:anassattar.rg@gmail.com', icon: Mail, label: 'Email' },
  ];

  const skills = [
    {
      title: 'Programming Languages',
      subtitle: 'Core Languages',
      description: 'Languages I use for building scalable applications and solving complex problems.',
      items: ['Python', 'JavaScript', 'SQL', 'Java', 'C#', 'HTML/CSS'],
    },
    {
      title: 'Frameworks & Libraries',
      subtitle: 'Development Tools',
      description: 'Modern frameworks and libraries for full-stack web development and data management.',
      items: ['React', 'Node.js', 'Express', 'Next.js', 'MongoDB', 'PostgreSQL'],
    },
    {
      title: 'Tools & Platforms',
      subtitle: 'DevOps & Productivity',
      description: 'Development tools, version control, containerization, and collaboration platforms.',
      items: ['Git', 'GitHub', 'Docker', 'VS Code', 'REST APIs', 'Agile/Scrum'],
    },
  ];

  const projects = [
    {
      title: 'AcadTrack',
      category: 'Full-Stack Web Application',
      description:
        'A full-stack academic activity tracking platform that helps students manage coursework, deadlines, and academic progress.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
      github: 'https://github.com/mannasca/AcadTrack',
    },
    {
      title: 'DashFleet',
      category: 'Dashboard System',
      description:
        'A fleet maintenance and management dashboard to track vehicle status, service schedules, and operational data.',
      tech: ['React', 'JavaScript', 'SQL', 'REST APIs'],
      github: 'https://github.com/mannasca/DashFleet',
    },
    {
      title: 'EdgeApp',
      category: 'Offline-First PWA',
      description:
        'An offline-first progressive web application built for disaster relief scenarios.',
      tech: ['PWA', 'React', 'IndexedDB', 'Offline-First Design'],
      github: 'https://github.com/mannasca/EdgeApp',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        }
      )
      .then(
        () => {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          alert('Something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all ${
          isScrolled
            ? 'bg-black/90 backdrop-blur border-b border-gray-800'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/ma_logo.svg" alt="Logo" className="h-10 w-auto" />
          <div className="flex gap-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`relative capitalize transition-colors ${
                activeSection === item
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
              {activeSection === item && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white" />
              )}
            </a>
          ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 text-center relative"
      >
        <div>
          <h1 className="text-6xl font-bold mb-4">Hi, I’m Muhammad Anas</h1>

          <p className="text-3xl text-gray-400 mb-4">
            <Typewriter
              words={[
                'Software Developer | Full-Stack & AI',
                'Full-Stack Web Developer',
                'Software Engineering Student (AI)',
              ]}
              loop
              cursor
            />
          </p>

          <p className="text-xl text-gray-600 mb-10">
            Building exceptional digital experiences
          </p>

          <div className="flex gap-4 justify-center mb-10">
            <a
              href="#contact"
              className="px-8 py-3 bg-white text-black rounded-lg flex items-center gap-2 hover:scale-105 transition"
            >
              Get In Touch <Send size={18} />
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border border-gray-700 rounded-lg flex items-center gap-2 hover:bg-white hover:text-black hover:scale-105 transition"
            >
              View Work <ExternalLink size={18} />
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-800 rounded-lg hover:bg-white hover:text-black hover:scale-110 transition"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-gray-700" />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 flex items-center justify-center gap-4">
            <User className="w-10 h-10" />
            About Me
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I focus on designing and building modern, scalable web applications and intelligent software solutions that prioritize reliability, performance, and maintainability. My work blends strong software engineering fundamentals with applied AI concepts to solve real-world problems through practical, production-oriented code.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I have a solid technical foundation in Python, JavaScript, SQL, and RESTful APIs, with hands-on experience across the full stack, from backend logic and data handling to responsive, user-focused interfaces. I place a strong emphasis on clean architecture, readable code, and systems that can scale beyond prototypes into real deployments.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I'm particularly interested in turning complex requirements into efficient, well-structured solutions, continuously refining my approach through learning, experimentation, and building.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 flex items-center gap-4">
            <Code className="w-10 h-10" />
            Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, idx) => (
              <div
                key={idx}
                className="group bg-gray-950 border border-gray-900 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-900 transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{category.subtitle}</p>
                <p className="text-gray-300 mb-4 text-sm">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-12 flex items-center gap-4">
            <Briefcase className="w-10 h-10" />
            Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-gray-950 border border-gray-900 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-900 transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3 capitalize">
                  {project.category}
                </p>
                <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition text-sm"
                  >
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-5xl font-bold mb-10 flex items-center gap-4">
            <Mail className="w-10 h-10" />
            Get In Touch
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-950 border border-gray-900 rounded-xl p-8 space-y-6"
          >
            <input
              required
              className="w-full p-3 bg-black border border-gray-800 rounded"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              required
              type="email"
              className="w-full p-3 bg-black border border-gray-800 rounded"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              required
              rows={5}
              className="w-full p-3 bg-black border border-gray-800 rounded"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button className="w-full bg-white text-black py-3 rounded-lg hover:scale-105 transition">
              Send Message <Send className="inline ml-2" size={18} />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-6 text-center text-gray-600">
        © 2025 Muhammad Anas
      </footer>
    </div>
  );
}
