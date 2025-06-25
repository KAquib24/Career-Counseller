
import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">What Are Cookies</h2>
          <p className="text-muted-foreground">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
          <p className="text-muted-foreground mb-3">
            CareerMagic uses cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To enable certain functions of the website</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable authentication and session management</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Types of Cookies We Use</h2>
          <p className="text-muted-foreground mb-3">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Essential cookies:</strong> These are necessary for the website to function properly.</li>
            <li><strong>Preference cookies:</strong> These allow the website to remember choices you make.</li>
            <li><strong>Analytics cookies:</strong> These help us understand how visitors interact with our website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How to Manage Cookies</h2>
          <p className="text-muted-foreground">
            Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
