import { useState } from "react";
import ConversationList from "./ConversationList";
import ProfileSlider from "./ProfileSlider";
import Recent from "./Recent";
import SearchConversation from "./search-coversation/SearchConversation";

const Conversation = () => {
   const [conversationlist, setConversationList] = useState([]);
   console.log(conversationlist);
   return (
      <>
         <div className='sticky top-0 bg-[var(--background-color)] pt-12 pb-5'>
            <Recent />
            <ProfileSlider />
         </div>
         <SearchConversation setConversationList={setConversationList} />
         <ConversationList />
      </>
   );
};

export default Conversation;
