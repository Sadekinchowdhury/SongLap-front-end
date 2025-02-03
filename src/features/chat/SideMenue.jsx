import icons from "./MessageIcons";

const SideMenue = () => {
  return (
    <nav className="border-r border-[#eff1f2] h-[100vh] max-h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin">
      <ul>
        <li className="border-b border-[#eff1f2] py-10">
          <div className="flex justify-center items-center">
            <img className="w-[50px] h-[50px] rounded-[50%] border-4 border-[var(--primary-color)]" src="" alt="" />
          </div>
        </li>
        {icons.map((item) => {
          return (
            <li key={item.name} className="pt-8">
              <div className="flex justify-center items-center">{item.icon}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideMenue;
