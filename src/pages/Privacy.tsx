import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, Trash2, Mail, User, Building2, Activity } from 'lucide-react';

const Privacy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12 transform hover:scale-[1.01] transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              At NIELIT Calicut Alumni Network, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <User className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Personal Information</h3>
                      <p className="text-gray-600">Name, email, contact details, and academic history</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-green-900 mb-2">Professional Information</h3>
                      <p className="text-gray-600">Current employment, skills, and career history</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Activity className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">Usage Data</h3>
                      <p className="text-gray-600">Platform interactions and preferences</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-orange-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Eye className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-orange-900 mb-2">Access</h3>
                      <p className="text-gray-600">View and access your personal data</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-red-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Trash2 className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2">Deletion</h3>
                      <p className="text-gray-600">Request deletion of your data</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-indigo-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Key className="h-6 w-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900 mb-2">Control</h3>
                      <p className="text-gray-600">Control how your data is used</p>
                    </div>
                  </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-600">
                  For any privacy-related concerns, please contact us at:
                </p>
                <p className="text-gray-600 mt-2">
                  Email: nielitalumnicalicut@gmail.com<br />
                  Address: NIELIT Calicut, Post Box No. 5, P. O. Nit Campus, Calicut, Kerala 673601
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy; 