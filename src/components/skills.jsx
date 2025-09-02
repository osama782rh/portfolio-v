import React from 'react';
import '../style/skills.css';

import javaImage from '../assets/Technos/java.svg';
import pythonImage from '../assets/Technos/python.svg';
import dartImage from '../assets/Technos/dart.png';
import flutterImage from '../assets/Technos/flutter.svg';
import androidImage from '../assets/Technos/android.svg';
import swiftImage from '../assets/Technos/swift.svg';
import angularImage from '../assets/Technos/angular.svg';
import reactImage from '../assets/Technos/react.svg';
import phpImage from '../assets/Technos/php.svg';
import jsImage from '../assets/Technos/js.svg';
import tsImage from '../assets/Technos/ts.svg';
import vbscriptImage from '../assets/Technos/vbscript.png';
import uftImage from '../assets/Technos/uft.png';
import azureImage from '../assets/Technos/azure.png';
import kubernetesImage from '../assets/Technos/kubernetes.png';
import cicdImage from '../assets/Technos/cicd.png';
import dockerImage from '../assets/Technos/docker.svg';
import csharpImage from '../assets/Technos/csharp.png';
import cImage from '../assets/Technos/c.svg';
import cppImage from '../assets/Technos/cpp.png';
import assemblerImage from '../assets/Technos/asm.png';
import windowsImage from '../assets/Technos/windows.png';
import linuxImage from '../assets/Technos/linux.jpg';
import macosImage from '../assets/Technos/macos.jpg';
import anacondaImage from '../assets/Technos/anaconda.png';
import tensorflowImage from '../assets/Technos/tensorflow.png';
import raylibImage from '../assets/Technos/raylib.png';
import unityImage from '../assets/Technos/unity.jpg';

export default function Skills() {
  // Ajuste ANGLE (degrés) et r (rayon) par groupe si besoin.
  const groups = [
    {
      label: 'DevOps / CI-CD',
      angle: -120, r: '310px',
      items: [
        { name: 'Azure DevOps', icon: azureImage },
        { name: 'Docker', icon: dockerImage },
        { name: 'Kubernetes', icon: kubernetesImage },
        { name: 'CI/CD', icon: cicdImage },
        { name: 'UFT (QA)', icon: uftImage },
        { name: 'VBScript', icon: vbscriptImage },
      ],
    },
    {
      label: 'Data / IA & 3D',
      angle: -20, r: '285px',
      items: [
        { name: 'TensorFlow', icon: tensorflowImage },
        { name: 'Anaconda', icon: anacondaImage },
        { name: 'Unity', icon: unityImage },
        { name: 'raylib', icon: raylibImage },
      ],
    },
    {
      label: 'OS & Environnements',
      angle: 35, r: '305px',
      items: [
        { name: 'Windows', icon: windowsImage },
        { name: 'Linux', icon: linuxImage },
        { name: 'macOS', icon: macosImage },
      ],
    },
    {
      label: 'Front-End / Mobile',
      angle: 150, r: '335px',
      items: [
        { name: 'JavaScript', icon: jsImage },
        { name: 'TypeScript', icon: tsImage },
        { name: 'React', icon: reactImage },
        { name: 'Angular', icon: angularImage },
        { name: 'Flutter', icon: flutterImage },
        { name: 'Android', icon: androidImage },
        { name: 'Swift', icon: swiftImage },
        { name: 'Dart', icon: dartImage },
      ],
    },
    {
      label: 'Back-End',
      angle: 205, r: '330px',
      items: [
        { name: 'Python', icon: pythonImage },
        { name: 'Java', icon: javaImage },
        { name: 'C#', icon: csharpImage },
        { name: 'C++', icon: cppImage },
        { name: 'C', icon: cImage },
        { name: 'Assembleur', icon: assemblerImage },
        { name: 'PHP', icon: phpImage },
      ],
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="title">Arbre de compétences</h2>
        <div className="tree">
          <div className="axis axis-v" />
          <div className="axis axis-h" />
          <div className="core">Core</div>

          {groups.map((g) => (
            <div
              key={g.label}
              className="branch"
              style={{ '--angle': `${g.angle}deg`, '--radius': g.r }}
            >
              {/* bras */}
              <span className="arm" aria-hidden="true" />

              {/* point d’ancrage au bout du bras */}
              <div className="anchor" aria-hidden="true" />

              {/* carte alignée sur l’ancre (haut-centre), dés-rotée */}
              <div className="group-card">
                <p className="group-title">{g.label}</p>
                <div className="icons">
                  {g.items.map((it) => (
                    <div className="icon" key={it.name} title={it.name}>
                      <img src={it.icon} alt={it.name} />
                      <span>{it.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
