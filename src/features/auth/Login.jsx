import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
   const { setUser } = useContext(AuthContext);
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      email_or_phone: "",
      password: "",
   });

   const handlData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const submitData = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const result = await response.json();
         if (result.user) {
            setUser(result.user);
            toast.success("Successfully LogIn");
            navigate("/message", { replace: true });
         }
      } catch (err) {
         console.error("Error during login:", err);
      }
   };

   return (
      <div className='flex justify-center items-center min-h-[100vh] py-7 md:py-10 px-5 md:px-10'>
         <div className=''>
            <form onSubmit={submitData} className=' border border-gray-300 p-5 md:p-10 rounded-2xl'>
               <h4 className='text-3xl font-semibold pb-5 md:pb-7 text-center'>Login Here</h4>

               <div className='py-4'>
                  {" "}
                  <label htmlFor='' className='text-[18px] leading-[28px] font-semibold text-[var(--text-color)]'>
                     Email Or Phone
                  </label>
                  <input
                     name='email_or_phone'
                     placeholder='Your Email Or Phone ...'
                     className='text-[16px] mt-2 placeholder:text-[var(--text-color)] w-full h-10 rounded-sm outline-none bg-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                     type='text'
                     value={formData.email_or_phone}
                     onChange={handlData}
                  />
               </div>
               <div className='py-4'>
                  <label htmlFor='' className='text-[18px] leading-[28px] font-semibold text-[var(--text-color)]'>
                     Password
                  </label>
                  <input
                     name='password'
                     placeholder='Your Password ...'
                     className='text-[16px] mt-2 placeholder:text-[var(--text-color)] w-full h-10 rounded-sm outline-none bg-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                     type='password'
                     value={formData.password}
                     onChange={handlData}
                  />
               </div>
               <button
                  type='submit'
                  className='border rounded-sm border-gray-200 py-2 bg-blue-500 hover:bg-gray-300 transition duration-300 text-[16px] font-semibold px-8 flex justify-self-center mt-2 md:mt-5'>
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
