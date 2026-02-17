import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ThreeBackground from "./components/ThreeBackground";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MedicalChat from "./pages/MedicalChat";

const App = () => {
  const [loading, setLoading] = useState(true);
  const shellRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shellRef.current || loading) return;
    gsap.fromTo(
      shellRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, [location.pathname, loading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-safeNavy text-safeLight">
      <ThreeBackground />
      <Loader isVisible={loading} />
      <div ref={shellRef} className={`relative z-10 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <main className="min-h-screen pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medical-chat" element={<MedicalChat />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

