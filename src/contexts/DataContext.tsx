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
  loading: boolean;
  addPost: (post: CreatePostData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  editPost: (id: string, updatedPost: Partial<Post>) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  getPostsByType: (type: Post['type']) => Post[];
  getUpcomingMeetings: () => Post[];
  refreshPosts: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load posts from API
  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = async (postData: CreatePostData) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }

    try {
      const response = await postsAPI.create(postData);
      setPosts(prev => [response.data, ...prev]);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
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

  const editPost = async (id: string, updatedPost: Partial<Post>) => {
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

  return (
    <DataContext.Provider value={{ 
      posts, 
      loading,
      addPost, 
      deletePost, 
      editPost, 
      addComment,
      getPostsByType,
      getUpcomingMeetings,
      refreshPosts: loadPosts
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
