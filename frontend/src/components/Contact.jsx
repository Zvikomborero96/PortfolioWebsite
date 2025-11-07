/**
 * Contact Component
 * 
 * This component renders the contact section of the portfolio with:
 * 1. Contact information display (email, phone, location)
 * 2. Social media links (GitHub, LinkedIn)
 * 3. Functional contact form with backend integration
 * 
 * Features:
 * - Form validation (frontend)
 * - Loading states during submission
 * - Error handling
 * - Success/error notifications via toast
 * - Form reset after successful submission
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from 'lucide-react';
import { personalInfo } from '../mock';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

// Get backend URL from environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  // Form data state - stores user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Loading state - true while submitting to backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Error state - stores validation or network errors
  const [error, setError] = useState(null);

  /**
   * Handle input changes
   * Updates formData state as user types
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when user starts typing
    if (error) setError(null);
  };

  /**
   * Handle form submission
   * Sends contact form data to backend API
   * 
   * Process:
   * 1. Prevent default form behavior
   * 2. Validate required fields (basic check)
   * 3. Set loading state
   * 4. Send POST request to /api/contact
   * 5. Handle success/error responses
   * 6. Show toast notification
   * 7. Reset form on success
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation - check all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Set loading state - disable form during submission
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send POST request to backend API
      const response = await axios.post(`${API}/contact`, formData);
      
      // Check if submission was successful
      if (response.data.success) {
        // Show success toast notification
        toast({
          title: "Message Sent! ✓",
          description: response.data.message || "Thank you for reaching out. I'll get back to you soon.",
        });
        
        // Reset form fields to empty
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        console.log('Message sent successfully:', response.data);
      }
    } catch (err) {
      // Handle errors (network, validation, server errors)
      console.error('Error sending message:', err);
      
      // Extract error message from response or use default
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          'Failed to send message. Please try again.';
      
      setError(errorMessage);
      
      // Show error toast notification
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      // Always reset loading state, whether success or error
      setIsSubmitting(false);
    }
  };

  // Contact information array for easy rendering
  // Each item includes icon, label, value, and optional href for clickable links
  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-400 text-lg">Let's discuss your next project or opportunity</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 glass-strong rounded-xl p-4 hover:bg-cyan-500/10 transition-all duration-300">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </div>
                  );
                  
                  return info.href ? (
                    <a key={index} href={info.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>
            
            {/* Social links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-emerald-400">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass-strong rounded-xl p-4 hover:bg-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 glow-on-hover"
                >
                  <Github size={24} />
                  <span className="font-medium">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass-strong rounded-xl p-4 hover:bg-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 glow-on-hover"
                >
                  <Linkedin size={24} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
            
            {/* Image */}
            <div className="glass rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Collaboration"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          {/* Contact form */}
          <div className="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send Me a Message</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full glass-strong rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full glass-strong rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full glass-strong rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Project Discussion"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  disabled={isSubmitting}
                  className="w-full glass-strong rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              {/* Submit Button - Shows loading state during submission */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg px-6 py-4 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
              
              {/* Error message display */}
              {error && (
                <div className="text-red-400 text-sm text-center mt-2">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;