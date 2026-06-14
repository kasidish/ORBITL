import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import myIcon from './images/ORBITL-Photoroom.png'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4"></div>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img 
              src={myIcon} 
              alt="ORBITL Logo" 
              className="h-8 w-auto object-contain" 
            />
            <span>ORBITL</span>
          </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <a href="/" className="text-primary hover:underline">Return to Home</a>
          </div>
        } />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
