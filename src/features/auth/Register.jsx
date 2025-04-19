import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      role: "user",
      terms: false,
      avatar: null,
   });

   // data handle
   const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;

      if (type === "file") {
         const file = files[0];
         if (file) {
            if (!file.type.startsWith("image/")) {
               alert("Please upload an image file.");
               return;
            }
            if (file.size > 5 * 1024 * 1024) {
               alert("File size must be less than 5MB.");
               return;
            }
            setFormData((prevData) => ({
               ...prevData,
               [name]: file,
            }));
         }
      } else if (type === "checkbox") {
         setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
         }));
      } else {
         setFormData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   // submit form
   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      // Validate required fields
      if (
         !formData.firstName ||
         !formData.lastName ||
         !formData.email ||
         !formData.password ||
         !formData.mobile ||
         !formData.terms
      ) {
         alert("Please fill out all required fields and agree to the terms.");
         setIsLoading(false);
         return;
      }

      // Create a FormData object to handle file uploads
      const formdata = new FormData();
      formdata.append("name", `${formData.firstName} ${formData.lastName}`);
      formdata.append("email", formData.email);
      formdata.append("mobile", formData.mobile);
      formdata.append("password", formData.password);
      formdata.append("role", formData.role);
      formdata.append("terms", formData.terms);
      if (formData.avatar) {
         formdata.append("avatar", formData.avatar);
      }

      try {
         const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: formdata,
         });

         const result = await response.json();

         if (result.success) {
            alert("Registration successful!");
            navigate("/login", { replace: true });

            // Reset the form after successful submission
            setFormData({
               firstName: "",
               lastName: "",
               email: "",
               password: "",
               mobile: "",
               role: "user",
               terms: false,
               avatar: null,
            });
         } else {
            alert(result.message || "Registration failed!");
         }
      } catch (error) {
         alert("An error occurred during registration. Please try again.", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div>
         <div className='flex justify-center items-center min-h-[100vh] py-7 md:py-10 px-5 md:px-10'>
            <div>
               <form onSubmit={handleSubmit} className='border border-gray-300 p-5 md:p-10 rounded-2xl'>
                  <h4 className='text-3xl font-semibold pb-5 md:pb-7 text-center'>Register Here</h4>

                  {/* First and Last Name */}
                  <div className='py-4 flex gap-x-6 items-center'>
                     <div className='basis-[50%]'>
                        <label className='text-[18px] font-semibold text-[var(--text-color)]'>First Name</label>
                        <input
                           type='text'
                           name='firstName'
                           placeholder='Your first name ...'
                           value={formData.firstName}
                           onChange={handleChange}
                           className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                           required
                        />
                     </div>
                     <div className='basis-[50%]'>
                        <label className='text-[18px] font-semibold text-[var(--text-color)]'>Last Name</label>
                        <input
                           type='text'
                           name='lastName'
                           placeholder='Your last name ...'
                           value={formData.lastName}
                           onChange={handleChange}
                           className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                           required
                        />
                     </div>
                  </div>

                  {/* Email and Password */}
                  <div className='py-4 flex gap-x-6 items-center'>
                     <div className='basis-[50%]'>
                        <label className='text-[18px] font-semibold text-[var(--text-color)]'>Email</label>
                        <input
                           type='email'
                           name='email'
                           placeholder='Your Email ...'
                           value={formData.email}
                           onChange={handleChange}
                           className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                           required
                        />
                     </div>
                     <div className='basis-[50%]'>
                        <label className='text-[18px] font-semibold text-[var(--text-color)]'>Password</label>
                        <input
                           type='password'
                           name='password'
                           placeholder='Your Password ...'
                           value={formData.password}
                           onChange={handleChange}
                           className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                           required
                        />
                     </div>
                  </div>

                  {/* Mobile and User Role */}
                  <div className='py-4 flex gap-x-6 items-center'>
                     <div className='w-full'>
                        <label className='text-[18px] font-semibold text-[var(--text-color)]'>Mobile</label>
                        <input
                           type='text'
                           name='mobile'
                           placeholder='Your mobile Number ...'
                           value={formData.mobile}
                           onChange={handleChange}
                           className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                           required
                        />
                     </div>
                       
                  </div>

                  {/* File Upload */}
                  <div className='py-4'>
                     <label className='text-[18px] font-semibold text-[var(--text-color)]'>Profile Picture</label>
                     <input
                        type='file'
                        name='avatar'
                        onChange={handleChange}
                        className='text-[16px] mt-2 w-full h-10 rounded-sm bg-gray-200 p-2 shadow-sm focus:ring-2 focus:ring-blue-500'
                     />
                  </div>

                  {/* Terms & Conditions */}
                  <div className='py-4 flex items-center'>
                     <input type='checkbox' name='terms' id='terms' checked={formData.terms} onChange={handleChange} required />
                     <label htmlFor='terms' className='text-sm inline-block ml-2'>
                        Agree to the terms & conditions
                     </label>
                  </div>

                  <button
                     type='submit'
                     disabled={isLoading}
                     className='border rounded-sm border-gray-200 py-2 bg-blue-500 hover:bg-gray-300 transition duration-300 text-[16px] font-semibold px-8 flex justify-self-center mt-2 md:mt-5'>
                     {isLoading ? "Registering..." : "Register"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;
