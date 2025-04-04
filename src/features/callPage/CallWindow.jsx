import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCcw } from "lucide-react";
import useSocket from "../../hooks/useSocket";

const CallWindow = () => {
   const { user } = useContext(AuthContext);
   const socket = useSocket();
   const { userId } = useParams();
   const { search } = useLocation();
   const navigate = useNavigate();
   const callType = new URLSearchParams(search).get("type");

   const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video");
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOn, setIsVideoOn] = useState(true);
   const [stream, setStream] = useState(null);
   const [callEnded, setCallEnded] = useState(false);

   const localVideoRef = useRef(null);
   const remoteVideoRef = useRef(null);
   const dragRef = useRef(null);
   const dragTarget = useRef(null);

   const config = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
   };

   const peerConnection = useRef(new RTCPeerConnection(config)).current;

   console.log(isVideoEnabled);

   // Function to start a call

   // const startCall = async () => {
   //    try {
   //       // 📌 ইউজারের ক্যামেরা ও মাইক্রোফোন এক্সেস নাও
   //       const stream = await navigator.mediaDevices.getUserMedia({ video: isVideoEnabled, audio: true });

   //       // 📌 লোকাল ভিডিওতে স্ট্রিম সেট করো
   //       if (localVideoRef.current) {
   //          localVideoRef.current.srcObject = stream;
   //       }

   //       // 📌 প্রতিটি ট্র্যাক যোগ করো
   //       stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

   //       // 📌 Offer তৈরি করো
   //       const offer = await peerConnection.createOffer();
   //       await peerConnection.setLocalDescription(offer);

   //       // 📌 Signaling সার্ভারে পাঠাও
   //       if (socket) {
   //          socket.emit("sendOffer", { sdp: offer, type: "offer" });
   //       }

   //       setStream(stream);
   //       setCallEnded(false);
   //    } catch (err) {
   //       console.error("❌ কল শুরু করতে ব্যর্থ হয়েছে:", err);
   //    }
   // };
   const startCall = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({ video: isVideoEnabled, audio: true });

         console.log("📌 Audio Tracks:", stream.getAudioTracks());

         if (stream.getAudioTracks().length === 0) {
            console.error("❌ No audio track found. Check microphone permissions.");
         }

         localVideoRef.current.srcObject = stream;

         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

         const offer = await peerConnection.createOffer();
         await peerConnection.setLocalDescription(offer);

         if (socket) {
            socket.emit("sendOffer", { sdp: offer, type: "offer" });
         }

         setStream(stream);
         setCallEnded(false);
      } catch (err) {
         console.error("❌ Failed to start call:", err);
      }
   };

   useEffect(() => {
      startCall();

      if (socket) {
         // Receive Offer
         socket.on("receiveOffer", async ({ sdp }) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));

            // Create an answer
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            // Send the answer back to the signaling server
            socket.emit("sendAnswer", { sdp: answer, type: "answer" });
         });

         // anser rcv
         socket.on("receiveAnswer", async ({ sdp }) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
         });
         socket.on("endCall", ({ senderId, recipientId }) => {
            if (senderId === user?._id && recipientId === userId) {
               // Stop the peer connection and close the video stream
               if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
               }
               setStream(null);
               setCallEnded(true);
               if (localVideoRef.current) {
                  localVideoRef.current.srcObject = null;
               }

               // Close the window if allowed
               setTimeout(() => {
                  window.close();
               });
            }
         });
      }

      peerConnection.ontrack = (event) => {
         // Add the remote stream to the video element
         if (event.streams && event.streams[0]) {
            if (remoteVideoRef.current) {
               remoteVideoRef.current.srcObject = event.streams[0];
            }
         }
      };

      // Stop Stream if component unmount
      return () => {
         if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            remoteVideoRef.current = null;
            localVideoRef.current = null;
         }
         peerConnection.ontrack = null;
         socket?.off("receiveOffer");
         socket?.off("receiveAnswer");
      };
   }, [socket]);

   // Toggle Mute/Unmute
   const toggleMute = () => {
      if (stream) {
         stream.getAudioTracks()[0].enabled = isMuted;
         setIsMuted(!isMuted);
      }
   };

   // Toggle Video On/Off
   const toggleVideo = () => {
      if (stream) {
         stream.getVideoTracks()[0].enabled = !isVideoOn;
         setIsVideoOn(!isVideoOn);
      }
   };

   // End Call
   const endCall = () => {
      if (stream) {
         stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      setCallEnded(true);
      if (localVideoRef.current) {
         localVideoRef.current.srcObject = null;
      }
      // Notify the opponent that the call has ended
      if (socket) {
         socket.emit("endCall");
      }
      // Close the window if allowed
      setTimeout(() => {
         window.close();
      });
   };

   useEffect(() => {
      if (!dragRef.current || !dragTarget.current) {
         return;
      }

      const handleDragStart = (event) => {
         event.dataTransfer.setData("text/plain", "");
      };

      const handleDragOver = (event) => {
         event.preventDefault();
         const draggedElement = dragRef.current;
         draggedElement.style.position = "absolute";
         draggedElement.style.top = event.clientY + "px";
         draggedElement.style.left = event.clientX + "px";
      };

      const handleDragLeave = (event) => {};
      const handleDragDrop = (event) => {
         event.preventDefault();
         const draggedElement = dragRef.current;
         draggedElement.style.position = "absolute";
         draggedElement.style.top = event.clientY + "px";
         draggedElement.style.left = event.clientX + "px";
      };

      dragRef.current.addEventListener("dragstart", handleDragStart);
      dragTarget.current.addEventListener("dragover", handleDragOver);
      dragTarget.current.addEventListener("dragleave", handleDragLeave);
      dragTarget.current.addEventListener("drop", handleDragDrop);

      return () => {
         dragRef.current.removeEventListener("dragstart", handleDragStart);
         dragTarget.current.removeEventListener("dragover", handleDragOver);
         dragTarget.current.removeEventListener("dragleave", handleDragLeave);
         dragTarget.current.removeEventListener("drop", handleDragDrop);
      };
   }, []);

   return (
      <div ref={dragTarget} className='relative w-screen h-screen bg-black flex justify-center items-center'>
         <video ref={remoteVideoRef} autoPlay playsInline className='w-full h-full object-cover '></video>
         <div ref={dragRef} draggable={true} className='absolute transform bottom-5 right-8 '>
            <video
               draggable='true'
               ref={localVideoRef}
               autoPlay
               playsInline
               className='w-72 h-72  flex object-cover z-50'></video>
         </div>

         {/* Control Buttons */}
         <div className='absolute bottom-5 flex gap-4 bg-gray-900 bg-opacity-75 p-3 rounded-lg'>
            {!callEnded ? (
               <>
                  {/* Mute Button */}
                  <button onClick={toggleMute} className='p-3 bg-gray-700 text-white rounded-lg flex items-center gap-2'>
                     {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>

                  {/* Video On/Off Button */}
                  <button onClick={toggleVideo} className='p-3 bg-gray-700 text-white rounded-lg flex items-center gap-2'>
                     {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                  </button>

                  {/* End Call Button */}
                  <button onClick={endCall} className='p-3 bg-red-600 text-white rounded-lg flex items-center gap-2'>
                     <PhoneOff size={20} />
                  </button>
               </>
            ) : (
               /* Restart Call Button */
               <button onClick={startCall} className='p-3 bg-green-600 text-white rounded-lg flex items-center gap-2'>
                  <RefreshCcw size={20} /> Restart Call
               </button>
            )}
         </div>
      </div>
   );
};

export default CallWindow;
