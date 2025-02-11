import { useState } from "react";
import SearchModal from "./SearchModal"; // Import the modal component

const SearchConversation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`relative flex justify-between pt-5 transition-all`}>
      <div>
        <p className="text-2xl font-bold mb-1.5 leading-[20px] text-[var(--text-color)]">Chat</p>
        <p className="text-[14px] leading-[20px] text-[var(--text-color)]">Chat With Your Friend</p>
      </div>
      <div>
        <span className="cursor-pointer" onClick={handleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612.01 612.01" width="20" height="20" className="fill-[var(--text-color)]">
            <path d="M606.209 578.714 448.198 423.228C489.576 378.272 515 318.817 515 253.393 514.98 113.439 399.704 0 257.493 0S.006 113.439.006 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.291 19.291 0 0 0 .018-27.585zM257.493 467.8c-120.326 0-217.869-95.993-217.869-214.407S137.167 38.986 257.493 38.986c120.327 0 217.869 95.993 217.869 214.407S377.82 467.8 257.493 467.8z" />
          </svg>
        </span>
      </div>

      {/* Render the modal only when needed */}
      {isModalOpen && <SearchModal handleModal={handleModal} />}
    </div>
  );
};

export default SearchConversation;
