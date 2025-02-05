import { useState } from "react";

const InputMessage = () => {
  const [message, setMessage] = useState("");

  const handleFileUpload = (event) => {
    console.log("File selected:", event.target.files[0]);
  };

  const handleVoiceInput = () => {
    console.log("Voice input activated");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-5 py-4 sticky top-full p-5 rounded-md bg-white shadow-md">
      {/* File Upload */}
      <label className="cursor-pointer">
        <input type="file" className="hidden" onChange={handleFileUpload} />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" className="w-6 h-6">
          <path
            d="M255.5 511.9H130.8c-57-.1-98.1-41-98.4-98-.1-19.9-.1-39.8 0-59.7.1-20.5 12.5-33.7 31.6-33.8s31.6 13.1 31.8 33.6c.1 20.2-.1 40.5.1 60.8.2 21.2 12.6 33.6 34 33.6h252.7c21.3 0 33.8-12.4 34-33.6.1-20.2-.1-40.5.1-60.8.1-20.5 12.6-33.6 31.7-33.6s31.7 13.2 31.5 33.8c-.2 25.9 1.2 52.1-2 77.6-6 46.8-45.8 79.8-93.2 80-43.2.3-86.2.1-129.2.1z"
            fill="#000"
          />
          <path
            d="M224.3 109.2c-4.8 4.5-7.7 7-10.3 9.6-20.3 20.5-40.4 41.1-60.8 61.4-14.5 14.5-34.6 15.5-47.6 2.9s-12.5-33.4 1.7-47.8c41.4-41.6 82.9-83.1 124.5-124.5 14.7-14.6 33.8-14.6 48.4 0 41.9 41.6 83.6 83.3 125.2 125.2 13.7 13.8 13.8 34.6 1 47s-33 11.8-46.9-2c-20.7-20.6-41-41.5-61.5-62.2-2.6-2.7-5.5-5.2-9.7-9.1-.3 5.7-.6 9.4-.6 13.2 0 65.4.1 130.9-.1 196.3-.1 24.6-21.6 39.2-44.1 30.4-12.4-4.8-19.2-15.6-19.2-31.4-.1-64.7-.1-129.4 0-194.2z"
            fill="#000"
          />
        </svg>
      </label>

      {/* Message Input */}
      <div className="w-full">
        <input
          type="text"
          className="w-full outline-none min-h-[40px] text-lg px-3 border rounded-md"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Voice Input */}
      <button type="button" onClick={handleVoiceInput} className="focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 435.2 435.2" className="w-6 h-6 hover:fill-red-500">
          <path d="M356.864 224.768c0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36c0 59.904-48.64 108.544-108.544 108.544-59.904 0-108.544-48.64-108.544-108.544 0-8.704-6.656-15.36-15.36-15.36s-15.36 6.656-15.36 15.36c0 71.168 53.248 131.072 123.904 138.752v40.96h-55.808c-8.704 0-15.36 6.656-15.36 15.36s6.656 15.36 15.36 15.36h142.336c8.704 0 15.36-6.656 15.36-15.36s-6.656-15.36-15.36-15.36H232.96v-40.96c70.656-7.68 123.904-67.584 123.904-138.752z" />
          <path d="M217.6 0c-47.104 0-85.504 38.4-85.504 85.504v138.752c0 47.616 38.4 85.504 85.504 86.016 47.104 0 85.504-38.4 85.504-85.504V85.504C303.104 38.4 264.704 0 217.6 0z" />
        </svg>
      </button>

      {/* Submit Button */}
      <button type="submit" className="focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 548.244 548.244" className="w-6 h-6 hover:fill-blue-500">
          <path
            fillRule="evenodd"
            d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default InputMessage;
