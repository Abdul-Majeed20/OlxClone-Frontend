import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const countries = [
    'Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Other Countries'
  ];

  const languages = [
    'English', 'Urdu', 'Hindi', 'Bengali', 'Tamil', 'Other Languages'
  ];

  const popularCategories = [
    'Mobile Phones', 'Cars', 'Motorcycles', 'Houses', 'TV - Video - Audio',
    'Tablets', 'Land & Plots', 'Apartments & Flats'
  ];

  const popularSearches = [
    'Bikes', 'Watches', 'Books', 'Dogs', 'Cats', 'iPhone', 'Samsung',
    'Laptop', 'LED TV', 'Sofa', 'Bed', 'Camera'
  ];

  const aboutUsLinks = [
    { name: 'About OLX Group', url: '/about' },
    { name: 'OLX Blog', url: '/blog' },
    { name: 'Contact Us', url: '/contact' },
    { name: 'OLX for Businesses', url: '/business' }
  ];

  const helpLinks = [
    { name: 'Help & Support', url: '/help' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Stay Safe', url: '/safety' },
    { name: 'Terms of Use', url: '/terms' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  const mobileApps = [
    { platform: 'Android', icon: '🤖', url: '#' },
    { platform: 'iOS', icon: '🍎', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section - Categories & Popular Searches */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Popular Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">POPULAR CATEGORIES</h3>
              <ul className="space-y-2">
                {popularCategories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Searches */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">POPULAR SEARCHES</h3>
              <ul className="space-y-2">
                {popularSearches.map((search, index) => (
                  <li key={index}>
                    <Link 
                      to={`/search?q=${search.toLowerCase()}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {search}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">ABOUT US</h3>
              <ul className="space-y-2">
                {aboutUsLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.url}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* OLX Help */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">OLX HELP</h3>
              <ul className="space-y-2">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.url}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Country, Language, Social & Apps */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Country & Language Selector */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Country:</span>
                <select 
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Language:</span>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Social Media & Mobile Apps */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Follow us:</span>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="text-gray-400 hover:text-white text-lg transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Apps */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Mobile apps:</span>
                <div className="flex space-x-3">
                  {mobileApps.map((app, index) => (
                    <a
                      key={index}
                      href={app.url}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <span>{app.icon}</span>
                      <span>{app.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Legal */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 OLX - All rights reserved
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center space-x-4 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Made with love */}
            <div className="text-gray-400 text-sm flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>in Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Free Classifieds Notice */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-white text-sm font-medium">
            Free Classifieds in Pakistan. © 2006-2024 OLX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;