import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/Css/Authform.css';

const ShippingPolicy = () => {
    return (
        <>
            <div className='privacy_container'>
                <div className="container">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link to='/'>Home</Link></li>/&nbsp;
                            <li>Shipping Policy</li>
                        </ul>
                    </div>

                    <div className="privacy_inner_content">
                        <div className="title">
                            <h4> SHIPPING POLICY </h4>
                        </div>
                        <div className="common_para">
                            <p>At Health Story, we are committed to delivering your plant-based protein powders and vegan multivitamins safely and efficiently. This Shipping Policy outlines how we handle deliveries and what you can expect after placing an order with us.</p>
                        </div>

                        <div className="title">
                            <h4>1. Shipping Locations</h4>
                        </div>
                        <div className="common_para">
                            <p>We currently ship across India. For international shipping, please contact our support team at [Insert Email]. We are working on expanding our reach globally soon.</p>
                        </div>

                        <div className="title">
                            <h4>2. Order Processing Time</h4>
                        </div>
                        <div className="common_para">
                            <p>Orders are processed within 1–2 business days (excluding Sundays and public holidays).</p>
                            <p>You will receive an order confirmation email followed by a shipping confirmation with tracking details once your order is dispatched.</p>
                        </div>

                        <div className="title">
                            <h4>3. Estimated Delivery Time</h4>
                        </div>
                        <div className="common_para">
                            <p>Metro cities: 2–4 business days</p>
                            <p>Tier 2 & Tier 3 cities: 3–6 business days</p>
                            <p>Remote/rural areas: Up to 7–10 business days</p>
                            <p>Delivery timelines may vary due to factors beyond our control, such as weather or courier delays.</p>
                        </div>

                        <div className="title">
                            <h4>4. Shipping Charges</h4>
                        </div>
                        <div className="common_para">
                            <p>Free Shipping on all prepaid orders above ₹499.</p>
                            <p>A nominal shipping fee of ₹49 may apply on orders below ₹499.</p>
                            <p>Cash on Delivery (COD) orders may include an additional handling fee.</p>
                            <p>Exact charges are displayed at checkout.</p>
                        </div>

                        <div className="title">
                            <h4>5. Delivery Issues</h4>
                        </div>
                        <div className="common_para">
                            <p>If your package is delayed, lost, or arrives damaged:</p>
                            <p>Contact us within 48 hours of delivery with your order ID and photos if needed.</p>
                            <p>We will coordinate with our delivery partners to resolve the issue quickly, and offer refunds or replacements where appropriate.</p>
                        </div>

                        <div className="title">
                            <h4>6. Undelivered Packages</h4>
                        </div>
                        <div className="common_para">
                            <p>In cases where the delivery is unsuccessful due to incorrect address, unavailability, or refusal to accept:</p>
                            <p>Our team will attempt redelivery once.</p>
                            <p>If still unsuccessful, the package will be returned to our warehouse.</p>
                            <p>Refunds (if applicable) will be processed after deducting shipping and return logistics costs.</p>
                        </div>

                        <div className="title">
                            <h4> Contact </h4>
                        </div>
                        <div className="common_para">
                            <p>For any shipping-related queries, reach out to us at <Link to="mailto:pydlifesciences@gmail.com">pydlifesciences@gmail.com</Link> or call us at <Link to="tel:+91 9868866869">+91 9868866869</Link>. <br /><b>Address:B-2/104B, SAFDARJUNG ENCLAVE, New Delhi-110029.</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingPolicy;
