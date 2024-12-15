import React from 'react';
import './Portfolio.css';

function Portfolio() {
  // Vous pouvez modifier ces données selon vos projets
  const portfolioData = {
    name: "OrthoConnect",
    title: "CREATIVE DIRECTOR",
    projects: [
      {
        id: 1,
        name: "Page connexion",
        description: "Cette page est dédiée à la connexion et diffère selon que vous êtes dentiste ou prothésiste.",
        // Remplacez l'URL par celle de votre image
        image: "/5.png"
      },
      {
        id: 2,
        name: "Tableau de bord",
        description: "Un tableau de bord est une interface visuelle intuitive qui centralise et affiche les données essentielles en temps réel. Il s’adapte en fonction que l’utilisateur soit dentiste ou prothésiste, avec des options modulables selon le type d’abonnement choisi.",
        image: "/6.png"
      },
      {
        id: 3,
        name: "Liste ajout des patients",
        description: "Cette liste concerne l'ajout des clients, ainsi que leur modification ou suppression.",
        image: "/7.png"
      },
      {
        id: 4,
        name: "Page d'ajout des demandes",
        description: "La page d’ajout des demandes permet de créer et soumettre de nouvelles requêtes en saisissant les informations nécessaires. Elle est conçue pour simplifier le processus de gestion des demandes.",
        image: "/9.png"
      }
      
    ]
  };
  

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>{portfolioData.name}</h1>
        <p className="title">{portfolioData.title}</p>
      </header>

      <section className="portfolio-content">
        <h2 className="section-title">Concernant ce Template</h2>
        
        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <div className={`project-item ${index % 2 === 0 ? 'left' : 'right'}`} key={project.id}>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-image">
                <img src={project.image} alt={project.name} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Portfolio;