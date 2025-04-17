import { motion } from "framer-motion";

const blogPosts = [
   {
      id: 1,
      title: "How Songlap is Changing the Way We Communicate",
      excerpt:
         "From real-time messaging to high-quality video calls, explore how Songlap is making digital conversations smoother and smarter.",
      date: "April 15, 2025",
      author: "Team Songlap",
      image: "https://images.pexels.com/photos/6937858/pexels-photo-6937858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   },
   {
      id: 2,
      title: "Top 5 Features of Songlap You Should Try Today",
      excerpt: "Discover the hidden gems and powerful tools inside Songlap to elevate your communication experience.",
      date: "April 10, 2025",
      author: "Sadekin Chowdhury",
      image: "https://images.pexels.com/photos/6147016/pexels-photo-6147016.jpeg?auto=compress&cs=tinysrgb&w=400",
   },
   {
      id: 3,
      title: "The Future of Voice & Video Chat in 2025",
      excerpt: "See where the world of real-time communication is heading and how Songlap is preparing for it.",
      date: "April 5, 2025",
      author: "Guest Writer",
      image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&cs=tinysrgb&w=400",
   },
];

const Blog = () => {
   return (
      <section className='min-h-screen px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
         <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-12'>
               <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className='text-4xl md:text-5xl font-extrabold mb-4'>
                  Our <span className='text-blue-600'>Blog</span>
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className='text-lg text-gray-600 dark:text-gray-300'>
                  Explore insights, updates, and inspiration from the Songlap team.
               </motion.p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
               {blogPosts.map((post, index) => (
                  <motion.div
                     key={post.id}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.2 }}
                     viewport={{ once: true }}
                     className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300'>
                     <img src={post.image} alt={post.title} className='w-full h-52 object-cover' />
                     <div className='p-6'>
                        <h2 className='text-xl font-bold mb-2 hover:text-blue-600 transition'>{post.title}</h2>
                        <p className='text-gray-600 dark:text-gray-400 mb-4'>{post.excerpt}</p>
                        <div className='text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center'>
                           <span>{post.author}</span>
                           <span>{post.date}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Blog;
