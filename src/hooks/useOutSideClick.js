import { useEffect, useRef } from "react";

export default function useOutSideClick(handler, listencapturing = true) {
  const refe = useRef();

  useEffect(() => {
    function handleclick(e) {
      if (refe.current && !refe.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleclick, listencapturing);

    return () => {
      document.removeEventListener("click", handleclick, listencapturing);
    };
  }, [handler, listencapturing]);

  return refe;
}
