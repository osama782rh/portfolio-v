import React from "react";
import "../style/qualities.css";

export default function Qualities() {
  const qualities = [
    { emoji: "🎯", title: "Précis",        text: "Sens du détail et rigueur dans l’exécution." },
    { emoji: "🔎", title: "Curieux",       text: "Veille techno et apprentissage continu." },
    { emoji: "💡", title: "Créatif",       text: "Solutions simples et élégantes." },
    { emoji: "🧭", title: "Autonome",      text: "Organisation, priorisation et ownership." },
    { emoji: "🧩", title: "Solutionniste", text: "Focalisé sur la résolution concrète." },
  ];

  return (
    <section id="qualities" className="qualities-section">
      <div className="container">
        <h2 className="title">Mes qualités</h2>
        <div className="qualities-grid">
          {qualities.map((q) => (
            <article key={q.title} className="quality-card">
              <span className="q-emoji" role="img" aria-label={q.title}>
                {q.emoji}
              </span>
              <h3 className="q-title">{q.title}</h3>
              <p className="q-text">{q.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
