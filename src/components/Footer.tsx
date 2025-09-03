import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">FamilyRent</h3>
                <p className="text-sm text-gray-400">Trusted Family Rentals</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's most trusted platform for family property rentals with verified homes, 
              complete furniture packages, and transparent processes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/search" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Search Properties
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Our Services
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                How It Works
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Pricing
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Property Verification
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Furniture Rental
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Legal Assistance
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Moving Services
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Maintenance Support
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Insurance
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+91-1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">support@familyrent.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Business Park, Sector 18<br />
                  Gurgaon, Haryana 122015
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 FamilyRent. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}