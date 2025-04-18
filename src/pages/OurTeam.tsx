import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Mail, Linkedin, Github, Building2, GraduationCap, Briefcase } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
}

interface Team {
  name: string;
  members: TeamMember[];
}

const MENTORS = [
  {
    name: "Dr. Rajesh M",
    role: "M.Tech Coordinator",
    description: "Scientist/Engineer at NIELIT Calicut"
  },
  {
    name: "Dr. Ashok Kumar",
    role: "Mentor",
    description: "System Software Engineer at Intel Corporation"
  }
];

const TEAMS: Team[] = [
  {
    name: "Planning & Coordination",
    members: [
      { name: "Aswin", role: "Team Leader" },
      { name: "Angel", role: "Member" },
      { name: "Anushka", role: "Member" },
      { name: "Jibin", role: "Member" },
      { name: "Anjana", role: "Member" },
      { name: "Aflah", role: "Member" },
      { name: "Nirmal", role: "Member" }
    ]
  },
  {
    name: "Placement",
    members: [
      { name: "Nishanth", role: "Team Leader" },
      { name: "Adithya", role: "Member" },
      { name: "Leethu", role: "Member" },
      { name: "Anjana", role: "Member" },
      { name: "Muktha", role: "Member" },
      { name: "Karthikeyan", role: "Member" },
      { name: "Amal", role: "Member" },
      { name: "Aparna", role: "Member" },
      { name: "Aflah", role: "Member" }
    ]
  },
  {
    name: "Software",
    members: [
      { name: "Jibin", role: "Team Leader" },
      { name: "Aswin", role: "Member" },
      { name: "Abhiram", role: "Member" },
      { name: "Nirmal", role: "Member" },
      { name: "Aparna", role: "Member" }
    ]
  },
  {
    name: "VLSI",
    members: [
      { name: "Nishanth", role: "Team Leader" },
      { name: "Vishnu", role: "Member" },
      { name: "Nilanjan", role: "Member" },
      { name: "Sahu", role: "Member" },
      { name: "Enosh", role: "Member" },
      { name: "Rohit", role: "Member" },
      { name: "Hemanth", role: "Member" },
      { name: "Deeksha", role: "Member" }
    ]
  },
  {
    name: "Hardware (Electronics)",
    members: [
      { name: "Angel", role: "Team Leader" },
      { name: "Aswathy", role: "Member" },
      { name: "Karthikeyan", role: "Member" },
      { name: "Shasiya", role: "Member" },
      { name: "Nitesh", role: "Member" }
    ]
  },
  {
    name: "Soft Skills",
    members: [
      { name: "Adithya", role: "Team Leader" },
      { name: "Muktha", role: "Member" },
      { name: "Samundeshwari", role: "Member" },
      { name: "Anita", role: "Member" },
      { name: "Krishnapriya", role: "Member" },
      { name: "Swaliha", role: "Member" },
      { name: "Surthi", role: "Member" }
    ]
  }
];

const OurTeam = () => {
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
              Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Meet the dedicated mentors and student teams who contribute to the Alumni Mentoring initiative.
            </p>
          </motion.div>

          {/* Mentors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Mentors & Coordinators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {MENTORS.map((mentor, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl text-gray-900">{mentor.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 font-medium">{mentor.role}</p>
                      <p className="text-sm text-gray-500 mt-2">{mentor.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Student Teams Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Student Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAMS.map((team, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg text-gray-900">{team.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {team.members.map((member, memberIndex) => (
                          <motion.div
                            key={memberIndex}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-2 p-1"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 truncate">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam; 