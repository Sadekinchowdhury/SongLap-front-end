import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0 },
};

const About = () => {
   return (
      <section className='min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-12'>
         <div className='max-w-6xl mx-auto'>
            {/* Title */}
            <motion.div
               className='text-center mb-12'
               variants={fadeIn}
               initial='hidden'
               animate='visible'
               transition={{ duration: 0.6 }}>
               <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>
                  About <span className='text-blue-600'>Songlap</span>
               </h1>
               <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300'>
                  Real-time chat, voice, and video calling — all in one powerful app.
               </p>
            </motion.div>

            {/* Main Grid */}
            <div className='grid md:grid-cols-2 gap-12 items-center'>
               {/* Text Side */}
               <motion.div
                  className='space-y-6'
                  variants={fadeIn}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}>
                  <h2 className='text-2xl font-bold'>Our Mission</h2>
                  <p className='text-gray-700 dark:text-gray-400'>
                     Songlap was built with a simple goal: to make communication effortless and real. Whether you're catching up
                     with friends, collaborating with your team, or just staying connected, Songlap makes it smooth and reliable.
                  </p>

                  <h2 className='text-2xl font-bold'>Why Songlap?</h2>
                  <ul className='list-disc list-inside text-gray-700 dark:text-gray-400'>
                     <li>Seamless real-time messaging</li>
                     <li>Crystal-clear audio and video calls</li>
                     <li>Mobile-first and fully responsive</li>
                     <li>Secure and private conversations</li>
                  </ul>
               </motion.div>

               {/* Image Side */}
               <motion.div
                  className='flex justify-center'
                  variants={fadeIn}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}>
                  <img src='https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg?auto=compress&cs=tinysrgb&w=400' alt='About Songlap' className='w-full max-w-sm rounded-2xl shadow-xl' />
               </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div
               className='mt-16 text-center'
               variants={fadeIn}
               initial='hidden'
               whileInView='visible'
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}>
               <h3 className='text-xl md:text-2xl font-semibold mb-4'>Built for the world. Designed for you.</h3>
               <p className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                  We’re on a mission to make human connection easier, no matter where you are. Join thousands of users who trust
                  Songlap every day.
               </p>
            </motion.div>
         </div>
      </section>
   );
};

export default About;
