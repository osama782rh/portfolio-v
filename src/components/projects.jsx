import React, { useMemo, useState, useEffect } from "react";
import "../style/projects.css";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

/* 🔽 Importe tes images — renomme les fichiers “web-safe” (minuscules, tirets) */
import sortImg from "../assets/Projets/esiee-it_sort.png";
import planitImg from "../assets/Projets/planit.png";
import stellarisImg from "../assets/Projets/stellarisevalbot.png";
import breastImg from "../assets/Projets/breastcancer.png";
import neigeImg from "../assets/Projets/neigedelantarctique.png"; // évite les apostrophes !
import ecoImg from "../assets/Projets/ecosysteme.png";
import galacticImg from "../assets/Projets/galactic.png";

const RAW = [
  {
    title: "Algos de tri",
    desc: "Comparaison d’algorithmes de tri (vitesse/mémoire) + algorithme hybride en C & Python.",
    img: sortImg,
    github: "https://github.com/osama782rh/Sorting-Algo",
    demo: null,
    tech: ["C", "Python"],
  },
  {
    title: "Planit",
    desc: "App mobile gestion tâches, calendriers et contacts. Stack Flutter + Firebase.",
    img: planitImg,
    github: "https://github.com/osama782rh/Projet-Mobile",
    demo: null,
    tech: ["Flutter", "Firebase"],
  },
  {
    title: "Stellaris Eval Bot",
    desc: "Robot en Assembleur : avancer, tourner, comportements bas niveau.",
    img: stellarisImg,
    github: "https://github.com/osama782rh/Robot-Stellaris",
    demo: null,
    tech: ["Assembleur"],
  },
  {
    title: "Breast Cancer",
    desc: "Préparation de données + réseau de neurones (TensorFlow) pour diagnostic.",
    img: breastImg,
    github: "https://github.com/osama782rh/BreastCancerDiagnostic",
    demo: null,
    tech: ["Python", "TensorFlow"],
  },
  {
    title: "Neige de l’Antarctique",
    desc: "Scène Unity (Shader Graph, tessellation, particules).",
    img: neigeImg,
    github: "https://github.com/osama782rh/Neige-de-l-Antarctique",
    demo: null,
    tech: ["Unity"],
  },
  {
    title: "Éco Système",
    desc: "Simulation C++ : loups, moutons, herbe — comportements et survie.",
    img: ecoImg,
    github: "https://github.com/osama782rh/ProjetEcoSysteme",
    demo: null,
    tech: ["C++"],
  },
  {
    title: "Galactic VR",
    desc: "Scène VR dans un vaisseau spatial (Unity) avec interactions.",
    img: galacticImg,
    github: "https://github.com/osama782rh/VR-Galactic",
    demo: null,
    tech: ["Unity"],
  },
];

export default function Projects() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("Tous");
  const [active, setActive] = useState(null); // projet modale

  // Tags uniques à partir des projets
  const tags = useMemo(() => {
    const s = new Set();
    RAW.forEach(p => p.tech.forEach(t => s.add(t)));
    return ["Tous", ...Array.from(s)];
  }, []);

  // Filtrage
  const projects = useMemo(() => {
    const query = q.trim().toLowerCase();
    return RAW.filter(p => {
      const matchText =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query);
      const matchTag = tag === "Tous" || p.tech.includes(tag);
      return matchText && matchTag;
    });
  }, [q, tag]);

  // ESC pour fermer modale
  useEffect(() => {
    const onKey = e => e.key === "Escape" && setActive(null);
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects-head">
          <h2 id="projects-title" className="title">Mes Projets</h2>

          <div className="toolbar">
            <div className="tags" role="tablist" aria-label="Filtrer par techno">
              {tags.map(t => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tag === t}
                  className={`tag ${tag === t ? "active" : ""}`}
                  onClick={() => setTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <input
              className="search"
              type="search"
              placeholder="Rechercher un projet…"
              value={q}
              onChange={e => setQ(e.target.value)}
              aria-label="Rechercher un projet"
            />
          </div>
        </div>

        <div className="grid" role="list">
          {projects.map(p => (
            <article key={p.title} role="listitem" className="card">
              <button className="thumb" onClick={() => setActive(p)} aria-label={`Aperçu: ${p.title}`}>
                <img loading="lazy" src={p.img} alt={p.title} />
              </button>

              <div className="card-body">
                <h3 className="name">{p.title}</h3>
                <p className="desc">{p.desc}</p>

                <div className="chips">
                  {p.tech.map(t => (
                    <button key={t} className="chip" onClick={() => setTag(t)} title={`Filtrer: ${t}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="actions">
                  {p.github && (
                    <a className="btn btn-ghost" href={p.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub aria-hidden /> <span>GitHub</span>
                    </a>
                  )}
                  {p.demo && (
                    <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink aria-hidden /> <span>Démo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modale */}
      {active && (
        <div className="proj-modal" role="dialog" aria-modal="true" aria-label={`Aperçu: ${active.title}`} onClick={() => setActive(null)}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <img src={active.img} alt={active.title} />
            <div className="modal-body">
              <h3>{active.title}</h3>
              <p>{active.desc}</p>
              <div className="chips">
                {active.tech.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <div className="actions">
                {active.github && (
                  <a className="btn btn-ghost" href={active.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub aria-hidden /> <span>GitHub</span>
                  </a>
                )}
                {active.demo && (
                  <a className="btn btn-primary" href={active.demo} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink aria-hidden /> <span>Démo</span>
                  </a>
                )}
                <button className="btn" onClick={() => setActive(null)}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
