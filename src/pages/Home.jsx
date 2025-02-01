function Home() {
  return (
    <div className="bg-[var(--background-color)] w-screen relative pt-5 md:pt-12 pb-16">
      <div className="max-w-[1200px] mx-auto block md:flex  justify-between items-center pt-2 md:pt-16 lg:pt-24 px-6 text-center md:text-left">
        <div>
          <h1 className="text-4xl md:text-6xl leading-[1.2] font-bold text-[var(--text-color]">
            Chat with Strangers, <br /> Make New Friends!
          </h1>
          <p className="text-lg leading-relaxed text-[var(--text-color] mt-4">
            Discover a random chat platform to meet new friends, <br /> connect with people, and chat with strangers <br />
            from all over the globe!
          </p>
          <div className="flex items-center md:justify-start justify-center mt-6">
            <button className="mr-4 border border-white rounded-3xl px-[40px] py-3 text-[var(--text-color] text-[20px] font-semibold bg-[var(--primary-color)] hover:bg-indigo-300 transition">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                className="inline mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              Start Chat
            </button>
            <button className="border rounded-3xl px-[40px] py-3 text-[var(--text-color] text-[20px] font-semibold hover:border-[1px solid] transition">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 inline"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Video Call
            </button>
          </div>
        </div>
        <div className="pt-3 px-5 mt-7 md:mt-0 relative">
          <img src="/src/assets/call.png" alt="" className="w-full max-w-auto" />
          <img
            className="absolute w-[145px] md:w-[50%] left-[-5%] md:left-[-30%] top-[15%] border rounded-[45px] border-[var(--primary)]"
            src="/src/assets/notificaiton.png"
            alt=""
          />
          <img
            className="absolute w-[145px] md:w-[50%] right-[-5%] md:right-[-30%] bottom-[15%] border rounded-[45px] border-[var(--primary)]"
            src="/src/assets/message_notification.CZq_4fgA_Z16oW1S.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
