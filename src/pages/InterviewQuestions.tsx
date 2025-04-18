import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Code, MessageSquare, ThumbsUp, Clock, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';

// Mock data for interview questions
const mockQuestions = [
  {
    id: '1',
    title: 'Explain the concept of React Hooks',
    content: 'React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 to enable state management and side effects in functional components without using class components.',
    category: 'React',
    difficulty: 'Intermediate',
    author: 'John Doe',
    date: '2023-07-01',
    likes: 45,
    comments: 12,
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    status: 'recent'
  },
  {
    id: '2',
    title: 'What is the difference between let, const, and var?',
    content: 'let and const are block-scoped declarations introduced in ES6, while var is function-scoped. let allows reassignment, const prevents reassignment, and var is hoisted to the top of its scope.',
    category: 'JavaScript',
    difficulty: 'Beginner',
    author: 'Jane Smith',
    date: '2023-06-28',
    likes: 38,
    comments: 8,
    tags: ['javascript', 'es6', 'variables', 'scope'],
    status: 'recent'
  },
  {
    id: '3',
    title: 'How does garbage collection work in JavaScript?',
    content: 'JavaScript uses an automatic garbage collection mechanism to manage memory. It identifies and removes objects that are no longer referenced in the program, preventing memory leaks.',
    category: 'JavaScript',
    difficulty: 'Advanced',
    author: 'Mike Johnson',
    date: '2023-06-25',
    likes: 29,
    comments: 15,
    tags: ['javascript', 'memory', 'garbage-collection', 'performance'],
    status: 'recent'
  },
  {
    id: '4',
    title: 'Explain the concept of Redux',
    content: 'Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently and run in different environments. It provides a single source of truth for your application state.',
    category: 'React',
    difficulty: 'Intermediate',
    author: 'Sarah Wilson',
    date: '2023-06-20',
    likes: 42,
    comments: 10,
    tags: ['react', 'redux', 'state-management', 'javascript'],
    status: 'popular'
  },
  {
    id: '5',
    title: 'What are Promises in JavaScript?',
    content: 'Promises are objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner way to handle asynchronous operations compared to callbacks.',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    author: 'David Brown',
    date: '2023-06-15',
    likes: 35,
    comments: 7,
    tags: ['javascript', 'async', 'promises', 'es6'],
    status: 'popular'
  },
  {
    id: '6',
    title: 'Explain CSS Grid Layout',
    content: 'CSS Grid Layout is a two-dimensional grid-based layout system designed for organizing content in rows and columns. It provides a more efficient way to create complex web layouts compared to traditional methods.',
    category: 'CSS',
    difficulty: 'Intermediate',
    author: 'Emily Davis',
    date: '2023-06-10',
    likes: 31,
    comments: 9,
    tags: ['css', 'grid', 'layout', 'web-design'],
    status: 'popular'
  }
];

// Categories for filtering
const categories = [
  'All Categories',
  'React',
  'JavaScript',
  'CSS',
  'HTML',
  'Node.js',
  'Python',
  'Java',
  'SQL',
  'Data Structures'
];

// Difficulty levels for filtering
const difficulties = [
  'All Difficulties',
  'Beginner',
  'Intermediate',
  'Advanced'
];

const InterviewQuestions = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [activeTab, setActiveTab] = useState('recent');
  
  // Filter questions based on search query, selected category, difficulty, and active tab
  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || question.category === selectedCategory;
    
    const matchesDifficulty = selectedDifficulty === 'All Difficulties' || question.difficulty === selectedDifficulty;
    
    const matchesTab = activeTab === 'recent' ? question.status === 'recent' : question.status === 'popular';
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
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
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Interview Questions</h1>
          {user && (
            <Link to="/create-question">
              <Button className="flex items-center">
                Ask Question <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
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
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="recent" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="recent">Recent Questions</TabsTrigger>
            <TabsTrigger value="popular">Popular Questions</TabsTrigger>
          </TabsList>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
              {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
              {selectedDifficulty !== 'All Difficulties' && ` of ${selectedDifficulty} difficulty`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Questions List */}
          <TabsContent value="recent" className="mt-0">
            {filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full flex items-center">
                            <Code className="h-4 w-4 mr-1" />
                            <span>{question.category}</span>
                          </span>
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {question.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(question.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{question.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {question.content}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{question.author}</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{question.likes} likes</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{question.comments} comments</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/question/${question.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No questions found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or check out our popular questions
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setSelectedDifficulty('All Difficulties'); setActiveTab('popular'); }}>
                  View Popular Questions
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            {filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full flex items-center">
                            <Code className="h-4 w-4 mr-1" />
                            <span>{question.category}</span>
                          </span>
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {question.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(question.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{question.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {question.content}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{question.author}</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{question.likes} likes</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{question.comments} comments</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/question/${question.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No questions found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or check out our recent questions
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setSelectedDifficulty('All Difficulties'); setActiveTab('recent'); }}>
                  View Recent Questions
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default InterviewQuestions;
