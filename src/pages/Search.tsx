import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Calendar, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';

// Mock data for search results
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces...',
    type: 'blog',
    author: 'John Doe',
    date: '2023-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '2',
    title: 'Annual Alumni Meet 2023',
    content: 'Join us for the annual alumni meet at NIELIT campus...',
    type: 'event',
    author: 'Alumni Association',
    date: '2023-06-20',
    location: 'NIELIT Campus, Bangalore',
    time: '10:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '3',
    title: 'JavaScript Interview Questions',
    content: 'Common JavaScript interview questions and answers...',
    type: 'interview',
    author: 'Jane Smith',
    date: '2023-04-10',
    topic: 'JavaScript',
    level: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
  },
  {
    id: '4',
    title: 'Advanced CSS Techniques',
    content: 'Learn advanced CSS techniques for modern web design...',
    type: 'blog',
    author: 'Alex Johnson',
    date: '2023-03-22',
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '5',
    title: 'Web Development Workshop',
    content: 'Join our web development workshop to learn the latest technologies...',
    type: 'event',
    author: 'Tech Team',
    date: '2023-07-05',
    location: 'Online',
    time: '2:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '6',
    title: 'React Hooks Explained',
    content: 'A comprehensive guide to React Hooks...',
    type: 'interview',
    author: 'Mike Brown',
    date: '2023-02-15',
    topic: 'React',
    level: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  
  // Filter results based on search query and active tab
  const filteredResults = mockPosts.filter(post => {
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesQuery;
    return matchesQuery && post.type === activeTab;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };
  
  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <BookOpen className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'interview':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'blog':
        return 'Article';
      case 'event':
        return 'Event';
      case 'interview':
        return 'Interview Question';
      default:
        return type;
    }
  };
  
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
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles, events, questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              Search
            </Button>
          </div>
        </form>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredResults.length} results for "{searchQuery}"
          </p>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="blog">Articles</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="interview">Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
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
                          {getPostTypeIcon(post.type)}
                          <span className="ml-1">{getPostTypeLabel(post.type)}</span>
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {post.content}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/post/${post.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Read More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or browse our content by category
                </p>
                <div className="flex justify-center space-x-4">
                  <Link to="/blog">
                    <Button variant="outline">Browse Articles</Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="outline">Browse Events</Button>
                  </Link>
                  <Link to="/interview-questions">
                    <Button variant="outline">Browse Questions</Button>
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="blog" className="mt-0">
            {filteredResults.filter(post => post.type === 'blog').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults
                  .filter(post => post.type === 'blog')
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
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
                            <span>Article</span>
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {post.content}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/post/${post.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or browse all our articles
                </p>
                <Link to="/blog">
                  <Button>Browse All Articles</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="event" className="mt-0">
            {filteredResults.filter(post => post.type === 'event').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults
                  .filter(post => post.type === 'event')
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
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
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Event</span>
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {post.content}
                        </CardDescription>
                        <div className="mt-2 text-sm text-gray-600">
                          <p><strong>Location:</strong> {post.location}</p>
                          <p><strong>Time:</strong> {post.time}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/post/${post.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or browse all our events
                </p>
                <Link to="/events">
                  <Button>Browse All Events</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="interview" className="mt-0">
            {filteredResults.filter(post => post.type === 'interview').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults
                  .filter(post => post.type === 'interview')
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
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
                            <FileText className="h-4 w-4 mr-1" />
                            <span>Interview Question</span>
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {post.content}
                        </CardDescription>
                        <div className="mt-2 text-sm text-gray-600">
                          <p><strong>Topic:</strong> {post.topic}</p>
                          <p><strong>Level:</strong> {post.level}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/post/${post.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Question
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No interview questions found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or browse all our interview questions
                </p>
                <Link to="/interview-questions">
                  <Button>Browse All Questions</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Search; 