import { useContext, useEffect, useState } from "react";
import { Video, Phone, Clock, ArrowBigLeftIcon, ArrowLeft, ArrowLeftIcon, ArrowRight, ArrowRightIcon } from "lucide-react"; // Import icons from Lucide
import { AuthContext } from "../../context/AuthProvider";

const CallHistory = () => {
   const { user } = useContext(AuthContext);
   const [callHistory, setCallHistory] = useState([]);

   useEffect(() => {
      const getCallHistory = async () => {
         try {
            const response = await fetch("http://localhost:3000/call/history", {
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            });
            const result = await response.json();
            setCallHistory(result.calls);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      getCallHistory();
   }, []);

   const timeStamp = (date, type) => {
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${type === "day" ? `${day}/${month}/${year}` : `${formattedHour}:${minute} ${ampm}`}`;
   };

   return (
      <div className='bg-[var--(background-color)] min-h-screen p-4 '>
         <div className='max-w-4xl mx-auto rounded-lg shadow-lg p-6'>
            <h1 className='text-2xl font-bold text-[var(--text-color)] mb-4'>Call History</h1>
            <div>
               {callHistory.map((call) => (
                  <div key={call._id} className='flex items-center justify-between border-b border-gray-200 py-4'>
                     <div className='flex items-center space-x-4'>
                        <img
                           src={`http://localhost:3000/uploads/avatar/${
                              user?._id === call.sender.id ? call.receiver.avatar : call.sender.avatar
                           }`} // Assuming the avatar is stored in a folder named images
                           alt={call.sender.name}
                           className='w-12 h-12 rounded-full object-cover'
                        />
                        <div>
                           <div className='text-sm font-semibold text-[var--(text-color)]'>
                              {user?._id === call.sender.id ? (
                                 <>
                                    {" "}
                                    <ArrowLeftIcon className='w-8 h-3 fill-red-800  text-[var(--text-color)] mr-1  inline' />{" "}
                                    <span className='text-[var(--text-color)]'>{call.receiver.name}</span>
                                 </>
                              ) : (
                                 <>
                                    <span className='text-[var(--text-color)]'>{call.sender.name}</span>{" "}
                                    <ArrowRightIcon className='w-8 h-3 fill-green-800   mr-1  inline' />
                                 </>
                              )}
                           </div>
                           <div className='text-xs  text-[var(--text-color)]'>{timeStamp(call.createdAt, "day")}</div>
                        </div>
                     </div>
                     <div className='space-x-3 text-right'>
                        <div className='text-[var(--text-color)] text-[14px] m-0'>
                           {call.callType === "video" ? (
                              <Video className='w-3 h-3 mr-1 inline fill-[var(--text-color)]' />
                           ) : (
                              <Phone className='w-3 h-3 mr-1 inline fill-[var(--text-color)]' />
                           )}
                           <span>{timeStamp(call.createdAt, "time")}</span>
                        </div>
                        <div className='text-[var--(text-color)] text-[14px]'>
                           <Clock className='w-3 h-3 mr-1 inline fill-[var(--text-color)]' />
                           <span className='text-[var(--text-color)]'>{call.callDuration}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default CallHistory;
