import React from "react";

const Footer = () => {
  return (
    <div>
   <footer className="bg-gray-800 text-gray-300">
  <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* About Us */}
    <div>
      <h3 className="font-semibold text-lg text-white mb-4">About SwiftCart</h3>
      <p className="text-sm">
        SwiftCart is your one-stop online shopping destination. Experience unbeatable deals, a wide range of products, and fast delivery at your fingertips.
      </p>
    </div>

    {/* Customer Support */}
    <div>
      <h3 className="font-semibold text-lg text-white mb-4">Customer Support</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
        <li><a href="#" className="hover:text-blue-400">Returns & Refunds</a></li>
        <li><a href="#" className="hover:text-blue-400">Shipping Policy</a></li>
        <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-semibold text-lg text-white mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-blue-400">Shop All Categories</a></li>
        <li><a href="#" className="hover:text-blue-400">Latest Deals</a></li>
        <li><a href="#" className="hover:text-blue-400">Sign In / Register</a></li>
        <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
      </ul>
    </div>

    {/* Follow Us */}
    <div>
      <h3 className="font-semibold text-lg text-white mb-4">Follow Us</h3>
      <p className="text-sm mb-4">Stay connected on social media for the latest updates and offers!</p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-blue-400">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="hover:text-blue-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-blue-400">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-blue-400">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-600 mt-6">
    <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm">&copy; 2024 SwiftCart. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-blue-400">Privacy Policy</a>
        <a href="#" className="hover:text-blue-400">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Footer;
