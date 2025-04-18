import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';

// Mock data for blog posts
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'React is a JavaScript library for building user interfaces. In this article, we will explore the basics of React and how to build your first component...',
    author: 'John Doe',
    date: '2023-05-15',
    category: 'Web Development',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '2',
    title: 'Advanced CSS Techniques',
    excerpt: 'Learn advanced CSS techniques for modern web design. From flexbox to grid, animations to transitions, this guide covers everything you need to know...',
    author: 'Alex Johnson',
    date: '2023-03-22',
    category: 'Web Development',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '3',
    title: 'The Future of AI in Software Development',
    excerpt: 'Artificial Intelligence is transforming the way we develop software. From code generation to testing, AI tools are becoming an integral part of the development process...',
    author: 'Sarah Williams',
    date: '2023-04-10',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '4',
    title: 'Building Scalable Web Applications',
    excerpt: 'Learn how to design and build web applications that can handle millions of users. From architecture to deployment, this guide covers everything you need to know...',
    author: 'Michael Brown',
    date: '2023-02-15',
    category: 'Architecture',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
  },
  {
    id: '5',
    title: 'The Rise of TypeScript',
    excerpt: 'TypeScript is becoming the standard for large-scale JavaScript applications. Learn why you should consider using TypeScript for your next project...',
    author: 'Emily Davis',
    date: '2023-01-20',
    category: 'JavaScript',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
  },
  {
    id: '6',
    title: 'DevOps Best Practices',
    excerpt: 'Learn the best practices for implementing DevOps in your organization. From CI/CD to monitoring, this guide covers everything you need to know...',
    author: 'David Wilson',
    date: '2023-03-05',
    category: 'DevOps',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Web Development',
  'JavaScript',
  'Artificial Intelligence',
  'Architecture',
  'DevOps',
  'Mobile Development',
  'Data Science',
];

const Blog = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter posts based on search query and selected category
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Articles</h1>
          {user && (
            <Link to="/create-post">
              <Button className="flex items-center">
                Create Post <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        
        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        
        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{post.category}</span>
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>By {post.author} • {formatDate(post.date)}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${post.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse all our articles
            </p>
            <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Blog;
