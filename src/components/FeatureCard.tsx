import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, FileQuestion, Users } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: 'blog' | 'events' | 'interview' | 'our-team';
  linkText: string;
  linkUrl: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  linkText, 
  linkUrl 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'blog':
        return <BookOpen className="h-8 w-8 text-alumni-blue" />;
      case 'events':
        return <Calendar className="h-8 w-8 text-alumni-blue" />;
      case 'interview':
        return <FileQuestion className="h-8 w-8 text-alumni-blue" />;
      case 'our-team':
        return <Users className="h-8 w-8 text-alumni-blue" />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="mb-2">
          {getIcon()}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={linkUrl}>
          <Button variant="outline" className="flex items-center gap-1">
            {linkText} 
            <span className="ml-1">→</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
