import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/mission', label: 'Mission' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ececec] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center orbitl-logo transition-smooth hover:scale-105">
            <img src="/logo.png" alt="ORBITL" className="h-10 w-auto mr-3 hidden sm:block" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <span className="text-2xl text-primary font-bold">ORBITL</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Button asChild size="sm" className="transition-smooth hover:scale-105 rounded-full px-5 py-2">
              <Link to="/join">Join ORBITL</Link>
            </Button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Button asChild className="w-full glow-orange mt-4 rounded-full">
              <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                Join ORBITL
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;