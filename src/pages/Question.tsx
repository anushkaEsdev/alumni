import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, Share2, Bookmark, ArrowLeft, Clock, User, Code, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';

// Mock data for a single question
const mockQuestion = {
  id: '1',
  title: 'Explain the difference between var, let, and const in JavaScript',
  content: `
    This is a common interview question that tests your understanding of JavaScript variable declarations.

    ## var

    - Function-scoped or globally-scoped
    - Can be redeclared and updated
    - Hoisted to the top of its scope
    - Initialized with undefined

    \`\`\`javascript
    var x = 10;
    var x = 20; // Allowed
    x = 30; // Allowed
    \`\`\`

    ## let

    - Block-scoped
    - Can be updated but not redeclared in the same scope
    - Not hoisted (temporal dead zone)
    - Not initialized

    \`\`\`javascript
    let y = 10;
    // let y = 20; // Error: Identifier 'y' has already been declared
    y = 30; // Allowed
    \`\`\`

    ## const

    - Block-scoped
    - Cannot be updated or redeclared
    - Not hoisted (temporal dead zone)
    - Must be initialized during declaration

    \`\`\`javascript
    const z = 10;
    // const z = 20; // Error: Identifier 'z' has already been declared
    // z = 30; // Error: Assignment to constant variable
    \`\`\`

    ## Best Practices

    - Use const by default
    - Use let when you need to reassign a variable
    - Avoid var due to its function-scoping and hoisting behavior
  `,
  author: 'John Doe',
  authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  date: '2023-07-01',
  category: 'JavaScript',
  difficulty: 'Beginner',
  likes: 45,
  views: 1200,
  tags: ['javascript', 'variables', 'scope', 'hoisting', 'interview'],
  answers: [
    {
      id: '1',
      author: 'Jane Smith',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `
        Great explanation! I would also add that 'let' and 'const' were introduced in ES6 (ES2015) to address some of the issues with 'var'.

        One practical example of why 'const' is preferred:

        \`\`\`javascript
        // With var or let
        let user = { name: 'John' };
        user.name = 'Jane'; // This works, even with const
        user = { name: 'Bob' }; // This would fail with const

        // With const
        const user = { name: 'John' };
        user.name = 'Jane'; // This still works
        // user = { name: 'Bob' }; // This would throw an error
        \`\`\`

        This is because 'const' prevents reassignment of the variable itself, but not modification of its properties if it's an object.
      `,
      date: '2023-07-02',
      likes: 12,
      isAccepted: true
    },
    {
      id: '2',
      author: 'Mike Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `
        I'd like to add a visual representation of the scoping differences:

        \`\`\`javascript
        // var example
        function varExample() {
          var x = 10;
          if (true) {
            var x = 20; // Same variable as above
            console.log(x); // 20
          }
          console.log(x); // 20
        }

        // let example
        function letExample() {
          let x = 10;
          if (true) {
            let x = 20; // Different variable
            console.log(x); // 20
          }
          console.log(x); // 10
        }
        \`\`\`

        This demonstrates how 'var' is function-scoped while 'let' is block-scoped.
      `,
      date: '2023-07-03',
      likes: 8,
      isAccepted: false
    }
  ],
  comments: [
    {
      id: '1',
      author: 'Sarah Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: 'This is a great question that comes up in almost every JavaScript interview!',
      date: '2023-07-04',
      likes: 5
    },
    {
      id: '2',
      author: 'David Brown',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: 'I would also mention that const objects can have their properties modified, but the reference cannot be changed.',
      date: '2023-07-05',
      likes: 3
    }
  ]
};

// Mock data for related questions
const mockRelatedQuestions = [
  {
    id: '2',
    title: 'What is the difference between == and === in JavaScript?',
    excerpt: 'Understanding the difference between loose equality and strict equality operators in JavaScript.',
    author: 'Emily Davis',
    date: '2023-06-28',
    category: 'JavaScript',
    difficulty: 'Beginner',
    likes: 38,
    views: 950,
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
  },
  {
    id: '3',
    title: 'Explain closures in JavaScript',
    excerpt: 'Understanding the concept of closures and their practical applications in JavaScript.',
    author: 'David Brown',
    date: '2023-06-25',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    likes: 42,
    views: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
  },
  {
    id: '4',
    title: 'What is the event loop in JavaScript?',
    excerpt: 'Understanding the JavaScript event loop and how asynchronous operations work.',
    author: 'Priya Sharma',
    date: '2023-06-20',
    category: 'JavaScript',
    difficulty: 'Advanced',
    likes: 56,
    views: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  }
];

const Question = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState(mockQuestion);
  const [relatedQuestions, setRelatedQuestions] = useState(mockRelatedQuestions);
  const [answer, setAnswer] = useState('');
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    // In a real application, you would fetch the question data based on the id
    // For now, we'll just use the mock data
    console.log(`Fetching question with id: ${id}`);
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real application, you would update the like count in the database
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real application, you would update the bookmark status in the database
  };
  
  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    
    // In a real application, you would submit the answer to the database
    console.log('Submitting answer:', answer);
    setAnswer('');
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    // In a real application, you would submit the comment to the database
    console.log('Submitting comment:', comment);
    setComment('');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <Link to="/interview-questions" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Interview Questions
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Question header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                  {question.category}
                </span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  question.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {question.difficulty}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{question.title}</h1>
              <div className="flex items-center">
                <img 
                  src={question.authorAvatar} 
                  alt={question.author} 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{question.author}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(question.date)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Question content */}
            <div className="prose prose-lg max-w-none mb-12">
              {question.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-between border-t border-b py-4 mb-8">
              <div className="flex items-center space-x-4">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {isLiked ? question.likes + 1 : question.likes} Likes
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {question.answers.length} Answers
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button 
                variant={isBookmarked ? "default" : "outline"} 
                size="sm"
                onClick={handleBookmark}
                className="flex items-center"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
            
            {/* Answers section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Answers ({question.answers.length})</h2>
              
              {/* Answer form */}
              {user ? (
                <form onSubmit={handleAnswerSubmit} className="mb-8">
                  <h3 className="text-lg font-medium mb-2">Your Answer</h3>
                  <Textarea
                    placeholder="Write your answer..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="mb-4"
                    rows={6}
                  />
                  <Button type="submit">Post Answer</Button>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-8 text-center">
                  <p className="mb-2">Please log in to post an answer.</p>
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                </div>
              )}
              
              {/* Answers list */}
              <div className="space-y-6">
                {question.answers.map((answer) => (
                  <Card key={answer.id} className={answer.isAccepted ? 'border-green-500' : ''}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={answer.authorAvatar} 
                            alt={answer.author} 
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">{answer.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(answer.date)}</p>
                          </div>
                        </div>
                        {answer.isAccepted && (
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            <span className="text-sm font-medium">Accepted Answer</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        {answer.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {answer.likes} Likes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Comments section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Comments ({question.comments.length})</h2>
              
              {/* Comment form */}
              {user ? (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <Textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-4"
                    rows={4}
                  />
                  <Button type="submit">Post Comment</Button>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-8 text-center">
                  <p className="mb-2">Please log in to leave a comment.</p>
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                </div>
              )}
              
              {/* Comments list */}
              <div className="space-y-4">
                {question.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <img 
                          src={comment.authorAvatar} 
                          alt={comment.author} 
                          className="h-8 w-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {comment.likes} Likes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Stats card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Question Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{question.views}</p>
                    <p className="text-sm text-gray-500">Views</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{question.likes}</p>
                    <p className="text-sm text-gray-500">Likes</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{question.answers.length}</p>
                    <p className="text-sm text-gray-500">Answers</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{question.comments.length}</p>
                    <p className="text-sm text-gray-500">Comments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Related questions */}
            <div>
              <h2 className="text-xl font-bold mb-4">Related Questions</h2>
              <div className="space-y-4">
                {relatedQuestions.map((relatedQuestion) => (
                  <Link to={`/question/${relatedQuestion.id}`} key={relatedQuestion.id}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {relatedQuestion.category}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            relatedQuestion.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            relatedQuestion.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {relatedQuestion.difficulty}
                          </span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{relatedQuestion.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2">
                          {relatedQuestion.excerpt}
                        </CardDescription>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {relatedQuestion.author}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {relatedQuestion.likes}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Question; 