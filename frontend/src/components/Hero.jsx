/**
 * Hero Component
 * 
 * The first section visitors see when landing on the portfolio.
 * Features:
 * - Large heading with gradient name styling
 * - Professional title and tagline
 * - Social media links (GitHub, LinkedIn, Email)
 * - Call-to-action buttons
 * - Glassmorphic profile card with status info
 * - Animated background with floating orbs
 * - Scroll indicator to next section
 * 
 * Design: Uses glassmorphism, animations, and modern gradient effects
 */

import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../mock';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-emerald-900/20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 space-y-6 animate-fade-in-up">
            <div className="inline-block glass px-4 py-2 rounded-full text-sm text-cyan-400 mb-4">
              Welcome to my portfolio
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-slate-300 font-medium">
              {personalInfo.title}
            </h2>
            
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.tagline}
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass p-3 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover"
              >
                <Mail size={24} />
              </a>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#projects"
                className="glass px-8 py-4 rounded-lg font-semibold hover:bg-cyan-500/20 transition-all duration-300 glow-on-hover"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </a>
            </div>
          </div>
          
          {/* Right content - Glass card */}
          <div className="flex-1 animate-fade-in-up delay-300">
            <div className="glass-strong rounded-3xl p-8 space-y-6 glow-on-hover">
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-800/50">
                <img
                  src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400">Available for work</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white">{personalInfo.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Experience</span>
                  <span className="text-white">3+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;