import React from "react";
import Navbar from "./components/navbar";
import Header from "./components/header";
import About from "./components/about";
import Certifications from "./components/certifications";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Qualities from "./components/qualities";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Experiences from "./components/experiences";
import { ToastContainer } from "react-toastify";           // ← AJOUT
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Certifications />
      <Projects />
      <Experiences />
      <Skills />
      <Qualities />
      <Contact />
      <Footer />

      {/* Conteneur des toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
