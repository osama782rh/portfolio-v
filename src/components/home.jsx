// src/components/Home.jsx — One‑page avec sections ancrées + barre de progression de scroll
import React, { useEffect, useState } from "react";
import Header from "./header";
import About from "./about";
import Skills from "./skills";
import Projects from "./projects";
import Certifications from "./certifications";
import Contact from "./contact";

// Petite barre de progression en haut de la page
function PageProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{position:"fixed", inset:"0 0 auto 0", height:4, zIndex:70, background:"transparent"}} aria-hidden>
      <div style={{height:"100%", width: progress + "%", transition:"width .1s linear", background:"linear-gradient(90deg, var(--brand-1), var(--brand-2))", boxShadow:"0 2px 10px rgba(0,0,0,.25)"}} />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <PageProgress />

      {/* Chaque section a un id qui correspond à la navbar + la classe section-anchor pour l'offset */}
      <section id="home" className="section-anchor">
        <Header />
      </section>

      <section id="about" className="section-anchor">
        <About />
      </section>

      <section id="skills" className="section-anchor">
        <Skills />
      </section>

      <section id="projects" className="section-anchor">
        <Projects />
      </section>

      <section id="certifications" className="section-anchor">
        <Certifications />
      </section>

      <section id="contact" className="section-anchor">
        <Contact />
      </section>
    </main>
  );
}
