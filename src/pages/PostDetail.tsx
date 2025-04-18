
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

const PostDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { posts, deletePost } = useData();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate('/404');
      }
    }
  }, [id, posts, navigate]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = user?.id === post.author.id;
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      
      // Navigate based on post type
      switch(post.type) {
        case 'blog':
          navigate('/blog');
          break;
        case 'interview':
          navigate('/interview-questions');
          break;
        case 'meeting':
          navigate('/events');
          break;
        default:
          navigate('/');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <article className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              
              {isOwner && (
                <div className="flex gap-2 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/edit-post/${post.id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </header>
            
            {post.type === 'meeting' && post.meetingDate && post.meetingTime && (
              <div className="bg-gray-50 p-6 rounded-lg mb-8 upcoming-meeting">
                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-alumni-blue" />
                    <span>
                      {new Date(post.meetingDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-alumni-blue" />
                    <span>{post.meetingTime}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="prose max-w-none mb-12">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
            
            <CommentSection 
              postId={post.id}
              comments={post.comments}
            />
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostDetailPage;
