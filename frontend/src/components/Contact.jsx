import React from 'react';
import CommonBanner from './CommonBanner';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import '../assets/Css/Contact.css';

const Contact = () => {
  const [result, setResult] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    const formData = new FormData(event.target);
    const data = {
      firstname: formData.get('FirstName'),
      lastname: formData.get('LastName'),
      email: formData.get('Email'),
      phonenumber: formData.get('PhoneNumber'),
      message: formData.get('Message'),
    };

    try {
      const response = await fetch('https://healthstory.net.in/api/contact/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setResult('');
        toast.success('Form Submitted Successfully');
        event.target.reset();
      } else {
        toast.error(result.message || 'Submission Failed');
        setResult('');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error('An error occurred while submitting the form');
      setResult('');
    }
  };

  return (
    <>
      <div className="contact_component">
        <CommonBanner />
        <div className="container">
          <div className="contact_section">
            {/* FORM SECTION */}
            <div className="form_container">
              <span className="form_tag">Inquiry Form</span>
              <h2 className="form_title">Submit your question</h2>
              <form onSubmit={onSubmit} className="contact_form d-flex">
                <div className="form_group ">
                  <input name="FirstName" className='w-50' type="text" required placeholder="First Name *" />
                  <input name="LastName" className='w-50'  type="text" required placeholder="Last Name *" />
                </div>
                <div className="form_group ">
                  <input name="Email" className='w-50' type="email" required placeholder="Email Address *" />
                  <input name="PhoneNumber" className='w-50' type="tel" required placeholder="Phone Number *" />
                </div>
                <div className="form_group full">
                  <textarea name="Message" rows={6} required placeholder="Your Message *"></textarea>
                </div>
                <button type="submit">Submit Now</button>
                {result && <p className="form_status">{result}</p>}
              </form>
            </div>

            {/* ADDRESS SECTION */}
            <div className="contact_info">
              <div className="info_block">
                <h3><FaMapMarkerAlt /> Address</h3>
                <p>B-2/104B, SAFDARJUNG ENCLAVE, New Delhi-110029</p>
              </div>
              <div className="info_block">
                <h3><FaPhone /> Phone</h3>
                <ul>
                  <li><a href="tel:+91 9868866869">+91 9868866869</a></li>
                 
                </ul>
              </div>
              <div className="info_block">
                <h3><MdEmail /> Email</h3>
                <ul>
                  <li><a href="mailto:pydlifesciences@gmail.com">pydlifesciences@gmail.com</a></li>
                  
                </ul>
              </div>
            </div>
          </div>

          {/* GOOGLE MAP */}
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="450"
            loading="lazy"
            style={{ border: 0, marginTop: '40px' }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
