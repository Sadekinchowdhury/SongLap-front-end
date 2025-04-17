import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
   useEffect(() => {
      // Particle animation logic (same as yours)
      const container = document.querySelector(".circle-container");
      const particleNum = 100;
      const particleBaseSize = 8;

      for (let i = 0; i < particleNum; i++) {
         const circleWrapper = document.createElement("div");
         const circle = document.createElement("div");

         const size = Math.floor(Math.random() * particleBaseSize) + 4;
         const startY = Math.floor(Math.random() * 10) + 100;
         const moveDuration = 28000 + Math.random() * 9000;
         const delay = Math.random() * 37000;

         circleWrapper.className = "circle-wrapper";
         circle.className = "circle";

         circleWrapper.style.width = `${size}px`;
         circleWrapper.style.height = `${size}px`;
         circleWrapper.style.animation = `move-frames-${i} ${moveDuration}ms linear ${delay}ms infinite`;

         const keyframes = `
            @keyframes move-frames-${i} {
               from {
                  transform: translate3d(${Math.random() * 100}vw, ${startY}vh, 0);
               }
               to {
                  transform: translate3d(${Math.random() * 100}vw, -${startY + Math.random() * 30}vh, 0);
               }
            }
         `;
         const styleSheet = document.styleSheets[0];
         styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

         circle.style.animationDelay = `${Math.random() * 4000}ms`;
         circleWrapper.appendChild(circle);
         container?.appendChild(circleWrapper);
      }
   }, []);

   return (
      <div className='relative  '>
         <div className='container'>
            <img src='/src/assets/bg.png' alt='' className='background' />
            <div className='circle-container'></div>
         </div>

         <div className='max-w-[1200px] mx-auto block md:flex justify-between items-center pt-2 md:pt-16 lg:pt-24 px-6 text-center md:text-left'>
            {/* Left Text Section */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className='text-4xl md:text-6xl leading-[1.2] font-bold text-[var(--text-color)]'>
                  Chat with <span className='text-blue-600'>Strangers</span>, <br /> Make New Friends!
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className='text-lg leading-relaxed text-[var(--text-color)] mt-4'>
                  Discover a random chat platform to meet new friends, <br />
                  connect with people, and chat with strangers <br />
                  from all over the globe!
               </motion.p>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className='flex items-center md:justify-start justify-center mt-6'>
                  
                  <Link
                     to={"/message"}
                     className='mr-4 border border-white rounded-3xl px-[40px] py-3 text-white text-[20px] font-semibold  bg-blue-600 hover:bg-blue-700 transition'>
                     {/* Start Chat Icon */}
                     <svg
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                        height='28'
                        width='28'
                        xmlns='http://www.w3.org/2000/svg'
                        className='inline mr-2'>
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                        />
                     </svg>
                     Start Chat
                  </Link>

                  <Link
                     to={"/message"}
                     className='border rounded-3xl px-[40px] py-3 text-[var(--text-color)] text-[20px] font-semibold hover:border-[1px solid] transition'>
                     {/* Video Call Icon */}
                     <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        height='28'
                        width='28'
                        xmlns='http://www.w3.org/2000/svg'
                        className='mr-2 inline'>
                        <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
                     </svg>
                     Video Call
                  </Link>
               </motion.div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
               className='pt-3 px-5 mt-7 md:mt-0 relative'
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.7, duration: 0.8 }}>
               <img src='/src/assets/call.png' alt='' className='w-full max-w-auto' />
               <img
                  className='absolute w-[145px] md:w-[50%] left-[-5%] md:left-[-30%] top-[15%] border rounded-[45px] border-[var(--primary)]'
                  src='/src/assets/notificaiton.png'
                  alt=''
               />
               <img
                  className='absolute w-[145px] md:w-[50%] right-[-5%] md:right-[-30%] bottom-[15%] border rounded-[45px] border-[var(--primary)]'
                  src='/src/assets/message_notification.CZq_4fgA_Z16oW1S.png'
                  alt=''
               />
            </motion.div>
         </div>
      </div>
   );
};

export default Hero;
