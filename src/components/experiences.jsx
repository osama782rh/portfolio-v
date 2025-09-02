import React from "react";
import "../style/experiences.css";

export default function Experiences() {
  const items = [
    {
      period: "Sept. 2022 – Sept. 2025",
      company: "Rexel France (Alternance)",
      roles: [
        {
          title: "Automaticien (Selenium, UFT)",
          bullets: [
            "Développement de cas de test automatisés pour applications web et de bureau (Selenium, UFT).",
            "Exécution, débogage et maintenance des scripts de test pour garantir la qualité logicielle.",
          ],
        },
        {
          title: "DevOps CI/CD Integration (Azure)",
          bullets: [
            "Mise en place et gestion de pipelines CI/CD avec Azure DevOps.",
            "Intégration du code, des tests automatisés et du déploiement pour améliorer l’efficacité des flux.",
          ],
        },
      ],
    },
    {
      period: "2020 – 2021 (2 mois)",
      company: "T-Express",
      roles: [
        {
          title: "Développeur Web (PHP, SQL)",
          bullets: [
            "Conception et développement d’applications web avec Laravel et SQL.",
            "Auth, traitement des données et logique backend.",
          ],
        },
      ],
    },
    {
      period: "2020 (2 mois)",
      company: "Renault Service Plus",
      roles: [
        {
          title: "Développeur Web (React, HTML, CSS)",
          bullets: [
            "Création d’interfaces responsives avec React et production d’un code HTML/CSS propre et maintenable.",
          ],
        },
      ],
    },
  ];

  return (
    <section id="experiences" className="xp-section">
      <div className="xp-container">
        <header className="xp-head">
          <h2 className="xp-title">Expériences</h2>
          <p className="xp-sub">Principales missions et réalisations</p>
        </header>

        <ol className="timeline">
          {items.map((item, idx) => (
            <li className="xp" key={idx}>
              <div className="xp-marker" aria-hidden="true" />
              <div className="xp-card">
                <div className="xp-meta">
                  <span className="xp-period">{item.period}</span>
                  <span className="xp-sep">·</span>
                  <span className="xp-company">{item.company}</span>
                </div>

                {item.roles.map((role, rIdx) => (
                  <article className="xp-role" key={rIdx}>
                    <h3 className="xp-role-title">{role.title}</h3>
                    <ul className="xp-list">
                      {role.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
