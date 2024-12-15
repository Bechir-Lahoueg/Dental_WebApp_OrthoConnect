import React from 'react';
import './PricingPage.css';

const PricingCard = ({ title, description, price, priceDetail, features, buttonText, hasAddon }) => {
  return (
    <div className="pricing-card">
      <div className="pricing-header">
        <h2 className="pricing-title">{title}</h2>
        <p className="pricing-description">{description}</p>
      </div>
      
      <div className="pricing-price">
        <div className="price">{price}</div>
        <div className="price-detail">{priceDetail}</div>
      </div>
      
      <button className={`pricing-button ${title === 'Premium' ? 'premium' : 'standard'}`}>
        {buttonText}
      </button>
      
      <div className="plan-details">
        <div className="details-title">Détails du plan :</div>
        <ul className="features-list">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="bullet"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function PricingPage() {
  const plans = {
    simple: {
      title: "Simple",
      description: "Ensemble limité d'avantages, que ce soit pour un dentiste ou un prothésiste.",
      price: "120 TND/mois",
      priceDetail: "",
      buttonText: "Contactez-nous pour plus de détails",
      features: [
        "---------------DENTISTE----------------------",
        "Un tableau de bord avec de nombreux détails et statistiques.",
        "Ajout de patients pour le dentiste, avec la possibilité de les éditer et de les supprimer.",
        "Un seul accès au site depuis un seul appareil.",
        "Pouvoir effectuer une demande auprès du prothésiste.",
        "Resevoir la resultat d'une demande auprès du prothésiste.",
        "Possibilité de modifier les données personnelles via un paramètre bien détaillé.",
        "---------------PROTHESISTE----------------------",
        "Un tableau de bord avec de nombreux détails et statistiques.",
        "Un seul accès au site depuis un seul appareil.",
        "Pouvoir de recevoir une demande auprès du dentiste est la traiter (Accepter ou Refus)",
        "Possibilité de modifier les données personnelles via un paramètre bien détaillé.",
      ]
    },
    plus: {
      title: "Plus",
      description: "Ensemble illimité d'avantages, que ce soit pour un dentiste ou un prothésiste, mais avec un abonnement mensuel.",
      price: "200 TND/mois",
      buttonText: "Contactez-nous pour plus de détails",
      features: [
        "---------------DENTISTE----------------------",
        "Un tableau de bord avec de nombreux détails et statistiques.",
        "Ajout de patients pour le dentiste, avec la possibilité de les éditer et de les supprimer.",
        "Un seul accès au site depuis un seul appareil.",
        "Pouvoir effectuer une demande auprès du prothésiste.",
        "Resevoir la resultat d'une demande auprès du prothésiste.",
        "Possibilité de modifier les données personnelles via un paramètre bien détaillé.",
        "Générateur de facture selon une date que vous pouvez indiquer.",
        "Un suivi en temps réel pour la progression de votre demande.",
        "---------------PROTHESISTE----------------------",
        "Un tableau de bord avec de nombreux détails et statistiques.",
        "Un seul accès au site depuis un seul appareil.",
        "Pouvoir de recevoir une demande auprès du dentiste est la traiter (Accepter ou Refus)",
        "Possibilité de modifier les données personnelles via un paramètre bien détaillé.",
        "Générateur de facture selon une date que vous pouvez indiquer.",
        "Un suivi en temps réel pour la progression de l'etats du demande."
      ],
      hasAddon: true
    },
    premium: {
      title: "Premium",
      description: "Ensemble illimité d'avantages, que ce soit pour un dentiste ou un prothésiste.",
      price: "Tarification exclusive",
      priceDetail: "Contactez-nous pour plus de détails",
      buttonText: "Parlez à un conseiller",
      features: [
        "Tous les services que le site peut offrir à un prix choc.",
      ]
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <div className="pricing-header-main">
          <h1>Trouvez le plan adapté à votre cabinet.</h1>
          <p>Rejoignez OrthoConnect aujourd'hui et ne payez pas un dinar tant que vous n'êtes pas prêt à gérer la paie.</p>
          <div className="text-center">
            <a href="/" className="btn-return">Retourner à l'accueil</a>
          </div>

        </div>
        
        
        <div className="pricing-grid">
          <PricingCard {...plans.simple} />
          <PricingCard {...plans.plus} />
          <PricingCard {...plans.premium} />
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
