import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600">
            We’d love to hear from you. Get in touch anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CONTACT INFO */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="flex items-center gap-4 mb-4">
              <FaEnvelope className="text-blue-600 text-xl" />
              <p>support@mystore.com</p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <p>New Delhi, India</p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border px-4 py-2 rounded"
              ></textarea>

              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
