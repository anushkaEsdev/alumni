import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, Bookmark, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { toast } from 'react-hot-toast';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { posts, addComment } = useData();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    fetchPost();
  }, [id, posts]);
  
  const fetchPost = () => {
    try {
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        toast.error('Post not found');
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like');
      navigate('/login');
      return;
    }

    setIsLiked(!isLiked);
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1
      });
    }
  };
  
  const handleBookmark = () => {
    if (!user) {
      toast.error('Please login to bookmark');
      navigate('/login');
      return;
    }

    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Post unbookmarked' : 'Post bookmarked');
  };
  
  const handleComment = async () => {
    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      await addComment(post.id, comment);
      setComment('');
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">By {post.author.name}</span>
            <span className="text-gray-400">•</span>
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{formatDate(post.date)}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? 'text-primary' : ''}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {post.likes} Likes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? 'text-primary' : ''}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="prose max-w-none mb-8">
          {post.content}
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="space-y-4">
            {post.comments.map((comment: any) => (
              <Card key={comment.id}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="mb-4"
          />
          <Button onClick={handleComment}>Post Comment</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Post; 