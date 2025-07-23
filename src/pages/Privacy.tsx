import React from 'react';
import Layout from '../components/Layout';

const Privacy: React.FC = () => {
  return (
    <Layout
      title="Privacy Policy - Micro Freelance"
      description="Learn how Micro Freelance protects your privacy and handles your personal data."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-base-200 rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-base-content mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-base-content">
            <p className="text-base-content/70 text-lg mb-8">
              Last updated: January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                1. Introduction
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                Micro Freelance ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Personal Information
              </h3>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4 mb-4">
                <li>Register for an account</li>
                <li>Create a user profile</li>
                <li>Post a job or apply for a position</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-base-content/80 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and payments</li>
                <li>Communicating with you about your account or our services</li>
                <li>Personalizing your experience on our platform</li>
                <li>Improving our website and services</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
                <li>Sending marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4 mb-4">
                <li><strong>With other users:</strong> Profile information may be visible to other users to facilitate job matching</li>
                <li><strong>Service providers:</strong> We may share information with third-party service providers who assist us in operating our platform</li>
                <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="text-base-content/80 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes without your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                5. Data Security
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection practices</li>
                <li>Secure payment processing through trusted partners</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                6. Your Privacy Rights
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us:
              </p>
              <ul className="list-disc list-inside text-base-content/80 space-y-2 ml-4 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p className="text-base-content/80 leading-relaxed">
                You can control cookie settings through your browser preferences, but disabling cookies may affect some website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                8. Data Retention
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We may also retain information to comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-base-content mb-4">
                12. Contact Us
              </h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-base-100 rounded-lg p-4">
                <p className="text-base-content/80">
                  <strong>Email:</strong> privacy@Micro Freelance.com<br />
                  <strong>Address:</strong> 123 Business Street, Tech City, TC 12345<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Data Protection Officer:</strong> dpo@Micro Freelance.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;