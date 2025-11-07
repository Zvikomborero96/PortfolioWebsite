import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { experience } from '../mock';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 text-lg">My professional journey and achievements</p>
        </div>
        
        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {experience.map((job, index) => (
            <div
              key={job.id}
              className="relative mb-12 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline line */}
              {index !== experience.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-emerald-500 opacity-30"></div>
              )}
              
              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 glow-on-hover">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                      <Briefcase size={28} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{job.position}</h3>
                        <h4 className="text-lg text-cyan-400 font-semibold mb-2">{job.company}</h4>
                      </div>
                      
                      <div className="flex flex-col gap-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-emerald-400 mb-3">Key Responsibilities:</h5>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <CheckCircle size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-emerald-400 mb-3">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="glass px-3 py-1 rounded-lg text-sm text-slate-300 hover:bg-cyan-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Download resume */}
        <div className="text-center mt-12 animate-fade-in-up delay-500">
          <button className="glass px-8 py-4 rounded-xl font-semibold hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover">
            Download Full Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;