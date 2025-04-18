import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeIn, slideUp } from '@/lib/animations';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-alumni-blue to-alumni-blue/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            NIELIT Calicut Alumni Network
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-10 text-white/90"
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.2 }}
          >
            Connect with fellow alumni, share experiences, and grow your
            professional network. Together, we build a stronger community.
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/register">
              <Button 
                size="lg"
                className="bg-white text-alumni-blue hover:bg-gray-100 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Join the Network
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;  
