import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DrugInput from "../components/DrugInput";
import WarningCard from "../components/WarningCard";
import { checkInteraction } from "../api";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 });
  }, []);

  const handleCheck = async (payload) => {
    setLoading(true);
    try {
      const response = await checkInteraction(payload);
      setResult(response.data);
    } catch (error) {
      setResult({
        level: "moderate",
        title: "Server Connection Required",
        message: "Backend is not reachable. Start server on http://localhost:5000 and try again.",
        recommendations: ["Run backend server", "Retry your request"],
      });
    }
    setLoading(false);
  };

  return (
    <div ref={pageRef} className="mx-auto max-w-5xl px-5 pb-16">
      <div className="mb-8 rounded-3xl border border-safeLight/15 bg-safeDarkTeal/55 p-6 md:p-8">
        <h1 className="font-display text-3xl">Medication Risk Dashboard</h1>
        <p className="mt-2 text-safeLight/75">Run quick two-drug checks or upload a prescription file for AI-assisted review.</p>
      </div>
      <DrugInput onSubmit={handleCheck} loading={loading} />
      <WarningCard data={result} />
    </div>
  );
};

export default Dashboard;

