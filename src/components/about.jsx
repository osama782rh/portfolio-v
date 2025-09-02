import React from "react";
import "../style/about.css";
import profileImage from "../assets/profil.png";
import cvFile from "../assets/Cv/cv_rahim_osama_ingenieur_fullstack.pdf"; // 🔹 import du PDF

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          {/* Colonne image */}
          <div className="image-col">
            <div className="image-card">
              <span className="ring" aria-hidden="true" />
              <img
                src={profileImage}
                alt="Photo de profil — Osama Rahim"
                className="about-image"
              />
            </div>
          </div>

          {/* Colonne texte */}
          <div className="text-col">
            <h2 className="title">À propos de moi</h2>
            <p className="lead">
              Ingénieur informatique et DevOps, je conçois des solutions
              logicielles fiables et performantes. Je maîtrise la mise en place
              de pipelines CI/CD pour des déploiements rapides et sûrs.
            </p>

            <ul className="bullets">
              <li>Back-end : Java, Python, C++</li>
              <li>DevOps : Azure DevOps, Docker, Terraform, CI/CD</li>
              <li>Qualité : Tests & QA Automation (Selenium)</li>
            </ul>

            <div className="stats">
              <div className="stat">
                <div className="v">+10</div>
                <div className="k">Projets</div>
              </div>
              <div className="stat">
                <div className="v">5+</div>
                <div className="k">Certifications</div>
              </div>
              <div className="stat">
                <div className="v">CI/CD</div>
                <div className="k">Azure DevOps</div>
              </div>
            </div>

            <div className="chips">
              <span className="chip">Java</span>
              <span className="chip">Python</span>
              <span className="chip">C++</span>
              <span className="chip">Docker</span>
              <span className="chip">Terraform</span>
            </div>

            {/* CTA Row avec bouton CV */}
            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">
                Voir mes projets
              </a>
              <a href="#contact" className="btn btn-ghost">
                Me contacter
              </a>
              <a
                href={cvFile}
                download="cv_rahim_osama.pdf"
                className="btn btn-ghost"
              >
                Télécharger CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
