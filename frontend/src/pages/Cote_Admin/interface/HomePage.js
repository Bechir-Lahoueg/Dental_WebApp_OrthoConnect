import React from 'react';
import './HomePage.css';  // Importer le fichier CSS

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Barre de navigation */}
      <div className="homepage-navbar">
        {/* Logo et Nom du site */}
        <div className="homepage-logo-container">
          <div className="homepage-logo">
            {/* Image du logo */}
            <img 
              src="/logoo.png" 
              alt="Logo OrthoConnect" 
              style={{ width: '50px', height: '50px' }} 
            />
          </div>
          <span className="homepage-site-name">
            <span className="homepage-ortho">Ortho</span>
            <span className="homepage-connect">Connect</span>
          </span>
        </div>

        {/* Liens de navigation */}
        <div className="homepage-nav-links">
          <a href="/" className="homepage-nav-link">Accueil</a>
          <a href="/pricingpage" className="homepage-nav-link">Voir nos plans</a>
          <a href="/logindentiste" className="homepage-nav-link">Se connecter</a>
          <a href="/about" className="homepage-nav-link">À propos</a>

          {/* Icône de recherche */}
          <span className="homepage-search-icon">&#128269;</span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="homepage-main-content">
        <h1>
          <span>Simplifiez votre gestion dentaire</span>
          <span className="homepage-highlight"> dès aujourd'hui !</span>
        </h1>
        <p>
          "Révolutionnez votre pratique dentaire en simplifiant la gestion des demandes des patients et en collaborant efficacement avec un réseau mondial de prothésistes. Optimisez vos soins et améliorez l'efficacité de votre cabinet, tout cela avec une plateforme facile à utiliser, accessible où que vous soyez."
        </p>
      </div>
    </div>
  );
};

export default HomePage;
