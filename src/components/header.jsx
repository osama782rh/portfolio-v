// Header.jsx — Hero section premium (rotateur + CTA)
import React, { useEffect, useRef } from "react";
import "../style/header.css";

export default function Header() {
  const rotatingRef = useRef(null);

  useEffect(() => {
    const el = rotatingRef.current;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || mediaQuery.matches) return;

    const words = [
      "Ingénieur logiciel",
      "Développeur Web",
      "DevOps-friendly",
      "Problem Solver",
    ];
    let i = 0;
    const tick = () => {
      i = (i + 1) % words.length;
      el.classList.remove("fade-in");
      void el.offsetWidth; // reflow to restart animation
      el.textContent = words[i];
      el.classList.add("fade-in");
    };
    const id = setInterval(tick, 2200);
    return () => clearInterval(id);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="hero" role="banner" aria-label="En-tête du site" id="home">
      {/* Arrière-plan esthétique */}
      <div className="hero-bg">
        <div className="bg-gradient" aria-hidden="true" />
        <div className="bg-blur-blob blob-1" aria-hidden="true" />
        <div className="bg-blur-blob blob-2" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="hero-content container">
        <h1 className="title" aria-label="RAHIM Osama, Ingénieur Informatique">
          <span className="title-line">
            RAHIM <span className="highlight">Osama</span>
          </span>
        </h1>

        <p className="subtitle">
          <span className="subtitle-static">Développeur d'applications • </span>
          <span className="subtitle-rotating fade-in" ref={rotatingRef}>
            Ingénieur logiciel
          </span>
        </p>

        <div className="cta-wrap">
          <button
            className="btn btn-primary"
            onClick={scrollToAbout}
            aria-label="Aller à la section À propos"
          >
            Plus d'info
          </button>
          <a href="#contact" className="btn btn-ghost" aria-label="Aller à la section Contact">
            Me contacter
          </a>
        </div>

        <div className="scroll-cue" onClick={scrollToAbout} aria-hidden="true">
          <span className="mouse" />
          <span className="arrow" />
        </div>
      </div>
    </header>
  );
}
