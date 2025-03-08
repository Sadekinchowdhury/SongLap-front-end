import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useCall = () => {
   const newWindow = useRef(null);
   const createElement = useRef(document.createElement("div")); // useRef for a static DOM element

   useEffect(() => {
      if (open) {
         // Open the new window only if 'open' is true
         newWindow.current = window.open("", "_blank", "width=400,height=400");

         if (newWindow.current) {
            newWindow.current.document.body.appendChild(createElement.current);

            const currentWindow = newWindow.current;
            return () => {
               if (currentWindow) {
                  currentWindow.close();
               }
            };
         }
      }
   }, [open]);

   return {
      portal: (children) => ReactDOM.createPortal(children, createElement.current),
   };
};

export default useCall;
