import React, { useMemo, useState, useEffect } from "react";
import "../style/certifications.css";

// Images
import azureDevopsImg from "../assets/Certifications/AzureDevOpsforBeginners.png";
import githubImg from "../assets/Certifications/PractifcalGitHubProjectManagementandCollaboration.png";
import cybersecurityImg from "../assets/Certifications/CybersecurityFoundations.png";
import devsecopsImg from "../assets/Certifications/DevOpsFoundationsDevSecOps.png";
import csharpImg from "../assets/Certifications/csharp.png";
import javaImg from "../assets/Certifications/java.png";
import problemSolvingImg from "../assets/Certifications/problesolving.png";
import softwareEngineerInternImg from "../assets/Certifications/softwareengineerintern.png";
import softwareEngineerImg from "../assets/Certifications/software_engineer.png";
import cybersecurityThreatImg from "../assets/Certifications/CertificateOfCompletion_The Cybersecurity Threat Landscape.png";

export default function Certifications() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => [
      {
        title: "Practical GitHub Project Management and Collaboration",
        image: githubImg,
        link: "/certifications/github-project-management.pdf",
        tags: ["github", "collaboration"],
      },
      {
        title: "Azure DevOps for Beginners",
        image: azureDevopsImg,
        link: "/certifications/azure-devops-beginners.pdf",
        tags: ["azure", "devops", "ci/cd"],
      },
      {
        title: "Cybersecurity Foundations",
        image: cybersecurityImg,
        link: "/certifications/cybersecurity-foundations.pdf",
        tags: ["security"],
      },
      {
        title: "DevSecOps",
        image: devsecopsImg,
        link: "/certifications/devsecops.pdf",
        tags: ["security", "devops"],
      },
      {
        title: "Level Up C",
        image: csharpImg,
        link: "/certifications/level-up-c.pdf",
        tags: ["c"],
      },
      {
        title: "Java",
        image: javaImg,
        link: "/certifications/java-basic.pdf",
        tags: ["java"],
      },
      {
        title: "Problem Solving",
        image: problemSolvingImg,
        link: "/certifications/problem-solving-intermediate.pdf",
        tags: ["algorithms"],
      },
      {
        title: "Software Engineer Intern",
        image: softwareEngineerInternImg,
        link: "/certifications/software-engineer-intern.pdf",
        tags: ["career"],
      },
      {
        title: "Software Engineer",
        image: softwareEngineerImg,
        link: "/certifications/software-engineer.pdf",
        tags: ["career"],
      },
      {
        title: "Cybersecurity Threat Landscape",
        image: cybersecurityThreatImg,
        link: "/certifications/cybersecurity-threat-landscape.pdf",
        tags: ["security"],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.includes(q))
    );
  }, [query, items]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="certifications" className="certifications" aria-labelledby="cert-title">
      <div className="container">
        <div className="cert-head">
          <h2 id="cert-title" className="title">Certifications</h2>
          <input
            className="cert-search"
            type="search"
            placeholder="Rechercher (ex: Azure, Security, Java)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher une certification"
          />
        </div>

        <div className="cert-grid" role="list">
          {filtered.map((cert) => (
            <article key={cert.title} className="cert-card" role="listitem">
              <button
                className="cert-cover"
                onClick={() => setActive(cert)}
                aria-label={`Aperçu: ${cert.title}`}
              >
                <img loading="lazy" src={cert.image} alt={cert.title} />
              </button>
              <h3 className="cert-card-title">{cert.title}</h3>
              <div className="cert-actions">
                <button className="btn btn-ghost" onClick={() => setActive(cert)}>
                  Aperçu
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Aperçu: ${active.title}`}
          onClick={() => setActive(null)}
        >
          <div className="cert-modal-inner" onClick={(e) => e.stopPropagation()}>
            <img src={active.image} alt={active.title} />
            <div className="cert-modal-footer">
              <p className="cert-modal-title">{active.title}</p>
              <div className="spacer" />
              {active.link && (
                <a
                  className="btn btn-primary"
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir le PDF
                </a>
              )}
              <button className="btn btn-ghost" onClick={() => setActive(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
