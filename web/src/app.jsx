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
import myLogo from './images/ORBITL-Photoroom.png';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <header className="bg-background border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={myLogo} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl">My Website</span>
        </Link>
        
        <nav className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/mission" className="hover:text-primary">Mission</Link>
          <Link to="/news" className="hover:text-primary">News</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
      </header>

      <main className="min-h-screen">
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
      </main>
      <Toaster />
    </Router>
  );
}

export default App;
