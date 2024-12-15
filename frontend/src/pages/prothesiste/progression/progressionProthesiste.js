import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/prothesiste/sidebarProthesiste/SidebarProthesiste';
import Header from '../../../components/prothesiste/headerProthesiste/HeaderProthesiste';
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

  // Mettre à jour la progression
  const updateProgression = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/demandes/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }), // Update the status in the database
      });

      if (response.ok) {
        setDemandes((prevDemandes) =>
          prevDemandes.map((demande) =>
            demande.id === id ? { ...demande, status } : demande
          )
        );
      } else {
        console.error('Error updating status');
      }
    } catch (error) {
      console.error('Error updating progression:', error);
    }
  };

  // Mettre à jour le produit final
  const updateFinalProduct = async (id, final_product) => {
    try {
      const response = await fetch(`http://localhost:3001/api/demandes/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ final_product }), // Update the final_product in the database
      });

      if (response.ok) {
        setDemandes((prevDemandes) =>
          prevDemandes.map((demande) =>
            demande.id === id ? { ...demande, final_product } : demande
          )
        );
      } else {
        console.error('Error updating final product');
      }
    } catch (error) {
      console.error('Error updating final product:', error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  // Filtrer les demandes terminées
  const demandesTerminees = demandes.filter(
    (demande) => demande.final_product === 'Terminé' && demande.final_product
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
                <th>Final Product</th> {/* Nouvelle colonne */}
                <th>Actions</th> {/* Colonne des actions */}
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
                    <td>{demande.final_product || 'Non défini'}</td> {/* Affiche le produit final */}
                    <td>
                      <button
                        onClick={() => updateFinalProduct(demande.id, 'Terminé')}
                        className="btn btn-success mt-2"
                      >
                        Marquer comme terminé
                      </button>
                      <button
                        onClick={() => updateFinalProduct(demande.id, 'En cours')}
                        className="btn btn-warning mt-2 ml-2"
                      >
                        Marquer comme en cours
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
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
                <th>Final Product</th> {/* Nouvelle colonne */}
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
                    <td>{demande.final_product || 'Non défini'}</td> {/* Affiche le produit final */}
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
    </div>
  );
}
