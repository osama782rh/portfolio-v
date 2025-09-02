import React from "react";
import "../style/logo.css";

/** Logo simple, pas de <a> dedans pour éviter l'imbrication */
export default function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark">OR</span>
      <span className="logo-text">Osama Rahim</span>
    </div>
  );
}
