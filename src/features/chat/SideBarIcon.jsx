import { MessageCircle, Heart, Users, Bell, Settings } from "lucide-react";

// Message Left Sidebar all icons

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
