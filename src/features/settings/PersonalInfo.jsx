import { ChevronDown, User } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const PersonalInfo = ({ dropdown, setDropdown, changePic }) => {
   const { user, setUser } = useContext(AuthContext);
   const isOpen = dropdown === "personal";
   const [name, setName] = useState(user?.name || "");

   const url = `http://localhost:3000/users/profile/update/${user?._id}`;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);

      if (changePic) {
         formData.append("avatar", changePic);
      }

      try {
         const response = await fetch(url, {
            method: "PUT",

            credentials: "include",

            body: formData,
         });

         const result = await response.json();

         setUser(result.updatedUser);
         if (response.ok) {
            toast.success("Profile Updated Successfully");
         }
      } catch (error) {
         alert("Error updating profile", error);
      }
   };

   return (
      <>
         <div
            onClick={() => setDropdown(isOpen ? "" : "personal")} // Toggle logic
            className='flex items-center py-5 px-4  justify-between cursor-pointer text-[var(--text-color)]'>
            <div className='flex items-center'>
               <User className='w-5 h-5 mr-3 text-blue-500' />
               <h5>Personal Info</h5>
            </div>
            <ChevronDown className={`w-5 h-5 mr-3 text-blue-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
         </div>
         <div className={`overflow-hidden px-4 transition-all duration-300 ${isOpen ? "h-[300px]" : "h-0"}`}>
            <form onSubmit={handleSubmit} className='space-y-4'>
               <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  className='border p-2 rounded w-full placeholder:text-[var(--text-color)] text-[var(--text-color)]'
               />
               <input
                  type='email'
                  value={user?.email}
                  placeholder='Email'
                  readOnly
                  disabled
                  className='border p-2 rounded w-full placeholder:text-[var(--text-color)] text-[var(--text-color)] '
               />
               <input
                  type='text'
                  value={user?.mobile}
                  placeholder='Mobile'
                  readOnly
                  disabled
                  className='border p-2 rounded w-full placeholder:text-[var(--text-color)] text-[var(--text-color)] '
               />

               <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                  Update Profile
               </button>
            </form>
         </div>
      </>
   );
};

export default PersonalInfo;
