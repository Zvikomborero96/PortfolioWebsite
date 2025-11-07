/**
 * About Component
 * 
 * Provides detailed information about Ashley's background, education, and philosophy.
 * 
 * Sections:
 * 1. Personal bio - Journey and expertise summary
 * 2. Education details - Diploma and institution
 * 3. Highlight cards - Key areas of expertise (4 cards)
 * 4. Philosophy section - 4 core principles guiding work approach
 * 
 * Features:
 * - Two-column responsive layout
 * - Glassmorphic cards with hover effects
 * - Professional workspace imagery
 * - Smooth animations on scroll
 * - Numbered philosophy cards for easy reading
 */

import React from 'react';
import { Code, Database, Server, Award } from 'lucide-react';
import { personalInfo, education, philosophy } from '../mock';

const About = () => {
  const highlights = [
    { icon: Code, title: 'Web Development', desc: 'Full-stack development expertise' },
    { icon: Server, title: 'System Admin', desc: 'Infrastructure & networking' },
    { icon: Database, title: 'Database Design', desc: 'Scalable data solutions' },
    { icon: Award, title: 'Best Practices', desc: 'Clean & maintainable code' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-slate-400 text-lg">Get to know more about my journey and philosophy</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio section */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">My Story</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              
              <div className="glass-strong rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-lg mb-3 text-emerald-400">Education</h4>
                <div className="space-y-2">
                  <p className="text-white font-medium">{education.degree}</p>
                  <p className="text-slate-400">{education.institution}</p>
                  <p className="text-slate-500 text-sm">Graduated {education.year}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image and stats */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="glass rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1707528041466-83a325f01a3c"
                alt="Workspace"
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="glass rounded-xl p-6 hover:bg-cyan-500/10 transition-all duration-300 glow-on-hover"
                  >
                    <Icon className="text-cyan-400 mb-3" size={32} />
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Philosophy section */}
        <div className="animate-fade-in-up delay-300">
          <h3 className="text-3xl font-bold text-center mb-12">
            My <span className="text-gradient">Philosophy</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:bg-emerald-500/10 transition-all duration-300 glow-on-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <h4 className="font-bold text-lg mb-3 text-cyan-400">{item.principle}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;