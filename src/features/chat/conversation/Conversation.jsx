import ConversationList from "./ConversationList";
import ProfileSlider from "./ProfileSlider";
import Recent from "./Recent";
import SearchConversation from "./SearchConversation";

const Conversation = () => {
  return (
    <>
      <div className="sticky top-0 bg-indigo-50 pt-12 pb-5">
        <Recent />
        <ProfileSlider />
      </div>
      <SearchConversation />
      <ConversationList />
    </>
  );
};

export default Conversation;
