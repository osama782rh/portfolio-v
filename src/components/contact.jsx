import React, { useMemo, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/contact.css";

const SERVICE_ID = import.meta?.env?.VITE_EMAILJS_SERVICE_ID || 'service_r03520k';
const TEMPLATE_ID = import.meta?.env?.VITE_EMAILJS_TEMPLATE_ID || 'template_e3uf0wt';
const PUBLIC_KEY = import.meta?.env?.VITE_EMAILJS_PUBLIC_KEY || 'qYEcejfCKA0EF7rpq';

export default function Contact() {
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v || "").trim());

  const disabled = useMemo(() => {
    return (
      loading ||
      !data.name.trim() ||
      !isValidEmail(data.email) ||
      data.message.trim().length < 10 ||
      data.message.length > 2000 ||
      !consent
    );
  }, [data, loading, consent]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 2000) return;
    setData((s) => ({ ...s, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();           // ← s’exécute bien grâce à noValidate
    if (hp) return;

    // validation côté JS (messages clairs)
    if (!data.name.trim()) return toast.warn("Ton nom est requis.");
    if (!isValidEmail(data.email)) return toast.warn("Entre une adresse email valide.");
    if (data.message.trim().length < 10) return toast.warn("Message trop court (min 10 caractères).");
    if (!consent) return toast.warn("Merci d’accepter la case consentement.");

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Configuration EmailJS manquante (.env).");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
          to_name: "Osama Rahim",
          to_email: "osama.rahim@outlook.fr",
        },
        PUBLIC_KEY
      );
      toast.success("Message envoyé ✅");
      setData({ name: "", email: "", phone: "", message: "" });
      setTouched({});
    } catch (err) {
      console.error(err);
      toast.error("Échec de l’envoi. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <header className="contact__head">
          <h2 id="contact-title">Contact</h2>
          <p className="muted">Une idée, une opportunité, une question ? Écris-moi — je réponds vite.</p>
        </header>

        <form className="contact__form" onSubmit={onSubmit} noValidate aria-describedby="contact-desc">
          <p id="contact-desc" className="sr-only">Formulaire de contact vers Osama Rahim</p>

          {/* Honeypot */}
          <label className="sr-only" htmlFor="company">Company</label>
          <input id="company" name="company" className="hp" type="text" value={hp} onChange={(e)=>setHp(e.target.value)} />

          {/* Nom */}
          <div className={`field floating ${touched.name && !data.name.trim() ? "error" : ""}`}>
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" type="text" value={data.name} onChange={onChange} onBlur={onBlur} required maxLength={120} placeholder=" " />
            {touched.name && !data.name.trim() && <span className="err">Requis</span>}
          </div>

          {/* Email */}
          <div className={`field floating ${touched.email && !isValidEmail(data.email) ? "error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={data.email} onChange={onChange} onBlur={onBlur} required placeholder=" " />
            {touched.email && !isValidEmail(data.email) && <span className="err">Email invalide</span>}
          </div>

          {/* Téléphone */}
          <div className="field floating">
            <label htmlFor="phone">Téléphone <span className="muted">(optionnel)</span></label>
            <input id="phone" name="phone" type="tel" value={data.phone} onChange={onChange} placeholder=" " />
          </div>

          {/* Message */}
          <div className={`field floating ${touched.message && data.message.trim().length < 10 ? "error" : ""}`}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" value={data.message} onChange={onChange} onBlur={onBlur} required placeholder=" " />
            <div className="hint">{data.message.length}/2000</div>
            {touched.message && data.message.trim().length < 10 && <span className="err">Au moins 10 caractères</span>}
          </div>

          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
            <span>J’accepte que mes informations soient utilisées pour être recontacté.</span>
          </label>

          <div className="actions">
            <button className="btn btn-primary btn-send" type="submit" disabled={disabled} aria-busy={loading}>
              <span className="btn-ico" aria-hidden>✈</span>
              {loading ? "Envoi…" : "Envoyer"}
            </button>
            <a className="btn btn-ghost" href="mailto:osama.rahim@outlook.fr">Envoyer un email</a>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={4000} closeOnClick pauseOnHover theme="dark" />
    </section>
  );
}
