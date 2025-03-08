import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCcw, PhoneIncoming } from "lucide-react"; // Import Lucide Icons
import useSocket from "../../../../hooks/useSocket";

const VideoCallWindow = () => {
   const socket = useSocket();
   const localVideoRef = useRef(null);
   const remoteVideoRef = useRef(null);
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOn, setIsVideoOn] = useState(true);
   const [stream, setStream] = useState(null);
   const [callEnded, setCallEnded] = useState(false);

   // কনফিগারেশন
   const config = {
      iceServers: [
         { urls: "stun:stun.l.google.com:19302" }, // গুগলের STUN সার্ভার ব্যবহার করুন
      ],
   };

   // কানেকশন তৈরি করুন
   const peerConnection = useRef(new RTCPeerConnection(config)).current;

   // Function to start a call

   const startCall = async () => {
      try {
         // 📌 ইউজারের ক্যামেরা ও মাইক্রোফোন এক্সেস নাও
         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

         // 📌 লোকাল ভিডিওতে স্ট্রিম সেট করো
         if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
         }

         // 📌 প্রতিটি ট্র্যাক যোগ করো
         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

         // 📌 Offer তৈরি করো
         const offer = await peerConnection.createOffer();
         await peerConnection.setLocalDescription(offer);

         // 📌 Signaling সার্ভারে পাঠাও
         if (socket) {
            socket.emit("sendOffer", { sdp: offer, type: "offer" });
         }

         setStream(stream);
         setCallEnded(false);
      } catch (err) {
         console.error("❌ কল শুরু করতে ব্যর্থ হয়েছে:", err);
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
      }

      // Handle remote stream (Robin's video and audio)
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
   };

   return (
      <div className='relative w-screen h-screen bg-black flex justify-center items-center'>
         <video ref={remoteVideoRef} autoPlay playsInline className='w-full h-full object-cover '></video>
         <div className='absolute bottom-8 right-1'>
            <video
               draggable='true'
               ref={localVideoRef}
               autoPlay
               playsInline
               className='w-96 h-96  flex object-cover z-50'></video>
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

export default VideoCallWindow;
