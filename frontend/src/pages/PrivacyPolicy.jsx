import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Css/Authform.css';

const PrivacyPolicy = () => {
  return (
    <div className='privacy_container'>
      <div className='container'>
        <div className='breadcrumbs'>
          <ul>
            <li><Link to='/'>Home</Link></li>/&nbsp;
            <li>Privacy & Policy</li>
          </ul>
        </div>

        <div className='privacy_inner_content'>
          <div className='title'>
            <h4>Privacy Policy</h4>
          </div>
          <div className='common_para'>
            <p>Welcome to Health Story. We value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and interact with our plant-based health products.</p>

            <p>Please read this policy carefully. By accessing or using our website, you agree to the practices described in this Privacy Policy.</p>

            <h4>1. Information We Collect</h4>
            <p>We collect both personal and non-personal information when you interact with our site or make a purchase. The types of information we collect include:</p>

            <p><strong>a. Personal Information:</strong></p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Shipping and billing address</li>
              <li>Phone number</li>
              <li>Payment information (processed securely via third-party services)</li>
              <li>Account login credentials (if you create an account)</li>
            </ul>

            <p><strong>b. Non-Personal Information:</strong></p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Device type</li>
              <li>Date and time of access</li>
              <li>Site usage statistics and behavior</li>
            </ul>

            <h4>2. How We Use Your Information</h4>
            <p>We use your data for the following purposes:</p>
            <ul>
              <li>To process your orders and deliver our vegan products</li>
              <li>To personalize your experience on our site</li>
              <li>To provide customer support</li>
              <li>To send order confirmations and updates</li>
              <li>To inform you of new products, promotions, or updates</li>
              <li>To improve our website, marketing strategies, and product offerings</li>
            </ul>
            <p>We may use non-personal data for analytical and research purposes to enhance user experience.</p>

            <h4>3. How We Share Your Information</h4>
            <p>We never sell your personal data. We may share your information with third parties in the following cases:</p>

            <p><strong>a. Service Providers:</strong><br />
              We work with trusted partners (e.g., payment gateways, shipping services, marketing platforms) to operate our business. These partners are required to protect your information.</p>

            <p><strong>b. Legal Obligations:</strong><br />
              We may disclose your information if required by law or in response to valid legal processes.</p>

            <p><strong>c. Business Transfers:</strong><br />
              If we undergo a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</p>

            <h4>4. Your Data Protection Rights</h4>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your data (“right to be forgotten”)</li>
              <li>Restrict or object to data processing in certain cases</li>
              <li>Withdraw consent at any time for future data collection</li>
            </ul>
            <p>To exercise any of these rights, contact us at <Link to="mailto:pydlifesciences@gmail.com">pydlifesciences@gmail.com</Link>.</p>

            <h4>5. Cookies and Tracking Technologies</h4>
            <p>Our website uses cookies and similar technologies to enhance your browsing experience. Cookies help us remember your preferences, analyze traffic, and deliver targeted content.</p>
            <p>You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain parts of our site.</p>

            <h4>6. Email Marketing and Communications</h4>
            <p>If you subscribe to our newsletters or updates, we may send you emails about product news, promotions, and wellness tips. You can opt out at any time by clicking the "unsubscribe" link in our emails or contacting us directly.</p>
            <p>We respect your inbox — no spam, ever.</p>

            <h4>7. Data Storage and Security</h4>
            <p>We implement strict security protocols to protect your information, including:</p>
            <ul>
              <li>SSL (Secure Socket Layer) encryption</li>
              <li>Secure payment processing via trusted gateways</li>
              <li>Firewall protection</li>
              <li>Limited access to personal data within our team</li>
            </ul>
            <p>However, no method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.</p>

            <h4>8. Third-Party Links</h4>
            <p>Our website may contain links to other websites for your convenience or as part of affiliate marketing. We are not responsible for the content or privacy practices of those websites. We encourage you to read their privacy policies before providing any personal data.</p>

            <h4>9. Children’s Privacy</h4>
            <p>Our website and products are not intended for individuals under the age of 13. We do not knowingly collect personal data from children. If you believe we have received data from a minor without parental consent, please contact us so we can delete the information.</p>

            <h4>10. International Data Transfers</h4>
            <p>If you are visiting our site from outside India, your data may be transferred to, stored, and processed in countries where our servers are located, including the United States or Europe. By using our services, you consent to the transfer of your information across international borders.</p>

            <h4>11. Policy Updates</h4>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We encourage you to check this page periodically. Your continued use of our services after changes have been posted will signify your acceptance of those updates.</p>

            <p><strong>Thank you for trusting Health Story with your wellness journey.</strong><br />
              We’re committed to protecting your health and your privacy — naturally and responsibly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
