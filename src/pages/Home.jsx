function Home() {
  return (
    <div className="bg-[var(--background-color)] w-screen min-h-screen relative pt-12 pb-16">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center pt-24 px-6">
        <div>
          <h1 className="text-6xl leading-[1] font-bold text-[var(--text-color]">
            Chat with Strangers, <br /> Make New Friends!
          </h1>
          <p className="text-lg leading-relaxed text-[var(--text-color] mt-4">
            Discover a random chat platform to meet new friends, <br /> connect with people, and chat with strangers <br />
            from all over the globe!
          </p>
          <div className="flex items-center mt-6">
            <button className="mr-4 border border-white rounded px-6 py-3 text-[var(--text-color] bg-[var(--primary-color)] hover:bg-indigo-700 transition">
              Get Started
            </button>
            <button className="border border-white rounded px-6 py-3 text-[var(--text-color] bg-purple-600 hover:bg-purple-700 transition">
              Video Call
            </button>
          </div>
        </div>
        <div className="pt-3 px-5 relative">
          <img src="/src/assets/call.png" alt="SongLap Logo" className="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
