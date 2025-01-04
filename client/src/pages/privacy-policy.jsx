import React from "react";

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm mb-6">Last updated: [Current Date]</p>

      <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Nature Spicy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
      <p className="mb-4">We collect information that you provide directly to us, including:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Name, email address, phone number</li>
        <li>Billing and shipping address</li>
        <li>Payment information</li>
        <li>Order history</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To process and fulfill your orders</li>
        <li>To communicate with you about orders and services</li>
        <li>To send promotional communications (if opted in)</li>
        <li>To improve our services</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
      <p className="mb-4">
        We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist in our operations.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your personal information.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your browsing experience and analyze website traffic.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. No Cancellation & Refund Policy</h2>
      <p className="mb-4">
        Please note that Nature Spicy does not offer cancellations or refunds once an order is placed. All sales are final.
      </p>

      <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
      <p className="mb-4">
        For questions about this Privacy Policy, please contact us at:
        <br />
        Email: info@naturespicy.com
      </p>
    </div>
  );
}

export default PrivacyPolicy;
