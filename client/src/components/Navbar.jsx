import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Checker" },
  { to: "/medical-chat", label: "Ask AI" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 top-0 z-30 w-full transition-all duration-300 ${
        scrolled ? "bg-safeNavy/90 backdrop-blur-md shadow-glow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <span className="font-display text-2xl font-bold text-safeLight">SafeDose</span>
        <div className="flex items-center gap-6 text-sm font-semibold text-safeLight/90">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group relative pb-1 transition-colors ${isActive ? "text-safeBlue" : "hover:text-safeBlue"}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-safeBlue transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
