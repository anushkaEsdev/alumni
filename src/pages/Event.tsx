import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Bookmark, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';

// Mock data for a single event
const mockEvent = {
  id: '1',
  title: 'NIELIT Alumni Tech Summit 2023',
  description: `
    Join us for the annual NIELIT Alumni Tech Summit, where industry leaders, alumni, and current students come together to share knowledge, network, and explore the latest trends in technology.

    ## Event Highlights

    - Keynote speeches from industry experts
    - Panel discussions on emerging technologies
    - Networking sessions with alumni and industry professionals
    - Career fair with top tech companies
    - Workshops and hands-on sessions
    - Alumni awards ceremony

    ## Who Should Attend

    - NIELIT Alumni
    - Current NIELIT students
    - Industry professionals
    - Tech enthusiasts

    ## Schedule

    **Day 1:**
    - 9:00 AM: Registration and Breakfast
    - 10:00 AM: Opening Ceremony
    - 11:00 AM: Keynote Speech
    - 12:30 PM: Lunch Break
    - 2:00 PM: Panel Discussions
    - 4:00 PM: Networking Session
    - 6:00 PM: Day 1 Closing

    **Day 2:**
    - 9:00 AM: Workshops
    - 12:30 PM: Lunch Break
    - 2:00 PM: Career Fair
    - 5:00 PM: Alumni Awards Ceremony
    - 7:00 PM: Closing Ceremony and Networking Dinner
  `,
  date: '2023-12-15',
  time: '09:00 AM',
  endDate: '2023-12-16',
  endTime: '07:00 PM',
  location: 'NIELIT Campus, New Delhi',
  address: 'Plot No. 3, PSP Pocket, Sector 8, Dwarka, New Delhi - 110077',
  type: 'Conference',
  attendees: 120,
  maxAttendees: 200,
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  organizer: {
    name: 'NIELIT Alumni Association',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    email: 'nielitalumnicalicut@gmail.com',
    phone: '+91 11 2530 8300'
  },
  speakers: [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      role: 'Director, NIELIT',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      bio: 'Dr. Rajesh Kumar is the Director of NIELIT with over 20 years of experience in the IT industry.'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'CTO, TechInnovate',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      bio: 'Priya Sharma is the CTO of TechInnovate and a NIELIT alumni from the 2005 batch.'
    },
    {
      id: '3',
      name: 'Amit Patel',
      role: 'Senior Software Engineer, Google',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      bio: 'Amit Patel is a Senior Software Engineer at Google and a NIELIT alumni from the 2010 batch.'
    }
  ],
  tags: ['conference', 'networking', 'technology', 'alumni', 'career']
};

// Mock data for similar events
const mockSimilarEvents = [
  {
    id: '2',
    title: 'NIELIT Alumni Meet 2023',
    description: 'Annual alumni gathering to reconnect and network with fellow NIELIT graduates.',
    date: '2023-10-20',
    time: '06:00 PM',
    location: 'NIELIT Campus, Kolkata',
    type: 'Networking',
    attendees: 80,
    maxAttendees: 100,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
  },
  {
    id: '3',
    title: 'Web Development Workshop',
    description: 'Hands-on workshop on modern web development technologies and best practices.',
    date: '2023-11-05',
    time: '10:00 AM',
    location: 'NIELIT Campus, Chennai',
    type: 'Workshop',
    attendees: 45,
    maxAttendees: 50,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
  },
  {
    id: '4',
    title: 'AI and Machine Learning Symposium',
    description: 'Symposium on the latest developments in AI and machine learning technologies.',
    date: '2024-01-15',
    time: '09:00 AM',
    location: 'NIELIT Campus, Hyderabad',
    type: 'Conference',
    attendees: 0,
    maxAttendees: 150,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  }
];

const Event = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(mockEvent);
  const [similarEvents, setSimilarEvents] = useState(mockSimilarEvents);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    // In a real application, you would fetch the event data based on the id
    // For now, we'll just use the mock data
    console.log(`Fetching event with id: ${id}`);
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleRegister = () => {
    if (!user) {
      // Redirect to login page
      window.location.href = '/login';
      return;
    }
    
    setIsRegistered(!isRegistered);
    // In a real application, you would update the registration status in the database
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real application, you would update the bookmark status in the database
  };
  
  const isEventFull = event.attendees >= event.maxAttendees;
  const isEventPast = new Date(event.date) < new Date();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <Link to="/events" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Event header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                  {event.type}
                </span>
                {isEventPast && (
                  <span className="text-sm font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    Past Event
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              {/* Event details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-gray-600">
                      {formatDate(event.date)} at {event.time}
                      {event.endDate !== event.date && (
                        <> to {formatDate(event.endDate)} at {event.endTime}</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-500 text-sm">{event.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-gray-600">
                      {event.attendees} / {event.maxAttendees} registered
                    </p>
                    {isEventFull && (
                      <p className="text-red-600 text-sm">Event is full</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600">
                      {event.endDate === event.date 
                        ? `${event.time} - ${event.endTime}`
                        : 'Multiple days'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Event description */}
            <div className="prose prose-lg max-w-none mb-12">
              {event.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Speakers section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.speakers.map((speaker) => (
                  <Card key={speaker.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <img 
                          src={speaker.avatar} 
                          alt={speaker.name} 
                          className="h-12 w-12 rounded-full mr-3"
                        />
                        <div>
                          <CardTitle className="text-lg">{speaker.name}</CardTitle>
                          <CardDescription>{speaker.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{speaker.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {event.tags.map((tag) => (
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
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Registration card */}
            <Card className="mb-8 sticky top-24">
              <CardHeader>
                <CardTitle>Register for this Event</CardTitle>
                <CardDescription>
                  {isEventPast 
                    ? 'This event has already taken place.'
                    : isEventFull 
                      ? 'This event is currently full.'
                      : `Join ${event.attendees} other attendees`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEventPast ? (
                  <div className="flex items-center text-gray-500 mb-4">
                    <XCircle className="h-5 w-5 mr-2" />
                    <span>Past Event</span>
                  </div>
                ) : isEventFull ? (
                  <div className="flex items-center text-red-500 mb-4">
                    <XCircle className="h-5 w-5 mr-2" />
                    <span>Event is Full</span>
                  </div>
                ) : isRegistered ? (
                  <div className="flex items-center text-green-500 mb-4">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>You are registered</span>
                  </div>
                ) : (
                  <div className="flex items-center text-blue-500 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.maxAttendees - event.attendees} spots remaining</span>
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={handleRegister}
                  disabled={isEventPast || isEventFull || isRegistered}
                >
                  {isEventPast 
                    ? 'Past Event' 
                    : isEventFull 
                      ? 'Event Full' 
                      : isRegistered 
                        ? 'Registered' 
                        : 'Register Now'}
                </Button>
                
                {!user && !isEventPast && !isEventFull && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    You need to <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to register
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Organizer card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <img 
                    src={event.organizer.avatar} 
                    alt={event.organizer.name} 
                    className="h-12 w-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{event.organizer.name}</p>
                    <p className="text-sm text-gray-500">NIELIT Alumni Association</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {event.organizer.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {event.organizer.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Similar events */}
            <div>
              <h2 className="text-xl font-bold mb-4">Similar Events</h2>
              <div className="space-y-4">
                {similarEvents.map((similarEvent) => (
                  <Link to={`/event/${similarEvent.id}`} key={similarEvent.id}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={similarEvent.imageUrl} 
                          alt={similarEvent.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {similarEvent.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {similarEvent.attendees} / {similarEvent.maxAttendees}
                          </span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{similarEvent.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(similarEvent.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {similarEvent.location}
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

export default Event; 