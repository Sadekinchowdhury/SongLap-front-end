import { useContext, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCcw, PhoneIncoming } from "lucide-react";
import useSocket from "../hooks/useSocket";
import { AuthContext } from "../context/AuthProvider";

const About = () => {
   const { user } = useContext(AuthContext);

   const socket = useSocket();
   const localVideoRef = useRef(null);
   const peerConnection = useRef(null);
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOn, setIsVideoOn] = useState(true);
   const [stream, setStream] = useState(null);
   const [callEnded, setCallEnded] = useState(false);
   const [incomingCall, setIncomingCall] = useState(false);
   const [isCallAccepted, setIsCallAccepted] = useState(false);
   const [callerId, setCallerId] = useState(null);
   const [offer, setOffer] = useState({});

   // 📌 Initialize Peer Connection
   const remoteVideoRef = useRef(null); // Remote video element

   const config = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Google STUN server
   };

   const initializePeerConnection = () => {
      peerConnection.current = new RTCPeerConnection(config);

      peerConnection.current.ontrack = (event) => {
         console.log("🔵 Remote Track Received:", event.streams[0]);

         if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
         }
      };
   };

   // 📌 Start Call
   const startCall = async () => {
      try {
         initializePeerConnection();

         const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
         userStream.getTracks().forEach((track) => peerConnection.current.addTrack(track, userStream));

         if (localVideoRef.current) {
            localVideoRef.current.srcObject = userStream;
         }

         setStream(userStream);
         setCallEnded(false);

         const offer = await peerConnection.current.createOffer();
         await peerConnection.current.setLocalDescription(offer);

         socket.emit("sendOffer", { sdp: offer, type: "offer", callerId: user?._id });
      } catch (err) {
         console.error("❌ Failed to start call:", err);
      }
   };

   const receiveCall = async ({ sdp, type }) => {
      try {
         if (!sdp || !type) {
            console.error("❌ Invalid SDP offer received:", { sdp, type });
            return;
         }

         initializePeerConnection(); // Ensure Peer Connection is initialized

         // ✅ Get User Media BEFORE setting Remote Description
         const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
         userStream.getTracks().forEach((track) => peerConnection.current.addTrack(track, userStream));

         // ✅ Ensure local video shows up
         if (localVideoRef.current) {
            localVideoRef.current.srcObject = userStream;
         }
         setStream(userStream);

         const remoteDescription = new RTCSessionDescription({ sdp, type });
         await peerConnection.current.setRemoteDescription(remoteDescription);

         const answer = await peerConnection.current.createAnswer();
         await peerConnection.current.setLocalDescription(answer);

         socket.emit("sendAnswer", { sdp: answer.sdp, type: answer.type, callerId: user?._id });

         setIncomingCall(false);
         setIsCallAccepted(true);
      } catch (err) {
         console.error("❌ Failed to receive call:", err);
      }
   };

   // 📌 Reject Call
   const rejectCall = () => {
      setIncomingCall(false);
      socket.emit("rejectCall", { callerId });
   };

   // 📌 End Call
   const endCall = () => {
      if (stream) {
         stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      setCallEnded(true);
      setIsCallAccepted(false);
      setIncomingCall(false);

      if (peerConnection.current) {
         peerConnection.current.close();
         peerConnection.current = null;
      }

      if (localVideoRef.current) {
         localVideoRef.current.srcObject = null;
      }

      socket.emit("endCall", { callerId });
   };

   // 📌 Toggle Mute/Unmute
   const toggleMute = () => {
      if (stream) {
         stream.getAudioTracks()[0].enabled = isMuted;
         setIsMuted(!isMuted);
      }
   };

   // 📌 Toggle Video On/Off
   const toggleVideo = () => {
      if (stream) {
         stream.getVideoTracks()[0].enabled = !isVideoOn;
         setIsVideoOn(!isVideoOn);
      }
   };

   useEffect(() => {
      if (socket) {
         socket.on("receiveOffer", ({ data, conversationId }) => {
            const { sdp, type } = data;
            setOffer({ sdp, type });
            setCallerId(conversationId);
            setIncomingCall(true);
         });

         socket.on("receiveAnswer", async ({ sdp }) => {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
         });

         socket.on("callRejected", () => {
            setCallEnded(true);
            setIncomingCall(false);
         });

         socket.on("callEnded", () => {
            endCall();
         });
      }

      return () => {
         if (stream) {
            stream.getTracks().forEach((track) => track.stop());
         }
         if (peerConnection.current) {
            peerConnection.current.close();
         }
      };
   }, [socket, stream, callerId]);

   console.log(callerId);

   return (
      <>
         {user?._id === callerId ? (
            <div className='relative w-screen h-screen bg-black flex justify-center items-center'>
               {!callEnded && <video ref={localVideoRef} autoPlay playsInline className='w-full h-full object-cover'></video>}

               {/* Call Controls */}
               <div className='absolute bottom-5 flex gap-4 bg-gray-900 bg-opacity-75 p-3 rounded-lg'>
                  {incomingCall && !isCallAccepted ? (
                     <>
                        {/* Accept Call */}
                        <button
                           onClick={() => receiveCall(offer)}
                           className='p-3 bg-green-600 text-white rounded-lg flex items-center gap-2'>
                           <PhoneIncoming size={20} /> Accept
                        </button>

                        {/* Reject Call */}
                        <button onClick={rejectCall} className='p-3 bg-red-600 text-white rounded-lg flex items-center gap-2'>
                           <PhoneOff size={20} /> Reject
                        </button>
                     </>
                  ) : !callEnded ? (
                     <>
                        {/* Mute/Unmute */}
                        <button onClick={toggleMute} className='p-3 bg-gray-700 text-white rounded-lg flex items-center gap-2'>
                           {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>

                        {/* Video On/Off */}
                        <button onClick={toggleVideo} className='p-3 bg-gray-700 text-white rounded-lg flex items-center gap-2'>
                           {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                        </button>

                        {/* End Call */}
                        <button onClick={endCall} className='p-3 bg-red-600 text-white rounded-lg flex items-center gap-2'>
                           <PhoneOff size={20} />
                        </button>
                     </>
                  ) : (
                     /* Restart Call */
                     <button onClick={startCall} className='p-3 bg-green-600 text-white rounded-lg flex items-center gap-2'>
                        <RefreshCcw size={20} /> Restart
                     </button>
                  )}
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
};

export default About;
