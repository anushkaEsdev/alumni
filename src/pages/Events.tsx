import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, ArrowRight, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Web Development Workshop',
    description: 'Join our web development workshop to learn the latest technologies and best practices in web development. This hands-on workshop will cover HTML, CSS, JavaScript, and modern frameworks.',
    date: '2023-07-05',
    time: '2:00 PM',
    location: 'Online',
    type: 'Workshop',
    attendees: 45,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Career Fair 2023',
    description: 'The annual NIELIT Career Fair brings together top employers and our talented alumni. Network with industry leaders, attend workshops, and explore job opportunities.',
    date: '2023-08-15',
    time: '10:00 AM',
    location: 'NIELIT Campus, Bangalore',
    type: 'Career Fair',
    attendees: 120,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Alumni Networking Event',
    description: 'Connect with fellow alumni at our networking event. Share experiences, build relationships, and expand your professional network.',
    date: '2023-09-20',
    time: '6:00 PM',
    location: 'Hyatt Regency, Mumbai',
    type: 'Networking',
    attendees: 75,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Annual Alumni Meet 2023',
    description: 'Join us for the annual alumni meet at NIELIT campus. Reconnect with old friends, meet new alumni, and celebrate our community.',
    date: '2023-06-20',
    time: '11:00 AM',
    location: 'NIELIT Campus, Delhi',
    type: 'Social',
    attendees: 200,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'past'
  },
  {
    id: '5',
    title: 'Tech Talk: AI in Healthcare',
    description: 'Join us for an insightful tech talk on the applications of AI in healthcare. Learn about the latest developments and future trends.',
    date: '2023-05-10',
    time: '4:00 PM',
    location: 'Online',
    type: 'Tech Talk',
    attendees: 60,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'past'
  },
  {
    id: '6',
    title: 'Hackathon 2023',
    description: 'Participate in our annual hackathon and showcase your coding skills. Work in teams to solve real-world problems and win exciting prizes.',
    date: '2023-04-15',
    time: '9:00 AM',
    location: 'NIELIT Campus, Hyderabad',
    type: 'Competition',
    attendees: 150,
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'past'
  }
];

// Event types for filtering
const eventTypes = [
  'All Types',
  'Workshop',
  'Career Fair',
  'Networking',
  'Social',
  'Tech Talk',
  'Competition',
];

const Events = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Filter events based on search query, selected type, and active tab
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || event.type === selectedType;
    
    const matchesTab = activeTab === 'upcoming' ? event.status === 'upcoming' : event.status === 'past';
    
    return matchesSearch && matchesType && matchesTab;
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
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Events</h1>
          {user && (
            <Link to="/create-event">
              <Button className="flex items-center">
                Create Event <ArrowRight className="ml-2 h-4 w-4" />
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
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
              {selectedType !== 'All Types' && ` of type ${selectedType}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="mt-0">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{event.type}</span>
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {event.description}
                        </CardDescription>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{formatDate(event.date)} at {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{event.attendees} attendees</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/events/${event.id}`} className="w-full">
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
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No upcoming events found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or check out our past events
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedType('All Types'); setActiveTab('past'); }}>
                  View Past Events
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Past Events */}
          <TabsContent value="past" className="mt-0">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{event.type}</span>
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {event.description}
                        </CardDescription>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{formatDate(event.date)} at {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{event.attendees} attendees</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/events/${event.id}`} className="w-full">
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
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No past events found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or check out our upcoming events
                </p>
                <Button onClick={() => { setSearchQuery(''); setSelectedType('All Types'); setActiveTab('upcoming'); }}>
                  View Upcoming Events
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Events;
