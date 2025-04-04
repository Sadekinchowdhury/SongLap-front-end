// useWebRTC.js
import { useEffect, useRef } from "react";
import useSocket from "./useSocket";

const useWebRTC = (stream, userId, callType, callerId) => {
   const socket = useSocket();
   const peerConnection = useRef(
      new RTCPeerConnection({
         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      })
   );

   useEffect(() => {
      const initiateCall = async (callerId) => {
         try {
            stream?.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            socket?.emit("send-offer", { offer, recipientId: callerId });

            peerConnection.current.onicecandidate = (event) => {
               if (event.candidate) {
                  socket?.emit("send-ice-candidate", { candidate: event.candidate, recipientId: callerId });
               }
            };
         } catch (error) {
            console.error("Error during WebRTC call initiation:", error);
         }
      };

      const handleCallAccepted = ({ callerId }) => {
         if (callerId === userId) {
            initiateCall(callerId);
         }
      };

      socket?.on("call-accepted", handleCallAccepted);

      peerConnection.current.ontrack = (event) => {
         if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
         }
      };

      return () => {
         socket?.off("call-accepted");
      };
   }, [socket, userId, callType, callerId, stream]);

   return { peerConnection };
};

export default useWebRTC;
