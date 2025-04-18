import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Edit, Calendar, MessageSquare, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserActivities();
  }, [user, navigate]);

  const fetchUserActivities = async () => {
    try {
      // In a real application, you would fetch this data from your backend
      const mockActivities = [
        {
          id: '1',
          type: 'post',
          title: 'My First Post',
          date: new Date().toISOString(),
          content: 'This is my first post on the alumni network!'
        },
        {
          id: '2',
          type: 'event',
          title: 'Alumni Meetup 2024',
          date: new Date().toISOString(),
        }
      ];
      
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to load activities');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleCreateQuestion = () => {
    navigate('/create-question');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.photoURL || '/default-avatar.png'} alt={user.username} />
                <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              asChild
            >
              <Link to="/profile/settings">
                <Settings className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogOut className="h-4 w-4" />
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </CardContent>
        </Card>

        {/* User Stats and Activity */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>Your activity and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{activities.filter(a => a.type === 'post').length}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{activities.filter(a => a.type === 'event').length}</div>
                  <div className="text-sm text-muted-foreground">Events</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{activities.filter(a => a.type === 'question').length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{activities.filter(a => a.type === 'comment').length}</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">No posts yet</p>
                        <p className="text-sm text-muted-foreground">Start sharing your experiences</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">No events yet</p>
                        <p className="text-sm text-muted-foreground">Join or create alumni events</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">No questions yet</p>
                        <p className="text-sm text-muted-foreground">Share your interview experiences</p>
                      </div>
                    </div>
                  </>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {activity.type === 'post' && <BookOpen className="h-5 w-5 text-primary" />}
                        {activity.type === 'event' && <Calendar className="h-5 w-5 text-primary" />}
                        {activity.type === 'question' && <MessageSquare className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
} 