import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ImageIcon, LinkIcon, CalendarIcon, ClockIcon } from 'lucide-react';

interface CreateEditPostFormProps {
  isEditing?: boolean;
  postId?: string;
}

const CreateEditPostForm: React.FC<CreateEditPostFormProps> = ({ 
  isEditing = false, 
  postId 
}) => {
  const navigate = useNavigate();
  const { posts, addPost, editPost } = useData();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'blog' | 'interview' | 'meeting'>('blog');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    if (isEditing && postId) {
      const post = posts.find((p) => p.id === postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setType(post.type);
        if (post.meetingDate) setMeetingDate(post.meetingDate);
        if (post.meetingTime) setMeetingTime(post.meetingTime);
        if (post.imageUrl) setImageUrl(post.imageUrl);
        if (post.eventLink) setEventLink(post.eventLink);
        if (post.imageUrl) setImagePreview(post.imageUrl);
        if (post.question) setQuestion(post.question);
        if (post.answer) setAnswer(post.answer);
        if (post.topic) setTopic(post.topic);
        if (post.level) setLevel(post.level);
      } else {
        toast.error('Post not found');
        navigate('/');
      }
    }
  }, [isEditing, postId, posts, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (type === 'blog' && !content.trim()) {
      toast.error('Please enter content for the blog post');
      return;
    }
    
    if (type === 'meeting') {
      if (!meetingDate || !meetingTime) {
        toast.error('Meeting date and time are required for events');
        return;
      }
      
      const eventDateTime = new Date(`${meetingDate}T${meetingTime}`);
      if (eventDateTime < new Date()) {
        toast.error('Cannot create events in the past');
        return;
      }
    }
    
    if (type === 'interview' && (!question.trim() || !answer.trim())) {
      toast.error('Please enter both question and answer');
      return;
    }
    
    const postData = {
      title,
      type,
      content: type === 'interview' ? `${question}\n\nAnswer: ${answer}` : content,
      ...(type === 'blog' && { imageUrl }),
      ...(type === 'meeting' && { 
        meetingDate, 
        meetingTime, 
        eventLink 
      }),
      ...(type === 'interview' && { 
        question,
        answer,
        topic,
        level,
        imageUrl 
      })
    };
    
    if (isEditing && postId) {
      editPost(postId, postData);
      toast.success('Post updated successfully');
      navigate(`/${type}s/${postId}`);
    } else {
      addPost(postData);
      toast.success('Post created successfully');
      navigate(`/${type}s`);
    }
  };

  // Get styles based on post type
  const getTypeStyles = () => {
    switch (type) {
      case 'blog':
        return {
          container: 'border-blue-500 bg-blue-50',
          header: 'bg-blue-100',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'interview':
        return {
          container: 'border-green-500 bg-green-50',
          header: 'bg-green-100',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'meeting':
        return {
          container: 'border-purple-500 bg-purple-50',
          header: 'bg-purple-100',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          container: 'border-gray-200 bg-white',
          header: 'bg-gray-100',
          button: 'bg-alumni-blue hover:bg-alumni-darkBlue'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Card className={`w-full max-w-3xl mx-auto shadow-lg border-2 ${styles.container}`}>
      <CardHeader className={`border-b ${styles.header}`}>
        <CardTitle className="text-2xl font-bold text-center">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <div className="mb-6">
            <Label className="text-base font-semibold mb-4 block">Select Post Type</Label>
            <RadioGroup 
              value={type} 
              onValueChange={(value) => setType(value as 'blog' | 'interview' | 'meeting')}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className={`flex flex-col items-center p-4 border-2 rounded-lg hover:border-blue-500 cursor-pointer transition-colors ${type === 'blog' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="blog" id="blog" className="sr-only" />
                <Label htmlFor="blog" className="cursor-pointer text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-medium">Blog Post</div>
                  <div className="text-sm text-gray-500">Share articles and insights</div>
                </Label>
              </div>
              
              <div className={`flex flex-col items-center p-4 border-2 rounded-lg hover:border-green-500 cursor-pointer transition-colors ${type === 'interview' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="interview" id="interview" className="sr-only" />
                <Label htmlFor="interview" className="cursor-pointer text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-medium">Interview Question</div>
                  <div className="text-sm text-gray-500">Share interview experiences</div>
                </Label>
              </div>
              
              <div className={`flex flex-col items-center p-4 border-2 rounded-lg hover:border-purple-500 cursor-pointer transition-colors ${type === 'meeting' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="meeting" id="meeting" className="sr-only" />
                <Label htmlFor="meeting" className="cursor-pointer text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="font-medium">Meeting/Event</div>
                  <div className="text-sm text-gray-500">Schedule alumni gatherings</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {type === 'blog' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                  <Input 
                    id="title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter blog post title"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base font-semibold">Content</Label>
                  <Textarea 
                    id="content"
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Write your blog post content here..."
                    rows={8}
                    className="text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-base font-semibold">
                    <ImageIcon size={18} />
                    <span>Featured Image</span>
                  </Label>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full max-w-md">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setImageUrl('');
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-2">Upload a featured image</p>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select Image
                        </Button>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {type === 'interview' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                  <Input 
                    id="title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter interview question title"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question" className="text-base font-semibold">Question</Label>
                  <Textarea 
                    id="question"
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Enter the interview question..."
                    rows={4}
                    className="text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer" className="text-base font-semibold">Answer</Label>
                  <Textarea 
                    id="answer"
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)} 
                    placeholder="Enter the answer..."
                    rows={6}
                    className="text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-base font-semibold">Topic</Label>
                    <Input 
                      id="topic"
                      value={topic} 
                      onChange={(e) => setTopic(e.target.value)} 
                      placeholder="e.g., Data Structures, Algorithms"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-base font-semibold">Difficulty Level</Label>
                    <Input 
                      id="level"
                      value={level} 
                      onChange={(e) => setLevel(e.target.value)} 
                      placeholder="e.g., Easy, Medium, Hard"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-base font-semibold">
                    <ImageIcon size={18} />
                    <span>Question Image (Optional)</span>
                  </Label>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg hover:border-green-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full max-w-md">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setImageUrl('');
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-2">Upload an image for the question</p>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select Image
                        </Button>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {type === 'meeting' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Event Title</Label>
                  <Input 
                    id="title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter event title"
                    className="h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base font-semibold">Description</Label>
                  <Textarea 
                    id="content"
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter event description..."
                    rows={4}
                    className="text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meeting-date" className="flex items-center gap-2">
                      <CalendarIcon size={16} />
                      <span className="font-semibold">Event Date</span>
                    </Label>
                    <Input 
                      id="meeting-date"
                      type="date"
                      value={meetingDate} 
                      onChange={(e) => setMeetingDate(e.target.value)} 
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meeting-time" className="flex items-center gap-2">
                      <ClockIcon size={16} />
                      <span className="font-semibold">Event Time</span>
                    </Label>
                    <Input 
                      id="meeting-time"
                      type="time"
                      value={meetingTime} 
                      onChange={(e) => setMeetingTime(e.target.value)} 
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-base font-semibold">
                    <LinkIcon size={18} />
                    <span>Event Link</span>
                  </Label>
                  <Input 
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={eventLink} 
                    onChange={(e) => setEventLink(e.target.value)} 
                    className="h-12"
                  />
                  <p className="text-sm text-gray-500">
                    Add a link to the virtual meeting or event registration page
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 border-t bg-gray-50">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className={`px-6 ${styles.button}`}
          >
            {isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateEditPostForm;
