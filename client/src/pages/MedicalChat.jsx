import { useEffect, useRef } from "react";
import gsap from "gsap";
import ChatWindow from "../components/ChatWindow";

const MedicalChat = () => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 });
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-5 pb-16">
      <ChatWindow />
    </div>
  );
};

export default MedicalChat;

