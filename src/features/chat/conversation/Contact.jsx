const Contact = ({ contactList }) => {
   return (
      <div className='px-4'>
         {/*Conversation list*/}
         {contactList?.length > 0 &&
            contactList.map((item) => {
               return (
                  <div
                     key={item.id}
                     className={`flex justify-between py-3 my-2 px-4 items-center cursor-pointer transition duration-300 "}  `}>
                     <div className='flex items-center'>
                        <img
                           src={`http://localhost:3000/uploads/avatar/${item.user?.avatar}`}
                           className='w-12 h-12 rounded-[50%] border-2 border-pink-500 inline mr-2 object-cover'
                           alt=''
                        />

                        <div>
                           {" "}
                           <h6 className='text-[14px] font-bold text-[var(--text-color)] leading-[12px] mb-1'>
                              {item.user?.name}
                           </h6>
                           <p className='text-[11px] text-[var(--text-color)]'>Can you here me..</p>
                        </div>
                     </div>

                     <div>
                        <h6 className='text-[12px] font-semibold text-[var(--text-color)] leading-[14px] mb-1.5 text-end'>
                           {new Date(item.last_updated).toLocaleDateString("en-US")}
                        </h6>
                        <p className='text-[12px] font-medium text-green-600 leading-[15px] text-end'>Recent</p>
                     </div>
                  </div>
               );
            })}
      </div>
   );
};

export default Contact;
