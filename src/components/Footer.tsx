
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Brand</h3>
            <p className="text-gray-300 mb-4">
              Leading provider of innovative solutions for indoor, outdoor, and pole-mounted applications.
              Quality products designed for excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">Products</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@brand.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Business St, City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
