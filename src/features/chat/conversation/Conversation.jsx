import { Link } from "react-router-dom";
import ProfileSlider from "./ProfileSlider";
import { useState } from "react";

const Conversation = () => {
  const [countIndex, setcountIndex] = useState(1);

  // active chat,call,contact button when cliked
  const handleActive = (index) => {
    setcountIndex(() => index);
  };
  console.log(countIndex);

  return (
    <aside className="py-16 px-4">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-1.5 leading-[20px]">Recent</p>
          <p className="text-[14px] leading-[20px]">Chat With Your Feind </p>
        </div>
        <div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
      <div className="flex justify-between pt-5">
        <div>
          <p className="text-2xl font-bold mb-1.5 leading-[20px]">Chat</p>
          <p className="text-[14px] leading-[20px]">Chat With Your Feind </p>
        </div>
        <div>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612.01 612.01" width="20" height="20">
              <path d="M606.209 578.714 448.198 423.228C489.576 378.272 515 318.817 515 253.393 514.98 113.439 399.704 0 257.493 0S.006 113.439.006 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.291 19.291 0 0 0 .018-27.585zM257.493 467.8c-120.326 0-217.869-95.993-217.869-214.407S137.167 38.986 257.493 38.986c120.327 0 217.869 95.993 217.869 214.407S377.82 467.8 257.493 467.8z" />
            </svg>
          </span>
        </div>
      </div>
      <div>
        <div className="py-5 flex items-center justify-between">
          <Link
            onClick={() => handleActive(1)}
            className={`border-none text-[12px] rounded-[50px] py-1 px-5 font-bold text-[var(--text-color)] ${
              countIndex === 1 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
            }`}
          >
            {" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                fill={`${countIndex === 1 ? "#fff" : "#000"}`}
                className="inline mr-1.5"
                height={18}
                widths={18}
                x="0"
                y="0"
                viewBox="0 0 32 32"
              >
                <g>
                  <path
                    d="M28 2H4C2.346 2 1 3.346 1 5v16c0 1.654 1.346 3 3 3h3v5a1.001 1.001 0 0 0 1.625.781L15.851 24H28c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zM16 16H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2zm8-4H8a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </span>
            Chat
          </Link>
          <Link
            onClick={() => handleActive(2)}
            className={`border-none text-[12px] rounded-[50px] py-1 px-5 font-bold text-[var(--text-color)] ${
              countIndex === 2 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
            }`}
          >
            {" "}
            <span>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0"
                y="0"
                viewBox="0 0 64 64"
                fill={`${countIndex === 2 ? "#fff" : "#000"}`}
                className="inline mr-1.5"
                height={18}
                width={18}
              >
                <g>
                  <path
                    d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </span>
            Call
          </Link>
          <Link
            onClick={() => handleActive(3)}
            className={`border-none text-[12px] rounded-[50px] py-1 px-5 font-bold text-[var(--text-color)] ${
              countIndex === 3 ? "bg-blue-600 text-white" : "bg-[#d7dddd] text-black"
            }`}
          >
            {" "}
            <span>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                fill={`${countIndex === 3 ? "#fff" : "#000"}`}
                className="inline mr-1.5"
                height={18}
                width={18} // Fixed the typo here
                x="0"
                y="0"
                viewBox="0 0 700 700"
              >
                <g>
                  <path
                    d="M500.62 158A150.62 150.62 0 1 1 350 7.36 150.63 150.63 0 0 1 500.62 158zM350 353.19a306.9 306.9 0 0 0-226.77 99.71c-50.83 55.38-38.38 143.48 25.62 182.91a384.4 384.4 0 0 0 402.3 0c64-39.43 76.45-127.53 25.62-182.91A306.9 306.9 0 0 0 350 353.19z"
                    opacity="1"
                    data-original="#000000"
                  />
                </g>
              </svg>
            </span>
            Contact
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Conversation;
