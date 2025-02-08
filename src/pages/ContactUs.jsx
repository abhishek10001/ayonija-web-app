import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Get in touch with us for any inquiries, collaborations, or support.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Office</h2>
          <p className="mt-4 text-gray-600">123 Pharma Street, Suite 500</p>
          <p className="text-gray-600">New York, NY 10001, USA</p>
          <p className="mt-4 text-gray-600">Email: contact@pinnaclelifescience.com</p>
          <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-600">Business Hours: Mon-Fri, 9 AM - 6 PM</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Send Us a Message</h2>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Our Location</h2>
        <div className="mt-6 w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full border-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509368!2d144.95565131531578!3d-37.81732397975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c17b455d6e42!2sYour%20Business%20Location!5e0!3m2!1sen!2sus!4v1633079469123!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
