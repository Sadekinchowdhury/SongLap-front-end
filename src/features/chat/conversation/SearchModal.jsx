import { useState } from "react";

const SearchModal = ({ handleModal }) => {
  const [email_or_phone, setEmailOrPhone] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    let inpute = e.target;

    setEmailOrPhone(inpute.value);
  };
  console.log(email_or_phone);

  return (
    <div id="modal-background" className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search Friends</h2>
          <button onClick={handleModal} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            ✕
          </button>
        </div>
        <form>
          <input
            className="mt-3 w-full p-2 border rounded-md outline-none text-gray-900 dark:text-white dark:bg-gray-700"
            type="text"
            name="email_or_phone"
            value={email_or_phone}
            onChange={handleInput}
            placeholder="Type a name..."
          />
        </form>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Jane Smith" className="w-8 h-8 rounded-full" />
            <p className="text-gray-800 dark:text-white">Jane Smith</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
