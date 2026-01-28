// src/components/About.js
import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">About AgriMarket</h1>

      <p>
        Welcome to <strong>AgriMarket</strong>, your trusted online marketplace dedicated to connecting farmers, sellers, and customers with fresh agricultural products. Our mission is to empower local farmers by providing them a seamless digital platform to showcase and sell their produce directly to consumers, ensuring transparency, quality, and fair pricing.
      </p>

      <h3 className="mt-5 mb-3">Our Vision</h3>
      <p>
        To revolutionize the agricultural supply chain by bridging the gap between farmers and consumers, promoting sustainable farming, and fostering community growth.
      </p>

      <h3 className="mt-5 mb-3">What We Offer</h3>
      <ul>
        <li><strong>For Farmers:</strong> Easy-to-use tools to list products, manage inventory, and connect with buyers.</li>
        <li><strong>For Customers:</strong> Access to fresh, organic, and locally sourced agricultural products delivered right to your doorstep.</li>
        <li><strong>Secure Payments:</strong> Multiple payment options with secure transaction processes.</li>
        <li><strong>Real-time Updates:</strong> Track orders and get timely notifications.</li>
      </ul>

      <h3 className="mt-5 mb-3">Why Choose AgriMarket?</h3>
      <ul>
        <li>Supporting local farmers and communities.</li>
        <li>Ensuring product quality and authenticity.</li>
        <li>Transparent pricing with no middlemen.</li>
        <li>Environmentally conscious and sustainable practices.</li>
      </ul>

      <p className="mt-5">
        Thank you for choosing AgriMarket. Together, let's grow a healthier and more sustainable future.
      </p>
    </div>
  );
};

export default About;
