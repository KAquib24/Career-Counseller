
import React from "react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using CareerMagic, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you should not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-muted-foreground">
            CareerMagic provides a platform for users to assess their skills, interests, and preferences to receive personalized career recommendations in the technology sector.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
          <p className="text-muted-foreground">
            You may be required to create an account to access certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            Our services are provided "as is" without any warranties, expressed or implied. We do not guarantee the accuracy of career recommendations, as they are based on the information you provide and general industry data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            CareerMagic shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
