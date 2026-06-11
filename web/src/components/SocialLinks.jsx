import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/orbitl.kmitl"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/80 hover:text-primary transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61590788691985"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/80 hover:text-primary transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={20} />
      </a>
      <a
        href="mailto:kmitlspace@gmail.com"
        className="text-foreground/80 hover:text-primary transition-colors"
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
    </div>
  );
}

export default SocialLinks;