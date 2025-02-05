const AllMessage = () => {
  // const messages = [
  //   {
  //     id: 1,
  //     text: "Hey! How are you?",
  //     sender: { name: "John", profilePic: " " },
  //     isSender: false,
  //   },
  //   {
  //     id: 2,
  //     text: "I'm good! How about you?",
  //     sender: { name: "You", profilePic: " " },
  //     isSender: true,
  //   },
  // ];

  return (
    <>
      <div className="py-10">
        <div className="flex gap-x-4">
          <img src="" className="w-10 h-10 rounded-full border border-blue-700" alt="" />
          <div>
            <h5 className="inline-block pr-5 font-semibold text-[16px] leading-[16px] text-[var(--text-color)]">Sadekin chow</h5>
            <h6 className="inline-block text-[12px] text-[var(--text-color)] font-normal">01:55 pm</h6>
            <ul className="mt-4">
              <li className="bg-yellow-300 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2">my name is sadekin</li>
              <li className="bg-yellow-300 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2">my name is sadekin chowhdury</li>
              <li className="bg-yellow-300 py-2 px-3 rounded-bl-[20px] rounded-tr-[20px] my-2">The imagin of the nation</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMessage;
