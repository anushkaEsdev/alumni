import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { fadeIn, slideUp, staggerContainer, listItem } from '@/lib/animations';

const HomePage = () => {
  const { getPostsByType, getUpcomingMeetings } = useData();
  
  // Get the latest 3 blog posts
  const latestBlogs = getPostsByType('blog').slice(0, 3);
  
  // Get upcoming meetings/events
  const upcomingMeetings = getUpcomingMeetings().slice(0, 3);
  
  // Get popular interview questions
  const interviewQuestions = getPostsByType('interview').slice(0, 3);

  const features = [
    {
      title: 'Blog',
      description: 'Latest insights and updates',
      icon: 'blog',
      linkText: 'Read More',
      linkUrl: '/blog'
    },
    {
      title: 'Events',
      description: 'Upcoming alumni gatherings',
      icon: 'events',
      linkText: 'View Events',
      linkUrl: '/events'
    },
    {
      title: 'Interview Questions',
      description: 'Prepare for your next interview',
      icon: 'interview',
      linkText: 'Explore Questions',
      linkUrl: '/interview-questions'
    },
    {
      title: 'Our Team',
      description: 'Meet our mentors and student teams',
      icon: 'directory',
      linkText: 'View Our Team',
      linkUrl: '/directory'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <HeroSection />
        </motion.div>
        
        {/* Features Section */}
        <motion.section 
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              variants={slideUp}
            >
              Explore Our Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={listItem}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <FeatureCard 
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon as any}
                    linkText={feature.linkText}
                    linkUrl={feature.linkUrl}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Latest Blog Posts Section */}
        <motion.section 
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              variants={slideUp}
            >
              <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
              <Link to="/blog">
                <Button variant="link" className="text-alumni-blue hover:text-alumni-blue/80 transition-colors">
                  View All →
                </Button>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={listItem}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    date={post.date}
                    type={post.type}
                    preview={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Upcoming Events Section */}
        <motion.section 
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              variants={slideUp}
            >
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Link to="/events">
                <Button variant="link" className="text-alumni-blue hover:text-alumni-blue/80 transition-colors">
                  View All →
                </Button>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingMeetings.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={listItem}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    id={event.id}
                    title={event.title}
                    content={event.content}
                    author={event.author}
                    date={event.date}
                    type={event.type}
                    meetingDate={event.meetingDate}
                    meetingTime={event.meetingTime}
                    preview={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Popular Interview Questions Section */}
        <motion.section 
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              variants={slideUp}
            >
              <h2 className="text-3xl font-bold">Popular Interview Questions</h2>
              <Link to="/interview-questions">
                <Button variant="link" className="text-alumni-blue hover:text-alumni-blue/80 transition-colors">
                  View All →
                </Button>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {interviewQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  variants={listItem}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    author={question.author}
                    date={question.date}
                    type={question.type}
                    preview={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
