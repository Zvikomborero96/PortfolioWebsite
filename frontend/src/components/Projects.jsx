import React, { useState } from 'react';
import { ExternalLink, Code, Layers } from 'lucide-react';
import { projects } from '../mock';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full-Stack', 'Backend', 'Frontend'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg">Showcasing my best work and technical expertise</p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`glass rounded-xl px-6 py-3 transition-all duration-300 ${
                filter === category
                  ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/30'
                  : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 glow-on-hover cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project image/placeholder */}
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Layers size={64} className="text-slate-600 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              
              {/* Project info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <Code className="text-cyan-400" size={20} />
                </div>
                
                <p className="text-slate-400 mb-4 line-clamp-3">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs glass px-2 py-1 rounded text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs glass px-2 py-1 rounded text-cyan-400">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Category badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <ExternalLink size={18} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View more */}
        <div className="text-center mt-12 animate-fade-in-up delay-500">
          <a
            href="https://github.com/Zvikomborero96"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-8 py-4 rounded-xl font-semibold hover:bg-emerald-500/20 transition-all duration-300 inline-flex items-center gap-2 glow-on-hover"
          >
            <Code size={20} />
            View More on GitHub
          </a>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;