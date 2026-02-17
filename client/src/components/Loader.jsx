import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = ({ isVisible }) => {
  const [render, setRender] = useState(isVisible);
  const ref = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setRender(true);
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    } else if (ref.current) {
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setRender(false),
      });
    }
  }, [isVisible]);

  if (!render) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-safeNavy"
      aria-live="polite"
      aria-label="Loading SafeDose"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="loader-pill h-8 w-16 rounded-full bg-safeBlue/90" />
        <div className="loader-pill h-8 w-16 rounded-full bg-safeTeal/90" />
        <div className="loader-pill h-8 w-16 rounded-full bg-safeLight/80" />
      </div>
      <div className="relative h-10 w-72 overflow-hidden rounded-full border border-safeTeal/50">
        <svg viewBox="0 0 320 40" className="absolute inset-0 h-full w-full">
          <g className="ecg-lane">
            <path
              d="M0 24 L24 24 L34 18 L52 30 L70 20 L92 24 L118 24 L138 16 L160 30 L184 20 L212 24 L236 24 L256 16 L278 28 L300 20 L320 24"
              fill="none"
              stroke="#0F3F46"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M320 24 L344 24 L354 18 L372 30 L390 20 L412 24 L438 24 L458 16 L480 30 L504 20 L532 24 L556 24 L576 16 L598 28 L620 20 L640 24"
              fill="none"
              stroke="#0F3F46"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M640 24 L664 24 L674 18 L692 30 L710 20 L732 24 L758 24 L778 16 L800 30 L824 20 L852 24 L876 24 L896 16 L918 28 L940 20 L960 24"
              fill="none"
              stroke="#0F3F46"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <p className="mt-6 font-display text-safeLight/90">Calibrating SafeDose AI...</p>
    </div>
  );
};

export default Loader;

