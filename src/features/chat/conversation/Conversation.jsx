import ConversationList from "./ConversationList";
import ProfileSlider from "./ProfileSlider";
import Recent from "./Recent";
import SearchConversation from "./search-coversation/SearchConversation";

const Conversation = () => {
   return (
      <>
         <div className='sticky z-0 px-4 top-0 bg-[var(--background-color)] pt-12 pb-5'>
            <Recent />
            <ProfileSlider />
         </div>
         <div className='px-4'>
            <SearchConversation />
            <ConversationList />
         </div>
      </>
   );
};

export default Conversation;
