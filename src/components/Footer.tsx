import { Database, Github, Twitter, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-scientific-blue text-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NeuroBase</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Advancing neuroscience research through comprehensive databases 
              of non-traditional learning model organisms.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Research</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Browse Organisms</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Search Database</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Analysis Tools</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Publications</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Submit Data</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Collaborate</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; 2024 NeuroBase. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;