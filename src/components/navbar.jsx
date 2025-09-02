import React, { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import "../style/navbar.css";

/** Navbar one-page avec liens ancres (#about, #skills, …)
 *  Pas de HashLink requis. On utilise des <a href="#..."> + CSS scroll-behavior.
 */
export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(y > 10);
          setIsHidden(y > lastY.current && y > 80);
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const goHome = () => {
    closeMenu();
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`nav-root ${isHidden ? "nav-hidden" : ""} ${scrolled ? "nav-scrolled" : ""}`}>
      <nav className="navbar container">
        <button
          type="button"
          className="logo-button"
          aria-label="Aller à l'accueil"
          onClick={goHome}
        >
          <Logo />
        </button>

        <button
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span /><span /><span />
        </button>

        <ul id="primary-navigation" className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {[
            { href: "#home", label: "Accueil" },
            { href: "#about", label: "À propos" },
            { href: "#skills", label: "Compétences" },
            { href: "#projects", label: "Projets" },
            { href: "#certifications", label: "Certifications" },
            { href: "#contact", label: "Contact" },
          ].map(item => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu} className="nav-link">
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
