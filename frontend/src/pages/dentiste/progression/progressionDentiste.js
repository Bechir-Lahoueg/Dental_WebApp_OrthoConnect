import React, { useState, useEffect } from 'react';
import Header from '../../../components/dentiste/headerDentiste/HeaderDentiste'; // Import du Header
import Sidebar from '../../../components/dentiste/sidebarDentiste/SidebarDentiste'; // Import du Sidebar
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProgressionDemande() {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState(null);  // Gestion des erreurs

  // Fetch demandes acceptées
  const fetchDemandes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/demandes/accepted');
      if (!response.ok) {
        throw new Error('Échec de la récupération des demandes');
      }
      const data = await response.json();
      setDemandes(data);
    } catch (error) {
      console.error('Error fetching demandes:', error);
      setError(error.message);  // Afficher l'erreur
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  // Filtrer les demandes terminées
  const demandesTerminees = demandes.filter(
    (demande) => demande.final_product === 'Terminé'
  );

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-white p-4 rounded shadow-lg mb-4"
        >
          <h2 className="text-center">Progression des Demandes</h2>
        </motion.div>

        {error && (
          <div className="alert alert-danger">
            <strong>Erreur :</strong> {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Final Product</th>
              </tr>
            </thead>
            <tbody>
              {demandes.length > 0 ? (
                demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td>{demande.type}</td>
                    <td>{demande.description}</td>
                    <td>{demande.status}</td>
                    <td>
                      {/* Affichage du cercle selon l'état du produit final */}
                      {demande.final_product === 'Terminé' ? (
                        <span className="final-product-done">Terminé</span>
                      ) : demande.final_product === 'En cours' ? (
                        <span className="final-product-in-progress">En cours</span>
                      ) : demande.final_product ? (
                        demande.final_product
                      ) : (
                        <span className="final-product-pending">Non défini</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucune demande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tableau des demandes terminées */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-success text-white p-4 rounded shadow-lg mt-4"
        >
          <h3 className="text-center">Demandes Terminées</h3>
        </motion.div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Final Product</th>
              </tr>
            </thead>
            <tbody>
              {demandesTerminees.length > 0 ? (
                demandesTerminees.map((demande) => (
                  <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td>{demande.type}</td>
                    <td>{demande.description}</td>
                    <td>{demande.status}</td>
                    <td>
                      {/* Affichage du cercle selon l'état du produit final */}
                      {demande.final_product === 'Terminé' ? (
                        <span className="final-product-done">Terminé</span>
                      ) : demande.final_product === 'En cours' ? (
                        <span className="final-product-in-progress">En cours</span>
                      ) : demande.final_product ? (
                        demande.final_product
                      ) : (
                        <span className="final-product-pending">Non défini</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucune demande terminée trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ajout de la classe CSS ici même */}
      <style jsx>{`
        .final-product-done {
          display: inline-block;
          background-color: #28a745; /* Couleur verte */
          color: white;
          padding: 5px 15px;
          border-radius: 50px;
          font-weight: bold;
          text-transform: uppercase;
          animation: blink-green 1.5s infinite; /* Animation de clignotement */
        }

        .final-product-in-progress {
          display: inline-block;
          background-color: #ffc107; /* Couleur jaune */
          color: white;
          padding: 5px 15px;
          border-radius: 50px;
          font-weight: bold;
          text-transform: uppercase;
          animation: blink-yellow 1.5s infinite; /* Animation de clignotement */
        }

        .final-product-pending {
          display: inline-block;
          background-color: #6c757d; /* Couleur gris */
          color: white;
          padding: 5px 15px;
          border-radius: 50px;
          font-weight: bold;
          text-transform: uppercase;
        }

        @keyframes blink-green {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes blink-yellow {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
