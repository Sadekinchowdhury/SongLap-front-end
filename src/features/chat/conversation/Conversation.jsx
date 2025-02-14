import ConversationList from "./ConversationList";
import ProfileSlider from "./ProfileSlider";
import Recent from "./Recent";
import SearchConversation from "./search-coversation/SearchConversation";

const Conversation = () => {
   return (
      <>
         <div className='sticky z-10 top-0 bg-[var(--background-color)] pt-12 pb-5'>
            <Recent />
            <ProfileSlider />
         </div>
         <SearchConversation />
         <ConversationList />
      </>
   );
};

export default Conversation;
