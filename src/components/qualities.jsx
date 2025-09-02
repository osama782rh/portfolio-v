import React from "react";
import "../style/qualities.css";

export default function Qualities() {
  const qualities = [
    { title: "Précis", text: "Sens du détail et rigueur dans l’exécution." },
    { title: "Curieux", text: "Veille techno et apprentissage continu." },
    { title: "Créatif", text: "Solutions simples et élégantes." },
    { title: "Autonome", text: "Organisation, priorisation et ownership." },
    { title: "Solutionniste", text: "Focalisé sur la résolution concrète." },
  ];

  return (
    <section id="qualities" className="qualities-section">
      <div className="container">
        <h2 className="title">Mes qualités</h2>
        <div className="qualities-grid">
          {qualities.map((q) => (
            <article key={q.title} className="quality-card">
              <h3 className="q-title">{q.title}</h3>
              <p className="q-text">{q.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
