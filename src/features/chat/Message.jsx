import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import SideMenue from "./SideMenue";

const Message = () => {
  return (
    <div>
      <div className="static md:grid md:grid-cols-12 gap-0">
        {/* Sidebar (1 column) */}
        <div className="md:col-span-1">
          <SideMenue />
        </div>
        <div className="md:col-span-3 border-r border-indigo-100 bg-indigo-50">
          <Conversation />
        </div>
        {/* Chat Area (3 columns) */}
        <div className="md:col-span-8">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Message;
