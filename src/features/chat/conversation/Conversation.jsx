import ProfileSlider from "./ProfileSlider";

const Conversation = () => {
  return (
    <aside className="py-16 px-4">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-1.5 leading-[20px]">Recent</p>
          <p className="text-[16px]">Chat With Your Feind </p>
        </div>
        <div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-10 mb-7">
        <ProfileSlider />
      </div>
    </aside>
  );
};

export default Conversation;
