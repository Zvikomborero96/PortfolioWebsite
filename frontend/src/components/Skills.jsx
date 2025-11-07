import React, { useState } from 'react';
import { Monitor, Server, Settings, Wrench } from 'lucide-react';
import { skills } from '../mock';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: Monitor },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'systemAdmin', label: 'System Admin', icon: Settings },
    { id: 'tools', label: 'Tools & Others', icon: Wrench }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-400 text-lg">Technologies I work with to build amazing solutions</p>
        </div>
        
        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`glass rounded-xl px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/30'
                    : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-300">
          {skills[activeTab].map((skill, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 glow-on-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg">{skill.name}</h4>
                <span className="text-cyan-400 font-bold">{skill.level}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div className="mt-16 text-center animate-fade-in-up delay-500">
          <div className="glass inline-block rounded-2xl px-8 py-6">
            <p className="text-slate-300 text-lg">
              Always learning and exploring new technologies to stay current with industry trends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;