import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const cardThemes = {
  danger: {
    bg: "bg-red-500/15",
    border: "border-red-400/60",
    glow: "shadow-[0_0_24px_rgba(248,113,113,0.55)]",
    icon: "!",
    iconStyle: "bg-red-500/80 text-white",
  },
  moderate: {
    bg: "bg-amber-400/15",
    border: "border-amber-300/60",
    glow: "shadow-[0_0_24px_rgba(251,191,36,0.45)]",
    icon: "!",
    iconStyle: "bg-amber-300/80 text-safeLight",
  },
  safe: {
    bg: "bg-emerald-400/15",
    border: "border-emerald-300/60",
    glow: "shadow-[0_0_24px_rgba(16,185,129,0.45)]",
    icon: "✓",
    iconStyle: "bg-emerald-400/80 text-safeLight",
  },
};

const WarningCard = ({ data }) => {
  const ref = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!data || !ref.current) return;

    gsap.killTweensOf(ref.current);
    gsap.killTweensOf(iconRef.current);

    if (data.level === "danger") {
      gsap.fromTo(ref.current, { x: -20, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(ref.current, { x: 4, duration: 0.08, repeat: 5, yoyo: true });
      gsap.to(ref.current, { boxShadow: "0 0 26px rgba(248, 113, 113, 0.7)", duration: 0.6, yoyo: true, repeat: -1 });
      gsap.to(iconRef.current, { y: -8, duration: 0.3, yoyo: true, repeat: -1 });
    }

    if (data.level === "moderate") {
      gsap.fromTo(ref.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(ref.current, { y: -7, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(ref.current, { scale: 1.02, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }

    if (data.level === "safe") {
      gsap.fromTo(ref.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" });
      gsap.to(ref.current, { boxShadow: "0 0 26px rgba(16, 185, 129, 0.65)", duration: 0.7, yoyo: true, repeat: -1 });
      gsap.fromTo(iconRef.current, { rotate: -18 }, { rotate: 0, duration: 0.4, ease: "back.out(2)" });
    }
  }, [data]);

  if (!data) return null;
  const theme = cardThemes[data.level] || cardThemes.safe;

  return (
    <div ref={ref} className={`mt-6 rounded-3xl border p-6 ${theme.bg} ${theme.border} ${theme.glow}`}>
      <div className="flex items-start gap-4">
        <div ref={iconRef} className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold ${theme.iconStyle}`}>
          {theme.icon}
        </div>
        <div>
          <h3 className="font-display text-xl text-safeLight">{data.title}</h3>
          <p className="mt-2 text-safeLight/80">{data.message}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-safeLight/75">
            {data.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-5 flex justify-end">
            <Link
              to="/medical-chat"
              className="cta-button rounded-xl bg-safeTeal px-4 py-2 text-sm font-semibold text-white"
            >
              Ask More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningCard;

