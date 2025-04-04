import { useContext, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCcw } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { AuthContext } from "../../context/AuthProvider";

const CallWindow = () => {
   const { user } = useContext(AuthContext);
   const socket = useSocket();
   const { userId } = useParams();
   const { search } = useLocation();
   const callType = new URLSearchParams(search).get("type");

   const dragRef = useRef(null);
   const dragTarget = useRef(null);
   const remoteVideoRef = useRef(null);
   const localVideoRef = useRef(null);
   const peerConnections = useRef({});

   const [stream, setStream] = useState(null);
   const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video");
   const [callAccepted, setCallAccepted] = useState(false);
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOn, setIsVideoOn] = useState(isVideoEnabled);
   const [callEnded, setCallEnded] = useState(false);

   const peerConnection = useRef(
      new RTCPeerConnection({
         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      })
   );

   // Get user media and initialize call
   useEffect(() => {
      const getUserMediaOnce = async () => {
         try {
            if (!stream) {
               const mediaStream = await navigator.mediaDevices.getUserMedia({
                  video: isVideoEnabled,
                  audio: true,
               });

               if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream;
               setStream(mediaStream);

               // Emit call request with the correct receiverId
               if (userId !== user?._id) {
                  socket?.emit("call-request", {
                     receiverId: userId,
                     callerId: user?._id,
                     callType,
                  });
               }
            }
         } catch (error) {
            console.error("Error accessing media devices:", error);
         }
      };

      getUserMediaOnce();
   }, [userId, user?._id, socket, callType, isVideoEnabled]);

   // Initiate WebRTC call
   const initiateCall = async (receiverId, roomId, stream) => {
      try {
         console.log("Initiating call to:", receiverId, roomId);
         console.log(stream);
         if (!stream) return;
         // Add local tracks to the peer connection
         stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

         const offer = await peerConnection.current.createOffer();
         await peerConnection.current.setLocalDescription(offer);

         // Emit the correct receiverId to ensure the call is going to the right user
         socket?.emit("send-offer", { offer, receiverId, callerId: user?._id, roomId });
      } catch (error) {
         console.error("Error during WebRTC call initiation:", error);
      }
   };

   useEffect(() => {
      if (!socket || !peerConnection.current) return;

      const handleCallAccepted = ({ receiverId, roomId }) => {
         if (receiverId === userId) {
            console.log("call accepted from", receiverId, roomId);
            setCallAccepted(true);
            initiateCall(receiverId, roomId, stream);
         }
      };

      const handleReceiveOffer = async ({ offer, receiverId, callerId }) => {
         console.log("Received offer:", offer);
         if (receiverId !== userId) return;

         try {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit("send-answer", { answer, receiverId, callerId });
         } catch (error) {
            console.error("Error handling received offer:", error);
         }
      };

      const handleReceiveAnswer = async ({ answer }) => {
         try {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
         } catch (error) {
            console.error("Error setting remote description:", error);
         }
      };

      const handleIceCandidate = (event) => {
         if (event.candidate) {
            socket.emit("send-ice-candidate", { candidate: event.candidate, userId });
         }
      };

      const handleTrackEvent = (event) => {
         if (remoteVideoRef.current && event.streams.length > 0) {
            remoteVideoRef.current.srcObject = event.streams[0];
         }
      };

      // Register event listeners
      socket.on("call-accepted", handleCallAccepted);
      socket.on("receive-offer", handleReceiveOffer);
      socket.on("receive-answer", handleReceiveAnswer);

      peerConnection.current.onicecandidate = handleIceCandidate;
      peerConnection.current.ontrack = handleTrackEvent;

      return () => {
         // Remove event listeners on unmount
         socket.off("call-accepted", handleCallAccepted);
         socket.off("receive-offer", handleReceiveOffer);
         socket.off("receive-answer", handleReceiveAnswer);

         // Cleanup peer connection handlers
         if (peerConnection.current) {
            peerConnection.current.onicecandidate = null;
            peerConnection.current.ontrack = null;
         }
      };
   }, [socket, userId]);

   // Toggle mute/unmute
   const toggleMute = () => {
      if (stream) {
         stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
         setIsMuted((prev) => !prev);
      }
   };

   // Toggle video on/off
   const toggleVideo = () => {
      if (stream) {
         stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
         setIsVideoOn((prev) => !prev);
      }
   };

   // End the call
   const endCall = () => {
      if (stream) {
         stream.getTracks().forEach((track) => track.stop());
      }
      setCallEnded(true);
   };

   return (
      <div ref={dragTarget} className='relative w-screen h-screen bg-black flex justify-center items-center'>
         <video ref={remoteVideoRef} autoPlay playsInline className='w-full h-full object-cover' />
         <div ref={dragRef} draggable className='absolute bottom-5 right-8 cursor-move'>
            <video ref={localVideoRef} autoPlay playsInline className='w-72 h-72 object-cover' />
         </div>

         <div className='absolute bottom-5 flex gap-4 bg-gray-900 bg-opacity-75 p-3 rounded-lg'>
            {!callEnded ? (
               <>
                  <button onClick={toggleMute} className='p-3 bg-gray-700 text-white rounded-lg'>
                     {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <button onClick={toggleVideo} className='p-3 bg-gray-700 text-white rounded-lg'>
                     {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                  </button>
                  <button onClick={endCall} className='p-3 bg-red-600 text-white rounded-lg'>
                     <PhoneOff size={20} />
                  </button>
               </>
            ) : (
               <button className='p-3 bg-green-600 text-white rounded-lg'>
                  <RefreshCcw size={20} /> Restart Call
               </button>
            )}
         </div>
      </div>
   );
};

export default CallWindow;
