import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { postsAPI, eventsAPI, questionsAPI } from '@/services/api';

// Types
interface Post {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'interview' | 'meeting';
  author: {
    id: string;
    name: string;
  };
  date: string;
  comments: Comment[];
  meetingDate?: string;
  meetingTime?: string;
  likes: number;
}

// New type for creating posts that doesn't require the author field
interface CreatePostData {
  title: string;
  content: string;
  type: 'blog' | 'interview' | 'meeting';
  meetingDate?: string;
  meetingTime?: string;
}

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface DataContextType {
  posts: Post[];
  events: Post[];
  questions: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  getPostsByType: (type: Post['type']) => Post[];
  getUpcomingMeetings: () => Post[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Post[]>([]);
  const [questions, setQuestions] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsResponse, eventsResponse, questionsResponse] = await Promise.all([
        postsAPI.getAll(),
        eventsAPI.getAll(),
        questionsAPI.getAll()
      ]);

      setPosts(postsResponse.data);
      setEvents(eventsResponse.data);
      setQuestions(questionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: Omit<Post, 'id'>) => {
    try {
      const response = await postsAPI.create(post);
      setPosts(prev => [...prev, response.data]);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
      throw error;
    }
  };

  const updatePost = async (id: string, updatedPost: Partial<Post>) => {
    try {
      const response = await postsAPI.update(id, updatedPost);
      setPosts(prev => prev.map(post => 
        post.id === id ? response.data : post
      ));
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error('Failed to update post:', error);
      toast.error('Failed to update post');
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await postsAPI.delete(id);
      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
      throw error;
    }
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) {
      toast.error("You must be logged in to add a comment");
      return;
    }

    try {
      const response = await postsAPI.addComment(postId, content);
      setPosts(prev => prev.map(post => 
        post.id === postId ? response.data : post
      ));
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
      throw error;
    }
  };

  const getPostsByType = (type: Post['type']) => {
    return posts.filter(post => post.type === type);
  };

  const getUpcomingMeetings = () => {
    const today = new Date().toISOString().split('T')[0];
    return posts
      .filter(post => 
        post.type === 'meeting' && post.meetingDate && post.meetingDate >= today
      )
      .sort((a, b) => 
        a.meetingDate && b.meetingDate 
          ? a.meetingDate.localeCompare(b.meetingDate) 
          : 0
      );
  };

  const value = {
    posts,
    events,
    questions,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    addComment,
    getPostsByType,
    getUpcomingMeetings
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useData };
