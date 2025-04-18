import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateEditPostForm from '@/components/CreateEditPostForm';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { fadeIn, slideUp } from '@/lib/animations';

const EditPostPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { posts } = useData();
  
  // Find the post to edit
  const post = id ? posts.find(p => p.id === id) : undefined;
  
  // Check if user is authenticated and is the author of the post
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to edit a post');
      navigate('/login');
      return;
    }
    
    if (!post) {
      toast.error('Post not found');
      navigate('/');
      return;
    }
    
    if (user?.id !== post.author.id) {
      toast.error('You can only edit your own posts');
      navigate('/');
    }
  }, [isAuthenticated, user, post, navigate]);

  if (!isAuthenticated || !post || user?.id !== post.author.id) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <motion.section 
          className="bg-gradient-to-r from-alumni-blue to-alumni-blue/80 py-12 text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Edit Post</h1>
              <p className="text-white/80 text-lg">Update your {post.type === 'blog' ? 'blog post' : post.type === 'interview' ? 'interview question' : 'event'}</p>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.section 
          className="py-12 bg-gray-50"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <CreateEditPostForm isEditing postId={id} />
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditPostPage;
