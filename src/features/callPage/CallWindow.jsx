import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Mic, MicOff, Video, VideoOff, PhoneOff, RefreshCcw } from "lucide-react";
import useSocket from "../../hooks/useSocket";
import { BroadcastChannel } from "broadcast-channel";
import { toast } from "react-toastify";

const CallWindow = () => {
   const { user } = useContext(AuthContext);

   const socket = useSocket();
   const { userId } = useParams();
   const { search } = useLocation();
   const [callInfo, setCallInfo] = useState(null);

   const [callData, setCallData] = useState(null);

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

   useEffect(() => {
      const channel = new BroadcastChannel("call_channel");

      channel.onmessage = (message) => {
         if (message.type === "call-data") {
            if (message.senderId === user?._id || message.recipientId === user?._id) {
               setCallInfo(message);
               if (socket) {
                  setTimeout(() => {
                     socket.emit("call-details", message);
                  });
               }
            }
         }
      };

      return () => {
         channel.close(); // Clean up on unmount
      };
   }, []);

   const startCall = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({ video: isVideoEnabled, audio: true });

         if (stream.getAudioTracks().length === 0) {
            toast.error("❌ No audio track found. Check microphone permissions.");
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
         toast.error("Failed to start call", err);
      }
   };

   useEffect(() => {
      startCall();

      if (socket) {
         socket.on("callInfo", (data) => {
            setCallInfo(data);
         });

         if (!callEnded) {
            socket.on("callData", (data) => {
               if (data?.callDetails.sender.id === user?._id || data?.callDetails.receiver.id === user?._id) {
                  endCall();
               }
            });
         }

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

         // socket.on("endCall", ({ senderId, recipientId }) => {
         //    if (senderId === user?._id && recipientId === userId) {
         //       // Stop the peer connection and close the video stream
         //       if (stream) {
         //          stream.getTracks().forEach((track) => track.stop());
         //       }
         //       setStream(null);
         //       setCallEnded(true);
         //       if (localVideoRef.current) {
         //          localVideoRef.current.srcObject = null;
         //       }

         //       // Close the window if allowed
         //       setTimeout(() => {
         //          window.close();
         //       });
         //    }
         // });
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
         socket?.off("callInfo");
         socket?.off("callData");
      };
   }, [socket, callInfo]);

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

   const endCall = () => {
      try {
         // 1. First stop all media tracks
         if (stream) {
            stream.getTracks().forEach((track) => {
               track.stop();
               track.enabled = false;
            });
            setStream(null);
         }

         // 2. Properly close the RTCPeerConnection
         if (peerConnection) {
            // Clear all event handlers first
            peerConnection.onicecandidate = null;
            peerConnection.ontrack = null;
            peerConnection.onnegotiationneeded = null;
            peerConnection.oniceconnectionstatechange = null;
            peerConnection.onsignalingstatechange = null;
            peerConnection.onicegatheringstatechange = null;

            // Close all data channels if any exist
            if (peerConnection.getDataChannel) {
               const dataChannel = peerConnection.getDataChannel();
               if (dataChannel) {
                  dataChannel.close();
               }
            }

            // Remove all transceivers
            peerConnection.getTransceivers().forEach((transceiver) => {
               if (transceiver.stop) {
                  transceiver.stop();
               }
            });

            // Remove all senders
            peerConnection.getSenders().forEach((sender) => {
               if (sender.track) {
                  sender.track.stop();
               }
            });

            // Finally close the connection
            peerConnection.close();
         }

         // 3. Clear video elements
         if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
         }
         if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
         }

         // 4. Update state
         setCallEnded("ended");

         // 5. Your existing server notification
         if (callInfo?.callId) {
            fetch(`http://localhost:3000/call/status`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               credentials: "include",
               body: JSON.stringify({ callStatus: "ended", callId: callInfo?.callId }),
            })
               .then((response) => response.json())
               .then((data) => {
                  setCallData(data);
                  if (socket) {
                     socket.emit("callData", data);
                  }
               })
               .catch((error) => {
                  toast.error("Error updating call status", error);
               });
         }

         // 6. Notify other peer
         if (socket) {
            socket.emit("endCall", {
               senderId: user?._id,
               recipientId: userId,
               callId: callInfo?.callId,
            });
         }
      } catch (error) {
         toast.error("Error ending call", error.message);
      }
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
         if (dragRef.current) {
            dragRef.current.removeEventListener("dragstart", handleDragStart);
         }
         if (dragTarget.current) {
            dragTarget.current.removeEventListener("dragover", handleDragOver);
            dragTarget.current.removeEventListener("dragleave", handleDragLeave);
            dragTarget.current.removeEventListener("drop", handleDragDrop);
         }
      };
   }, []);

   return (
      <div ref={dragTarget} className='relative w-screen h-screen bg-black flex justify-center items-center'>
         {!callEnded ? (
            <>
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
               </div>
            </>
         ) : (
            <>
               <div className='flex flex-col items-center justify-center text-white h-full w-full bg-gradient-to-b from-gray-900 to-black'>
                  <div className='bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-lg max-w-md w-full text-center animate-fade-in-up'>
                     <h1 className='text-3xl font-bold mb-4 text-red-500'>📞 Call Ended</h1>

                     <p className='text-lg mb-2'>Thanks for the conversation!</p>
                     <p className='text-md text-gray-300'>
                        ⏱ Call Duration: <span className='font-semibold'>{callData?.callDetails.callDuration || "00:00"}</span>
                     </p>

                     <button
                        onClick={() => (window.location.href = "/")} // Redirect to home or call history
                        className='mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-full shadow text-white font-medium'>
                        Back to Home
                     </button>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default CallWindow;
