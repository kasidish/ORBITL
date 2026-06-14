import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom'; // 🔹 เพิ่ม Link สำหรับทำเมนู
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import AboutPage from './pages/AboutPage';
import MissionPage from './pages/MissionPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import myIcon from './images/ORBITL-Photoroom.png';

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* 🔹 แถบ Navbar ด้านบนสุด (จะแสดงผลในทุกๆ หน้า) */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          
          {/* ส่วนโลโก้รูปภาพและชื่อเว็บ */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            {/* 📷 รูปไอคอนของคุณแสดงตรงนี้ ปรับขนาดความสูงด้วย h-8 (32px) หรือเปลี่ยนตามใจชอบ */}
            <img 
              src={myIcon} 
              alt="ORBITL Logo" 
              className="h-8 w-auto object-contain" 
            />
            <span>ORBITL</span>
          </Link>

          {/* ส่วนลิงก์เมนูไปหน้าต่างๆ */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/mission" className="hover:text-primary transition-colors">Mission</Link>
            <Link to="/news" className="hover:text-primary transition-colors">News</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/join" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Join Us</Link>
          </div>

        </div>
      </nav>

      {/* ระบบเปลี่ยนหน้าเว็บตามปกติ */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="*" element={
          <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <Link to="/" className="text-primary hover:underline">Return to Home</Link>
          </div>
        } />
      </Routes>
      
      <Toaster />
    </Router>
  );
}

export default App;
