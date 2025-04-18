import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import Events from '@/pages/Events';
import InterviewQuestions from '@/pages/InterviewQuestions';
import OurTeam from '@/pages/OurTeam';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import ProfileSettings from '@/pages/ProfileSettings';
import CreatePost from '@/pages/CreatePost';
import EditPost from '@/pages/EditPost';
import Post from '@/pages/Post';
import Event from '@/pages/Event';
import Question from '@/pages/Question';
import Search from '@/pages/Search';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Contact from '@/pages/Contact';
import CreateEvent from '@/pages/CreateEvent';
import CreateQuestion from '@/pages/CreateQuestion';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/create" element={<CreatePost />} />
                <Route path="/blog/edit/:id" element={<EditPost />} />
                <Route path="/blog/:id" element={<Post />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/create" element={<CreateEvent />} />
                <Route path="/events/:id" element={<Event />} />
                <Route path="/interview-questions" element={<InterviewQuestions />} />
                <Route path="/interview-questions/create" element={<CreateQuestion />} />
                <Route path="/interview-questions/:id" element={<Question />} />
                <Route path="/directory" element={<OurTeam />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/settings" element={<ProfileSettings />} />
                <Route path="/search" element={<Search />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
