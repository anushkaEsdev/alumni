import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, Bookmark, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: `React is a JavaScript library for building user interfaces. In this article, we will explore the basics of React and how to build your first component.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Why React?

1. **Component-Based Architecture**: React's component-based approach makes it easy to build and maintain complex applications.
2. **Virtual DOM**: React uses a virtual DOM to efficiently update the UI.
3. **One-Way Data Flow**: React's one-way data flow makes it easier to understand how data changes affect the application.
4. **Rich Ecosystem**: React has a vast ecosystem of libraries and tools.

## Getting Started

To get started with React, you'll need to:

1. Install Node.js
2. Create a new React project using Create React App
3. Start the development server

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Conclusion

React is a powerful library for building user interfaces. Its component-based architecture and efficient rendering make it a great choice for modern web applications.`,
    author: 'John Doe',
    createdAt: '2023-05-15',
    likes: 45,
    comments: [
      {
        id: '1',
        author: 'Jane Smith',
        content: 'Great introduction to React! Very helpful for beginners.',
        createdAt: '2023-05-16'
      },
      {
        id: '2',
        author: 'Mike Johnson',
        content: 'The virtual DOM explanation was particularly clear. Thanks!',
        createdAt: '2023-05-17'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced CSS Techniques',
    content: `Learn advanced CSS techniques for modern web design. From flexbox to grid, animations to transitions, this guide covers everything you need to know.

## CSS Grid

CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

## Flexbox

Flexbox is another powerful layout system that makes it easy to create flexible and responsive layouts.

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

## Animations

CSS animations allow you to create smooth, performant animations without JavaScript.

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease-in-out;
}
\`\`\`

## Conclusion

Mastering these CSS techniques will help you create modern, responsive, and visually appealing websites.`,
    author: 'Alex Johnson',
    createdAt: '2023-03-22',
    likes: 32,
    comments: [
      {
        id: '3',
        author: 'Sarah Williams',
        content: 'The grid examples were very helpful. Thanks!',
        createdAt: '2023-03-23'
      }
    ]
  }
];

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    fetchPost();
  }, [id]);
  
  const fetchPost = () => {
    try {
      // Use mock data instead of API call
      const foundPost = mockPosts.find(p => p.id === id);
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
  
  const handleComment = () => {
    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (post) {
      const newComment = {
        id: Date.now().toString(),
        author: user.name,
        content: comment,
        createdAt: new Date().toISOString()
      };

      setPost({
        ...post,
        comments: [...post.comments, newComment]
      });

      setComment('');
      toast.success('Comment added');
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
            <span className="text-gray-600">By {post.author}</span>
            <span className="text-gray-400">•</span>
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{formatDate(post.createdAt)}</span>
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
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comments ({post.comments.length})</h2>
          
          {user ? (
            <div className="mb-6">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-2"
              />
              <Button onClick={handleComment}>Post Comment</Button>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Please login to comment</p>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
          )}
          
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Post; 