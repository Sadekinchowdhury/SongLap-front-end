import { motion } from "framer-motion";

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
        >
          Support <span className="text-blue-600">Center</span>
        </motion.h1>

        {/* FAQ Section */}
        <section className="mb-12 pt-4 md:pt-7">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl font-semibold mb-6 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-medium">How to use Songlap?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Songlap allows users to chat with strangers and make new friends through text, audio, and video calls. Simply log in to start chatting!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-medium">How secure is Songlap?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize privacy. All messages and calls are encrypted, ensuring secure conversations between users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-medium">Can I use Songlap on mobile?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, Songlap is fully responsive and works seamlessly on mobile devices. Download the app to get started on the go!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-medium">How do I report an issue?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you encounter any issues, please visit the "Contact Support" section below to get in touch with our support team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="md:py-20 py-5">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-3xl font-semibold mb-6 text-center"
          >
            Contact Support
          </motion.h2>

          <form className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        {/* Support Team Section */}
        <section className="mt-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-3xl font-semibold mb-6 text-center"
          >
            Meet Our Support Team
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.7 }}
              className="max-w-xs text-center"
            >
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Support Team Member"
                className="rounded-full mb-4 mx-auto w-24 h-24 object-cover"
              />
              <h3 className="text-xl font-medium">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-300">Lead Support Specialist</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.9 }}
              className="max-w-xs text-center"
            >
              <img
                src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Support Team Member"
                className="rounded-full mb-4 mx-auto w-24 h-24 object-cover"
              />
              <h3 className="text-xl font-medium">Jane Smith</h3>
              <p className="text-gray-600 dark:text-gray-300">Support Engineer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.1 }}
              className="max-w-xs text-center"
            >
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Support Team Member"
                className="rounded-full mb-4 mx-auto w-24 h-24 object-cover"
              />
              <h3 className="text-xl font-medium">Mark Wilson</h3>
              <p className="text-gray-600 dark:text-gray-300">Technical Support</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
