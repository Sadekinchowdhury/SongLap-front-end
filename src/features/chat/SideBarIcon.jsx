export const SideBarIcon = [
   {
      name: "Chat",
      path: "/message",

      icon: (
         <svg
            width='45px'
            height='45px'
            viewBox='0 0 24 24'
            fill='var(--text-color)'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
            <g>
               <path
                  d='M28 2H4C2.346 2 1 3.346 1 5v16c0 1.654 1.346 3 3 3h3v5a1.001 1.001 0 0 0 1.625.781L15.851 24H28c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zM16 16H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2zm8-4H8a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2z'
                  fill='#000000'
                  opacity='1'
               />
            </g>
         </svg>
      ),
   },
   {
      name: "Favourite",
      path: "/message/favourite",
      icon: (
         <svg
            width='45px'
            height='45px'
            viewBox='0 0 24 24'
            fill='var(--text-color)'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
            <path d='M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z' />
         </svg>
      ),
   },
   {
      name: "Contacts",
      path: "/message/contact",

      icon: (
         <svg
            width='45px'
            height='45px'
            viewBox='0 0 24 24'
            fill='var(--text-color)'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
            <circle cx='12' cy='7' r='4' />
            <path d='M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2' />
         </svg>
      ),
   },
   {
      name: "Notification",
      path: "/message/notificatioin",
      icon: (
         <svg
            width='45px'
            height='45px'
            viewBox='0 0 24 24'
            fill='var(--text-color)'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
            <path d='M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 0 1-3.46 0' />
         </svg>
      ),
   },
   {
      name: "Settings",
      path: "/message/settings",

      icon: (
         <svg
            width='45px'
            height='45px'
            viewBox='0 0 24 24'
            fill='var(--text-color)'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='p-[14px] inline bg-[#eff1f2] rounded-[50%] transition duration-300 hover:bg-[#d3d8db]'>
            <g>
               <path
                  d='M13.12 24h-2.24a1.498 1.498 0 0 1-1.486-1.32l-.239-1.876a9.45 9.45 0 0 1-1.374-.569l-1.494 1.161a1.492 1.492 0 0 1-1.985-.126l-1.575-1.575a1.488 1.488 0 0 1-.122-1.979l1.161-1.495a9.232 9.232 0 0 1-.569-1.374l-1.88-.239A1.501 1.501 0 0 1 0 13.12v-2.24c0-.757.567-1.396 1.32-1.486l1.876-.239a9.45 9.45 0 0 1 .569-1.374l-1.16-1.494a1.49 1.49 0 0 1 .127-1.986l1.575-1.575a1.489 1.489 0 0 1 1.979-.122L7.78 3.766a9.416 9.416 0 0 1 1.375-.569l.239-1.88C9.484.567 10.123 0 10.88 0h2.24c.757 0 1.396.567 1.486 1.32l.239 1.876c.478.155.938.346 1.375.569l1.494-1.161a1.49 1.49 0 0 1 1.985.127l1.575 1.575c.537.521.591 1.374.122 1.979L20.235 7.78c.224.437.415.897.569 1.374l1.88.239A1.5 1.5 0 0 1 24 10.88v2.24c0 .757-.567 1.396-1.32 1.486l-1.876.239a9.45 9.45 0 0 1-.569 1.374l1.161 1.494a1.49 1.49 0 0 1-.127 1.985l-1.575 1.575a1.487 1.487 0 0 1-1.979.122l-1.495-1.161a9.232 9.232 0 0 1-1.374.569l-.239 1.88A1.5 1.5 0 0 1 13.12 24zm-5.39-4.86c.083 0 .168.021.244.063a8.393 8.393 0 0 0 1.774.736.5.5 0 0 1 .358.417l.28 2.2c.03.251.247.444.494.444h2.24a.504.504 0 0 0 .493-.439l.281-2.204a.5.5 0 0 1 .358-.417 8.393 8.393 0 0 0 1.774-.736.499.499 0 0 1 .55.042l1.75 1.36a.492.492 0 0 0 .655-.034l1.585-1.585a.495.495 0 0 0 .039-.66l-1.36-1.75a.5.5 0 0 1-.042-.55 8.393 8.393 0 0 0 .736-1.774.5.5 0 0 1 .417-.358l2.2-.28A.507.507 0 0 0 23 13.12v-2.24a.504.504 0 0 0-.439-.493l-2.204-.281a.5.5 0 0 1-.417-.358 8.393 8.393 0 0 0-.736-1.774.497.497 0 0 1 .042-.55l1.36-1.75a.49.49 0 0 0-.033-.654l-1.585-1.585a.492.492 0 0 0-.66-.039l-1.75 1.36a.5.5 0 0 1-.551.042 8.359 8.359 0 0 0-1.774-.736.5.5 0 0 1-.358-.417l-.28-2.2A.507.507 0 0 0 13.12 1h-2.24a.504.504 0 0 0-.493.439l-.281 2.204a.502.502 0 0 1-.358.418 8.356 8.356 0 0 0-1.774.735.5.5 0 0 1-.551-.041l-1.75-1.36a.49.49 0 0 0-.654.033L3.434 5.014a.495.495 0 0 0-.039.66l1.36 1.75a.5.5 0 0 1 .042.55 8.341 8.341 0 0 0-.736 1.774.5.5 0 0 1-.417.358l-2.2.28A.505.505 0 0 0 1 10.88v2.24c0 .247.193.464.439.493l2.204.281a.5.5 0 0 1 .417.358c.18.626.428 1.223.736 1.774a.497.497 0 0 1-.042.55l-1.36 1.75a.49.49 0 0 0 .033.654l1.585 1.585a.494.494 0 0 0 .66.039l1.75-1.36a.515.515 0 0 1 .308-.104z'
                  opacity='1'
                  data-original='#000000'></path>
               <path
                  d='M12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z'
                  opacity='1'
                  data-original='#000000'></path>
            </g>
         </svg>
      ),
   },
];
