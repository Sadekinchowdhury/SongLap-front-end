const ChatBoxTop = () => {
  return (
    <div className="sticky top-2 grid grid-cols-2 bg-[var(--background-color)] rounded-2xl p-3">
      <div className="flex py-4 items-center gap-x-3 cursor-pointer">
        <div>
          <img src="" className="w-14 h-14 rounded-[50%] border-2 border-pink-500" alt="" />
        </div>
        <div>
          <h6 className="text-[18px] font-bold text-[var(--text-color)] leading-[18px] mb-1.5">Sadekin Chowdhury</h6>
          <p className="text-[13px] font-medium text-[var(--text-color)] leading-[12px]">Active</p>
        </div>
      </div>
      <div className="justify-self-end flex items-center gap-4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0"
            y="0"
            viewBox="0 0 64 64"
            className="inline mr-1.5 fill-[var(--text-color)]"
            height={24}
            width={24}
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
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={24}
            height={24}
            x="0"
            y="0"
            viewBox="0 0 152 152"
            xmlSpace="preserve"
            className="fill-[var(--text-color)]"
          >
            <g>
              <path
                d="M11 47.9v42.6c0 12.1 9.8 21.9 21.9 21.9h63.6c4.5 0 8.2-3.7 8.2-8.2V61.5c0-12.1-9.8-21.9-21.9-21.9H19.2c-4.5 0-8.2 3.6-8.2 8zM112 95.3l17.6 15.4c2.8 2.5 7.2 2.2 9.7-.6 1.1-1.3 1.7-2.9 1.7-4.5V46.4c0-3.8-3.1-6.8-6.8-6.9-1.7 0-3.3.6-4.5 1.7L112 56.7c-1.5 1.3-2.3 3.2-2.3 5.2v28.3c0 1.9.9 3.8 2.3 5.1z"
                opacity="1"
              />
            </g>
          </svg>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={24}
            height={24}
            x="0"
            y="0"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            className="fill-[var(--text-color)]"
          >
            <g>
              <path
                d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 26c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 6c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z"
                opacity="1"
              />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ChatBoxTop;
