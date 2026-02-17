import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15 });
      gsap.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3 });

      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
            },
          }
        );
      });

      gsap.fromTo(
        ".feature-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features",
            start: "top 80%",
          },
        }
      );

      gsap.utils.toArray(".gsap-button").forEach((btn) => {
        btn.addEventListener("mouseenter", () => gsap.to(btn, { scale: 1.04, duration: 0.2 }));
        btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, duration: 0.2 }));
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative mx-auto max-w-6xl px-5 pb-16">
      <div className="pointer-events-none absolute -left-20 top-12 h-56 w-56 rounded-full bg-safeBlue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-64 w-64 rounded-full bg-safeTeal/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-[62%] h-52 w-52 rounded-full bg-safeDarkTeal/30 blur-3xl" />
      <section className="grid min-h-[76vh] items-center gap-8 pt-8 md:grid-cols-2">
        <div>
          <h1 className="hero-title font-display text-4xl font-bold leading-tight text-safeLight md:text-6xl">
            AI-Powered Drug Safety, Built for Faster Clinical Decisions.
          </h1>
          <p className="hero-sub mt-5 max-w-xl text-lg text-safeLight/80">
            SafeDose checks medication interactions instantly and provides clear, cautious guidance through an AI medical assistant.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-4">
            <Link to="/dashboard" className="gsap-button cta-button rounded-xl bg-safeBlue px-6 py-3 font-semibold text-safeLight">
              Go to Checker
            </Link>
            <Link
              to="/medical-chat"
              className="gsap-button cta-button rounded-xl border border-safeLight/30 bg-safeDarkTeal/70 px-6 py-3 font-semibold"
            >
              Ask AI
            </Link>
          </div>
        </div>
        <div className="reveal glass-panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-safeBlue">Precision-first triage</p>
          <h2 className="mt-4 font-display text-3xl">Built for students, pharmacists, and clinicians.</h2>
          <p className="mt-4 text-safeLight/75">
            Fast interaction severity alerts with clean risk language and structured recommendations.
          </p>
        </div>
      </section>

      <section className="features reveal mt-10 grid gap-5 md:grid-cols-3">
        {[
          "Interaction severity scoring",
          "AI-assisted medication Q&A",
          "Calm, healthcare-grade interface",
        ].map((feature) => (
          <article key={feature} className="feature-card glass-panel rounded-2xl p-6">
            <h3 className="font-display text-xl">{feature}</h3>
            <p className="mt-3 text-safeLight/75">
              Purposefully designed for quick comprehension, with premium visuals and motion feedback.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Home;

