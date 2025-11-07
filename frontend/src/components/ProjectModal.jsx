import React, { useEffect } from 'react';
import { X, Code, CheckCircle } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="glass-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 glass p-2 rounded-lg hover:bg-red-500/20 transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-1 rounded-full text-sm mb-4">
              {project.category}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h2>
            <p className="text-slate-300 text-lg leading-relaxed">{project.longDescription}</p>
          </div>
          
          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="text-cyan-400" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="glass px-4 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-emerald-400" />
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div key={idx} className="glass rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="glass px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover">
              View Live Demo
            </button>
            <a
              href="https://github.com/Zvikomborero96"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500/20 transition-all duration-300 glow-on-hover inline-flex items-center gap-2"
            >
              <Code size={18} />
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;