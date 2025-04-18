
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  date: string;
  type: 'blog' | 'interview' | 'meeting';
  meetingDate?: string;
  meetingTime?: string;
  preview?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  author,
  date,
  type,
  meetingDate,
  meetingTime,
  preview = false
}) => {
  const { user } = useAuth();
  const { deletePost } = useData();
  const isOwner = user?.id === author.id;
  const isMeeting = type === 'meeting';
  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const truncatedContent = preview && content.length > 120
    ? `${content.substring(0, 120)}...`
    : content;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="flex justify-between text-sm text-gray-500">
          <span>By {author.name}</span>
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700">{truncatedContent}</p>
        
        {isMeeting && meetingDate && meetingTime && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md upcoming-meeting">
            <p className="font-medium">📅 {new Date(meetingDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="text-sm">⏰ {meetingTime}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/${type}s/${id}`}>
          <Button variant="outline">Read More</Button>
        </Link>
        
        {isOwner && !preview && (
          <div className="space-x-2">
            <Link to={`/edit-post/${id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={() => deletePost(id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
