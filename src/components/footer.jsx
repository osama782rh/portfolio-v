// Footer.jsx — Footer premium complet (ancrages, stack, newsletter, back-to-top)
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "../style/footer.css";

// Icônes locales
import Linkedin from "../assets/Technos/linkedin.png";
import Github from "../assets/Technos/github.png";
import HackerRank from "../assets/Technos/hackerRank.jpeg";

export default function Footer() {
  // Force "dark" par défaut si rien n'est enregistré
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem("theme");
      return (saved === "light" || saved === "dark") ? saved : "dark";
    } catch {
      return "dark";
    }
  };

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // === Scroll top visibility ===
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // === Newsletter state ===
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    localStorage.getItem("nl_subscribed") === "1" ? "done" : "idle"
  );
  const [hp, setHp] = useState(""); // honeypot

  // Petite aide : on peut piloter un message via ?nl=ok|ko
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("nl");
    if (p === "ok") {
      setStatus("done");
      localStorage.setItem("nl_subscribed", "1");
      alert("Inscription confirmée ✅ Merci !");
    } else if (p === "ko") {
      alert("Oups, l’inscription n’a pas pu être confirmée.");
    }
  }, []);

  // === Liens / badges ===
  const quickLinks = [
    { href: "#home", label: "Accueil" },
    { href: "#about", label: "À propos" },
    { href: "#skills", label: "Compétences" },
    { href: "#projects", label: "Projets" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
  ];

  const stack = [
    "React",
    "TypeScript",
    "Java",
    "Python",
    "C/C++",
    "Azure DevOps",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Selenium",
    "UFT",
  ];

  // === Config provider (Vite/CRA) ===
  const cfg = useMemo(() => {
    const vite =
      typeof import.meta !== "undefined" && import.meta && import.meta.env
        ? import.meta.env
        : {};
    const cra = typeof process !== "undefined" && process.env ? process.env : {};
    return {
      endpoint:
        vite.VITE_NEWSLETTER_ENDPOINT ||
        cra.REACT_APP_NEWSLETTER_ENDPOINT ||
        "",
      mailto:
        vite.VITE_NEWSLETTER_MAILTO ||
        cra.REACT_APP_NEWSLETTER_MAILTO ||
        "osama.rahim@outlook.fr",
      secret:
        vite.VITE_NEWSLETTER_SECRET || cra.REACT_APP_NEWSLETTER_SECRET || "",
    };
  }, []);

  // === Utils ===
  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v || "").trim());

  const subscribe = async (e) => {
    e.preventDefault();
    if (status === "done" || loading) return;

    const value = email.trim();
    if (hp) return; // bot
    if (!isValidEmail(value)) {
      alert("Entre une adresse email valide, stp.");
      return;
    }

    setLoading(true);
    try {
      if (cfg.endpoint) {
        const res = await fetch(cfg.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: value,
            source: "portfolio",
            timestamp: new Date().toISOString(),
            secret: cfg.secret || undefined,
          }),
        });

        if (res.ok || res.status === 409) {
          setStatus("done");
          localStorage.setItem("nl_subscribed", "1");
          alert(res.status === 409 ? "Adresse déjà inscrite ✅" : "Merci ! 🎉 Vérifie ta boîte mail si double opt-in.");
        } else {
          const msg = await safeText(res);
          throw new Error(msg || `Erreur ${res.status}`);
        }
      } else {
        // Fallback mailto (zéro backend)
        const subject = encodeURIComponent("Inscription newsletter");
        const body = encodeURIComponent(
          `Bonjour,\n\nJe souhaite m'inscrire à la newsletter avec l'adresse : ${value}\nSource: portfolio\nDate: ${new Date().toLocaleString()}\n`
        );
        window.location.href = `mailto:${cfg.mailto}?subject=${subject}&body=${body}`;
        alert("Ouverture de ton client mail… envoie le message pour finaliser 👍");
      }
    } catch (err) {
      console.error(err);
      alert("Impossible d’inscrire pour le moment. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  async function safeText(r) {
    try {
      return await r.text();
    } catch {
      return "";
    }
  }

  return (
    <footer className="pro-footer" aria-labelledby="footer-title">
      <div className="footer-wrap">
        {/* Bandeau de valeur */}
        <div className="footer-cta">
          <h2 id="footer-title" className="footer-title">
            Travaillons ensemble.
          </h2>
          <p className="footer-sub">
            Disponible pour CDI / Freelance. Réponse sous 24–48h.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#contact">
              Me contacter
            </a>
            <a className="btn btn-ghost" href="#projects">
              Voir mes projets
            </a>
          </div>
        </div>

        {/* Grille principale */}
        <div className="footer-grid">
          {/* À propos court */}
          <section className="col about">
            <h3 className="col-title">À propos</h3>
            <p className="about-text">
              Ingénieur logiciel & DevOps orienté qualité et automatisation.
              J’aime concevoir des solutions simples, robustes et mesurables,
              avec une chaîne CI/CD propre.
            </p>

            <ul className="contact-list" aria-label="Coordonnées">
              <li>
                <span className="ico">@</span>
                <a href="mailto:osama.rahim@outlook.fr">
                  osama.rahim@outlook.fr
                </a>
              </li>
              <li>
                <span className="ico">☎</span>
                <a href="tel:+33765668282">+33 7 65 66 82 82</a>
              </li>
              <li>
                <span className="ico">📍</span>
                Île-de-France, FR (ou Remote)
              </li>
            </ul>

            <div className="social">
              <a
                href="https://www.linkedin.com/in/osama-rahim"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Linkedin} alt="" />
              </a>
              <a
                href="https://github.com/osama782rh"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Github} alt="" />
              </a>
              <a
                href="https://www.hackerrank.com/profile/osama_rahim"
                aria-label="HackerRank"
                target="_blank"
                rel="noreferrer"
              >
                <img src={HackerRank} alt="" />
              </a>
            </div>
          </section>

          {/* Liens rapides */}
          <nav className="col links" aria-label="Liens rapides">
            <h3 className="col-title">Navigation</h3>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Stack / compétences clés */}
          <section className="col stack">
            <h3 className="col-title">Stack & expertises</h3>
            <div className="badges">
              {stack.map((s) => (
                <span key={s} className="badge">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="col newsletter">
            <h3 className="col-title">Newsletter</h3>
            <p className="muted">
              Reçois mes actus (projets open-source, articles dev & CI/CD).
            </p>
            <form className="news-form" onSubmit={subscribe}>
              <label htmlFor="news-email" className="sr-only">
                Email
              </label>
              <input
                id="news-email"
                type="email"
                inputMode="email"
                placeholder="ton.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || status === "done"}
                aria-disabled={loading || status === "done"}
                aria-label="Adresse email pour la newsletter"
              />
              {/* Honeypot (anti-bot) */}
              <input
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="sr-only"
                aria-hidden="true"
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || status === "done"}
                aria-busy={loading ? "true" : "false"}
              >
                {status === "done" ? "Inscrit ✓" : loading ? "…" : "S’inscrire"}
              </button>
              <span className="sr-only" aria-live="polite">
                {status === "done" ? "Inscription validée" : ""}
              </span>
            </form>
            <p className="tiny">Pas de spam. Désinscription en un clic.</p>
          </section>
        </div>

        {/* Bandeau bas */}
        <div className="footer-bottom">
          <div className="legal">
            <span>© {year} Osama Rahim</span>
            <span className="sep">•</span>
            <a href="#home">Portfolio</a>
            <span className="sep">•</span>
            <span>Fait avec React</span>
          </div>
          <div className="credits">
            <span>Design & code par Osama Rahim</span>
          </div>
        </div>
      </div>

      {/* Boutons flottants rendus dans <body> pour ne pas impacter le footer */}
      {createPortal(
        <>
          <button
            type="button"
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "light"}
            aria-label={
              theme === "dark"
                ? "Activer le thème clair"
                : "Activer le thème sombre"
            }
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
          >
            <span className="ico" aria-hidden>
              {theme === "dark" ? "☀" : "🌙"}
            </span>
          </button>

          <button
            type="button"
            aria-label="Remonter en haut"
            className={`scroll-top ${showTop ? "visible" : ""}`}
            onClick={scrollTop}
          >
            ↑
          </button>
        </>,
        document.body
      )}
    </footer>
  );
}
