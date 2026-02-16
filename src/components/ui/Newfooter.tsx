"use client";
import { useEffect, useRef, useState } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Github, 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart
} from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Our Team', href: '#team' },
  { name: 'FAQ', href: '#faq' },
];

const resources = [
  { name: 'IEEE Global', href: 'https://www.ieee.org' },
  { name: 'Computer Society', href: 'https://www.computer.org' },
  { name: 'IEEE MUJ', href: 'https://ieeemuj.com' },
  { name: 'MUJ Official', href: 'https://jaipur.manipal.edu' },
];

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ieee-cs-muj' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ieee_csmuj' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/IEEECSMUJ' },
  { name: 'WhatsApp', icon: MessageCircle, href: '#' },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const fullText = '© 2024 IEEE CS MUJ. All systems operational.';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isVisible]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer 
      id="join"
      ref={sectionRef}
      className="relative pt-24 pb-8 overflow-hidden"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div 
            className={`reveal ${isVisible ? 'active' : ''}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/ieee-cs-logo.png" 
                alt="IEEE CS" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-orbitron font-bold text-lg">IEEE CS</h3>
                <p className="font-mono text-xs text-gray-500">MUJ Chapter</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Advancing technology for humanity through innovation, education, and collaboration.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-orange-500/30 rounded hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div 
            className={`reveal ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-orange-500">&gt;</span> Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div 
            className={`reveal ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-orange-500">&gt;</span> Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors" />
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div 
            className={`reveal ${isVisible ? 'active' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-orange-500">&gt;</span> Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Manipal University Jaipur,<br />
                  Dehmi Kalan, Jaipur-Ajmer Expressway,<br />
                  Rajasthan 303007
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a 
                  href="mailto:contact@ieeecsmuj.com"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                  contact@ieeecsmuj.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a 
                  href="tel:+919871340076"
                  className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                  +91 98713 40076
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Terminal-style bottom bar */}
        <div 
          className={`reveal border-t border-orange-500/20 pt-8 ${isVisible ? 'active' : ''}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="glass rounded-lg p-4 font-mono text-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Typed text */}
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-orange-500">$</span>
                <span>{typedText}</span>
                <span className="animate-pulse text-orange-500">_</span>
              </div>

              {/* Made with love */}
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>by IEEE CS MUJ Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large background text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]">
          <div className="font-orbitron text-[20vw] font-bold text-white whitespace-nowrap">
            IEEE CS
          </div>
        </div>
      </div>
    </footer>
  );

}



