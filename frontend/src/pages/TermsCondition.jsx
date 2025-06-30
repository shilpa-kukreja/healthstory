import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Css/Authform.css';

const TermsCondition = () => {
  return (
    <div className='privacy_container termsConditons'>
      <div className="container">
        <div className="breadcrumbs">
          <ul>
            <li><Link to="/">Home</Link></li>&nbsp;/&nbsp;
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="privacy_inner_content">
          <div className="title">
            <h4>Health Story Terms & Conditions</h4>
          </div>
          <div className="common_para">
            <p>
              Welcome to Health Story, your trusted partner in plant-based wellness. These Terms and Conditions ("Terms") govern your use of our website and services, including purchases of our vegan protein powders and multivitamins. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our site or services.
            </p>

            <h5>1. Use of Our Website</h5>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Transmit unauthorized or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the site’s functionality or security</li>
              <li>Use the site for fraudulent or malicious purposes</li>
            </ul>
            <p>
              Health Story reserves the right to refuse service, suspend accounts, or cancel orders if we suspect violation of these Terms.
            </p>

            <h5>2. Account Registration</h5>
            <p>To access certain features or place orders, you may be required to create an account. By registering:</p>
            <ul>
              <li>You agree to provide accurate, current, and complete information.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You accept responsibility for all activities under your account.</li>
            </ul>
            <p>We reserve the right to suspend or terminate your account if any information is inaccurate, misleading, or violates our policies.</p>

            <h5>3. Products and Orders</h5>
            <p>We strive to provide accurate product descriptions, images, and pricing. However, we do not guarantee that all information is error-free.</p>
            <strong>a. Pricing and Availability:</strong>
            <ul>
              <li>All prices are in INR and inclusive of applicable taxes unless stated otherwise.</li>
              <li>Availability of products may change without notice.</li>
              <li>We reserve the right to limit quantities and discontinue products at any time.</li>
            </ul>
            <strong>b. Order Acceptance:</strong>
            <p>Your order is considered accepted once you receive a confirmation email. Health Story reserves the right to cancel or refuse any order for reasons including:</p>
            <ul>
              <li>Product unavailability</li>
              <li>Pricing or typographical errors</li>
              <li>Suspicious activity or fraud concerns</li>
            </ul>

            <h5>4. Payment</h5>
            <p>We accept payment through secure third-party payment gateways. By submitting payment, you warrant that:</p>
            <ul>
              <li>You are authorized to use the provided payment method</li>
              <li>The payment information is accurate and complete</li>
            </ul>
            <p>Health Story is not responsible for any unauthorized use of your payment method.</p>

            <h5>5. Shipping and Delivery</h5>
            <p>We aim to deliver your orders swiftly and securely. Delivery times are estimates and may vary based on location, weather, or logistics issues.</p>
            <strong>a. Shipping Charges:</strong>
            <p>Shipping fees, if applicable, will be displayed at checkout.</p>
            <strong>b. Delays:</strong>
            <p>Health Story is not liable for delays beyond our control but we will work to resolve them promptly.</p>

            <h5>6. Returns and Refunds</h5>
            <p>We want you to be fully satisfied with your purchase. If you’re not, you may be eligible for a return or refund.</p>
            <strong>a. Return Eligibility:</strong>
            <ul>
              <li>Products must be unopened, unused, and in original packaging</li>
              <li>Requests must be made within 7 days of delivery</li>
              <li>Health and hygiene products are non-returnable once opened</li>
            </ul>
            <strong>b. Refunds:</strong>
            <p>Approved refunds will be processed to your original payment method within 7–10 business days.</p>
            <p>Please refer to our <Link to="/refund-policy">Refund Policy Page</Link> for more details.</p>

            <h5>7. Intellectual Property</h5>
            <p>All content on our website — including product images, branding, logos, text, design, and graphics — is the intellectual property of Health Story or its licensors. You may not:</p>
            <ul>
              <li>Reproduce or distribute any content without written permission</li>
              <li>Use our trademarks or logos without authorization</li>
              <li>Reverse-engineer or attempt to extract our website's source code</li>
            </ul>
            <p>Unauthorized use may result in legal action.</p>

            <h5>8. Disclaimer of Warranties</h5>
            <p>All our products are made with plant-based, natural ingredients and designed with care. However:</p>
            <ul>
              <li>We do not guarantee medical results — our products are not intended to diagnose, treat, cure, or prevent any disease.</li>
              <li>Information on our website is for general wellness and educational purposes only and should not substitute for professional medical advice.</li>
              <li>By using our products, you agree to consult a healthcare provider if you have any medical conditions, allergies, or are on medication.</li>
            </ul>

            <h5>9. Limitation of Liability</h5>
            <p>To the maximum extent permitted by law, Health Story and its affiliates shall not be liable for:</p>
            <ul>
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Product misuse or failure to follow usage guidelines</li>
            </ul>
            <p>Our total liability shall not exceed the amount paid by you for the specific product or service in question.</p>

            <h5>10. User-Generated Content</h5>
            <p>You may submit reviews, comments, or testimonials. By doing so:</p>
            <ul>
              <li>You grant us a non-exclusive, royalty-free license to use, publish, and display your content.</li>
              <li>You confirm that the content is your own and does not violate any third-party rights.</li>
              <li>We reserve the right to edit or remove inappropriate or misleading content.</li>
            </ul>

            <h5>11. External Links</h5>
            <p>Our site may contain links to third-party websites. These are provided for your convenience. We are not responsible for the content, terms, or privacy practices of these sites. Please review their policies before engaging with them.</p>

            <h5>12. Termination</h5>
            <p>We may suspend or terminate your access to our site or services at any time, without prior notice, if you violate these Terms.</p>

            <h5>Contact</h5>
            <p>
              For any questions about our Terms & Conditions, please contact us at <Link to="mailto:pydlifesciences@gmail.com">pydlifesciences@gmail.com</Link> or call us at <Link to="tel:+91 9868866869">+91 9868866869</Link>.<br />
              <b>Contact Address:</b>  B-2/104B, SAFDARJUNG ENCLAVE, New Delhi-110029
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
