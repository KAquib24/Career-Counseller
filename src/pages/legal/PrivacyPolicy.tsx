
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-muted-foreground">
            At CareerMagic, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="text-muted-foreground mb-3">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Create an account or profile</li>
            <li>Complete the career assessment quiz</li>
            <li>Contact our customer support</li>
            <li>Sign up for our newsletter</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Provide and maintain our services</li>
            <li>Generate personalized career recommendations</li>
            <li>Improve and optimize our platform</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Cookies and Tracking Technologies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at privacy@careermagic.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
