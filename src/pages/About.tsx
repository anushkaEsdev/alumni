import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, BookOpen, Calendar, FileQuestion, Info } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About NIELIT Alumni Network
            </h1>
            <p className="text-xl text-gray-600">
              Connecting graduates, fostering growth, and building lasting relationships
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12 transform hover:scale-[1.01] transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-6">
              The NIELIT Calicut Alumni Network is a platform created to foster connections among graduates of the National Institute of Electronics & Information Technology (NIELIT), Calicut. Our mission is to build a vibrant community where alumni can network, share professional experiences, and support each other's growth.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Through this platform, we aim to strengthen the bonds formed during academic years and extend them into lifelong professional relationships.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <ul className="space-y-4">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <span className="text-gray-600">Networking opportunities with fellow alumni</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <Building2 className="h-6 w-6 text-blue-600 mt-1" />
                  <span className="text-gray-600">Career resources and job opportunities</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                  <span className="text-gray-600">Regular events and meetups</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <BookOpen className="h-6 w-6 text-blue-600 mt-1" />
                  <span className="text-gray-600">Knowledge sharing through blogs and forums</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3"
                >
                  <FileQuestion className="h-6 w-6 text-blue-600 mt-1" />
                  <span className="text-gray-600">Interview preparation resources</span>
                </motion.li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 rounded-xl p-4"
                >
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Community</h3>
                  <p className="text-gray-600">We believe in the power of a strong, supportive community.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-50 rounded-xl p-4"
                >
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Growth</h3>
                  <p className="text-gray-600">We are committed to lifelong learning and professional development.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-50 rounded-xl p-4"
                >
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Collaboration</h3>
                  <p className="text-gray-600">We value the sharing of knowledge and experiences.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-orange-50 rounded-xl p-4"
                >
                  <h3 className="text-xl font-semibold text-orange-900 mb-2">Integrity</h3>
                  <p className="text-gray-600">We uphold the highest standards of honesty and transparency.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Us</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Whether you're a recent graduate or an experienced professional, we invite you to join our network. Connect with fellow alumni, share your journey, and be a part of this growing community.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
