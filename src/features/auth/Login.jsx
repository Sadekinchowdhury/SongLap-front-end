const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh] py-7 md:py-10 px-5 md:px-10">
      <div className="">
        <form action="" className=" border border-gray-300 p-5 md:p-10 rounded-2xl">
          <h4 className="text-3xl font-semibold pb-5 md:pb-7 text-center">Login Here</h4>
          <div className="py-4">
            <label htmlFor="" className="text-[18px] leading-[28px] font-semibold text-[var(--text-color)]">
              Your Name
            </label>
            <input
              placeholder="Your name ..."
              className="text-[16px] mt-2 placeholder:text-[var(--text-color)] w-full h-10 rounded-sm outline-none bg-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
            />
          </div>
          <div className="py-4">
            {" "}
            <label htmlFor="" className="text-[18px] leading-[28px] font-semibold text-[var(--text-color)]">
              Email Or Password
            </label>
            <input
              placeholder="Your Email Or Password ..."
              className="text-[16px] mt-2 placeholder:text-[var(--text-color)] w-full h-10 rounded-sm outline-none bg-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
            />
          </div>
          <div className="py-4">
            <label htmlFor="" className="text-[18px] leading-[28px] font-semibold text-[var(--text-color)]">
              Password
            </label>
            <input
              placeholder="Your Password ..."
              className="text-[16px] mt-2 placeholder:text-[var(--text-color)] w-full h-10 rounded-sm outline-none bg-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="border rounded-sm border-gray-200 py-2 bg-blue-500 hover:bg-gray-300 transition duration-300 text-[16px] font-semibold px-8 flex justify-self-center mt-2 md:mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
