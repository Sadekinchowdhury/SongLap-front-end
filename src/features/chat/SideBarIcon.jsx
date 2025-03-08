import { MessageCircle, Heart, Users, Bell, Settings } from "lucide-react";

export const SideBarIcon = [
   {
      id: 1,
      name: "Chat",
      path: "/message",
      icon: (
         <MessageCircle className='w-10 h-10 inline-block p-3 bg-[#eff2f2] rounded-full transition duration-300 hover:bg-[#d3d8db]' />
      ),
   },
   {
      id: 2,
      name: "Favourite",
      path: "/message/favourite",
      icon: <Heart className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]' />,
   },
   {
      id: 3,
      name: "Contacts",
      path: "/message/contact",
      icon: <Users className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]' />,
   },
   {
      id: 4,
      name: "Notification",
      path: "/message/notification",
      icon: <Bell className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]' />,
   },
   {
      id: 5,
      name: "Settings",
      path: "/message/settings",
      icon: (
         <Settings className='w-10 h-10 inline-block p-3 bg-[#eff1f2] rounded-full transition duration-300 hover:bg-[#d3d8db]' />
      ),
   },
];

// Mute Icon
export const MuteIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M12 3v18c-1.1 0-2 .9-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z' />
      <path d='M14.29 9.71c.39-.39.39-1.02 0-1.41l-3.17-3.17c-.39-.39-1.02-.39-1.41 0l-3.17 3.17c-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l3.17-3.17z' />
   </svg>
);

// Unmute Icon
export const UnmuteIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M12 3v18c-1.1 0-2 .9-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2z' />
      <path d='M13.67 9.67c.39-.39.39-1.02 0-1.41l-3.17-3.17c-.39-.39-1.02-.39-1.41 0l-3.17 3.17c-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l3.17-3.17z' />
   </svg>
);

// Video Icon
export const VideoIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M22 2H2c-1.1 0-1.99.9-1.99 2L0 20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM15 12l-5 3V9l5 3z' />
   </svg>
);

// Video Off Icon
export const VideoOffIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M22 2H2c-1.1 0-1.99.9-1.99 2L0 20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM15 12l-5 3V9l5 3z' />
      <path d='M15 12l-5 3V9l5 3z' />
   </svg>
);

// Call Running Icon
export const CallRunningIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 16c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7z' />
      <path d='M12 8V4l-3 2h2v3h2V6h2l-3-2z' />
   </svg>
);

// Call End Icon
export const CallEndIcon = () => (
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
      <path d='M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 16c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7z' />
      <path d='M12 8V4l-3 2h2v3h2V6h2l-3-2z' />
   </svg>
);
