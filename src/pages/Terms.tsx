import React from 'react';
import Layout from '../components/Layout';

const Terms: React.FC = () => {
  return (
    <Layout
      title="Terms of Service - Micro Freelance"
      description="Read Micro Freelance's terms of service and user agreement."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-base-200 rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-base-content mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-base-content">
            <p className="text-base-content/70 text-lg mb-8">
              Last updated: January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                By accessing and using Micro Freelance ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                These Terms of Service ("Terms") govern your use of our website located at Micro Freelance.com (the "Service") operated by Micro Freelance ("us", "we", or "our").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                2. Description of Service
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                Micro Freelance is an online marketplace that connects job providers with freelancers and job seekers. Our platform allows users to:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li>Post job opportunities and project requirements</li>
                <li>Browse and apply for available positions</li>
                <li>Communicate with potential employers or freelancers</li>
                <li>Manage their professional profiles and portfolios</li>
                <li>Process payments for completed work</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                3. User Accounts and Registration
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                To access certain features of the Service, you must register for an account. When you register for an account, you may be required to provide us with some information about yourself, such as your name, email address, or other contact information.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                You agree that the information you provide to us is accurate and that you will keep it accurate and up-to-date at all times. You are solely responsible for maintaining the confidentiality of your account and password.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                4. User Conduct and Responsibilities
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                As a user of Micro Freelance, you agree to:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4 mb-4">
                <li>Provide accurate and truthful information in your profile and job postings</li>
                <li>Treat all users with respect and professionalism</li>
                <li>Complete work as agreed upon in contracts</li>
                <li>Pay for services rendered in a timely manner</li>
                <li>Not engage in fraudulent or deceptive practices</li>
                <li>Not post inappropriate, offensive, or illegal content</li>
              </ul>
              <p className="text-base-content/80 leading-relaxed">
                Violation of these terms may result in suspension or termination of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                5. Payment Terms
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                Micro Freelance facilitates payments between job providers and freelancers. We charge a service fee for successful transactions. Payment terms include:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li>Service fees are clearly disclosed before transaction completion</li>
                <li>Payments are processed securely through our payment partners</li>
                <li>Refunds are handled according to our refund policy</li>
                <li>Users are responsible for any applicable taxes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                6. Intellectual Property Rights
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Micro Freelance and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                Users retain ownership of the content they create and share on the platform, but grant Micro Freelance a license to use, display, and distribute such content as necessary to provide the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                7. Privacy and Data Protection
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                In no event shall Micro Freelance, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                9. Termination
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                11. Contact Information
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-base-100 rounded-lg p-4 mt-4">
                <p className="text-base-content/80">
                  <strong>Email:</strong> legal@Micro Freelance.com<br />
                  <strong>Address:</strong> 123 Business Street, Tech City, TC 12345<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;