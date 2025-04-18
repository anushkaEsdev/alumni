import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Events', path: '/events' },
        { name: 'Directory', path: '/directory' },
        { name: 'About', path: '/about' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Mentorship Program', path: '/mentorship' },
        { name: 'Career Services', path: '/career' },
        { name: 'Newsletter', path: '/newsletter' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Contact Us', path: '/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            Copyright © 2025 Nielit alumini
          </p>
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Contact us
            </Link>
            <Link 
              to="/interview-questions" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Interview questions
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Blog
            </Link>
            <Link 
              to="/directory" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Our Team
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
