import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import Help from "./Help";
import { Camera, Pen } from "lucide-react";

function Settings() {
   const [file, setFile] = useState(null);
   const [changePic, setChangePic] = useState(null);
   const { user } = useContext(AuthContext);
   const [dropdown, setDropdown] = useState(null);

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         const imageUrl = URL.createObjectURL(selectedFile);
         setFile(imageUrl);
      }
      setChangePic(selectedFile);
   };

   return (
      <div className='text-[var--(text-color)]'>
         <div>
            <div className='relative pb-10'>
               <div className='relative overflow-hidden'>
                  <img
                     className='w-full h-44 object-cover'
                     src='https://cdn.pixabay.com/photo/2023/11/09/19/36/zoo-8378189_640.jpg'
                     alt=''
                  />
                  <div className='absolute top-3 left-0 w-full z-10'>
                     <div className='flex justify-between items-center mt-2 px-4'>
                        <h3 className='text-[19px] font-semibold leading-0 text-white'>Settings</h3>
                        <Pen className='text-white w-5 h-5' />
                     </div>
                  </div>
                  <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/90 to-black/30 z-0'></div>
               </div>
               <div className='flex flex-col items-center justify-center relative mt-[-60px] z-10 bg-transparent'>
                  {/* Profile Image Container */}
                  <div className='w-[90px] h-[90px] p-[4px] rounded-full bg-white border border-gray-100 relative'>
                     {/* Profile Image */}
                     <img
                        className='w-full h-full border-white rounded-full object-cover'
                        src={file || `http://localhost:3000/uploads/avatar/${user?.avatar}`}
                        alt='Profile'
                     />

                     {/* Camera Icon & Upload Input */}
                     <div className='absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 z-10 w-[35px] h-[35px] rounded-full bg-gray-200 flex justify-center items-center shadow-md cursor-pointer'>
                        <label htmlFor='avatarUpload' className='flex justify-center items-center w-full h-full'>
                           <Camera className='w-5 h-5 text-gray-600' />
                        </label>
                        <input
                           type='file'
                           id='avatarUpload'
                           className='absolute inset-0 opacity-0 cursor-pointer'
                           accept='image/*'
                           onChange={handleFileChange} // Handle image upload
                        />
                     </div>
                  </div>

                  {/* User Info */}
                  <h3 className='text-[16px] font-semibold mt-5 mb-2'>{user.name}</h3>
                  <p className='text-green-500'>Active</p>
               </div>
            </div>
            <div className='py-5'>
               <PersonalInfo changePic={changePic} dropdown={dropdown} setDropdown={setDropdown} />
               <Security dropdown={dropdown} setDropdown={setDropdown} />
               <Help dropdown={dropdown} setDropdown={setDropdown} />
            </div>
         </div>
      </div>
   );
}

export default Settings;
