import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Mail, User, Lock } from 'lucide-react';

const Terms = () => {
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
              Terms of Service
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceptance of Terms</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              By accessing and using the NIELIT Calicut Alumni Network platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Accounts</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <User className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Verification</h3>
                      <p className="text-gray-600">You must be a verified NIELIT Calicut alumnus to create an account</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-green-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Lock className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-green-900 mb-2">Account Security</h3>
                      <p className="text-gray-600">You are responsible for maintaining the confidentiality of your account</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">Information Accuracy</h3>
                      <p className="text-gray-600">You must provide accurate and complete information</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Conduct</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-orange-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-orange-900 mb-2">Content Guidelines</h3>
                      <p className="text-gray-600">Do not post inappropriate or offensive content</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-red-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-red-900 mb-2">Platform Usage</h3>
                      <p className="text-gray-600">Do not use the platform for unauthorized commercial purposes</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-indigo-50 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <User className="h-6 w-6 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900 mb-2">User Interaction</h3>
                      <p className="text-gray-600">Do not harass or intimidate other users</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-600">
                  For any questions regarding these Terms of Service, please contact us at:
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

export default Terms; 