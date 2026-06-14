import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks.jsx';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="orbitl-logo text-2xl">ORBITL</span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-prose">
              Advancing space technology through student innovation and collaboration at KMITL.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/mission" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Our Mission
              </Link>
              <Link to="/news" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                News
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ORBITL. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;