import { SideBarIcon } from "/src/features/chat/SideBarIcon.jsx";

const SideMenue = () => {
  return (
    <nav className="border-r border-[#eff1f2] h-[100vh] max-h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin flex justify-between flex-col">
      <div className="border-b border-[#eff1f2] py-16">
        <div className="flex justify-center items-center">
          <img className="w-[50px] h-[50px] rounded-[50%] border-4 border-[var(--primary-color)]" src="" alt="" />
        </div>
      </div>
      <ul>
        {SideBarIcon?.slice(0, SideBarIcon.length - 2).map((item) => {
          return (
            <li key={item.name} className="pt-8">
              <div className="flex justify-center items-center">{item.icon}</div>
            </li>
          );
        })}
      </ul>
      <ul>
        {SideBarIcon?.slice(SideBarIcon.length - 2, SideBarIcon.length).map((item) => {
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
