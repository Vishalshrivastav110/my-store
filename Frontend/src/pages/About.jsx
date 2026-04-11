import { FaTruck, FaLock, FaSmile } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">About MyStore</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MyStore is a modern e-commerce platform where you can shop
            high-quality products at affordable prices.
          </p>
        </div>

        {/* INFO SECTION */}
        <div className="bg-white rounded shadow p-8 mb-10">
          <p className="text-gray-700 leading-relaxed text-center">
            We started MyStore with a simple goal — to make online shopping
            easy, secure and enjoyable for everyone.  
            Our platform brings together trusted brands, fast delivery and
            customer-first support.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Quick and reliable delivery at your doorstep.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <FaLock className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">
              100% safe and secure payment options.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <FaSmile className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">
              Satisfaction and trust are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
