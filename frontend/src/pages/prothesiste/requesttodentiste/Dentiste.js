import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';  // Icons for Accept/Reject buttons

// Import Sidebar and Header
import Sidebar from '../../../components/prothesiste/sidebarProthesiste/SidebarProthesiste';
import Header from '../../../components/prothesiste/headerProthesiste/HeaderProthesiste';


const DemandesProthesiste = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prix, setPrix] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const userId = 1;

  useEffect(() => {
    // Appel de l'API pour récupérer les demandes du prothésiste
    axios.get(`http://localhost:3001/get-demandes/${userId}`)
      .then(response => {
        setDemandes(response.data); // Récupère les demandes
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des demandes:', error);
        setMessage('Erreur lors de la récupération des demandes.');
        setMessageType('danger');
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Fonction pour accepter la demande
  const accepterDemande = (demandeId) => {
    if (!prix) {
      setMessage('Veuillez saisir un prix');
      setMessageType('danger');
      return;
    }

    axios.put(`http://localhost:3001/update-demande/${demandeId}`, { status: 'Accepté', price: prix })
      .then(response => {
        setDemandes(demandes.map(demande =>
          demande.id === demandeId ? { ...demande, status: 'Accepté', price: prix } : demande
        ));
        setPrix('');
        setMessage('Demande acceptée avec succès');
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error('Erreur lors de l\'acceptation de la demande:', error);
        setMessage('Erreur lors de l\'acceptation de la demande.');
        setMessageType('danger');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      });
  };

  // Fonction pour rejeter la demande
  const rejeterDemande = (demandeId) => {
    axios.put(`http://localhost:3001/update-demande/${demandeId}`, { status: 'Rejeté' })
      .then(response => {
        setDemandes(demandes.map(demande =>
          demande.id === demandeId ? { ...demande, status: 'Rejeté' } : demande
        ));
      })
      .catch(error => {
        console.error('Erreur lors du rejet de la demande:', error);
        setMessage('Erreur lors du rejet de la demande.');
        setMessageType('danger');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      });
  };

  // Fonction pour obtenir la classe de statut basée sur le statut
  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepté':
        return 'bg-success text-white'; // Vert pour accepté
      case 'Rejeté':
        return 'bg-danger text-white'; // Rouge pour rejeté
      case 'En attente':
        return 'bg-warning text-dark'; // Jaune pour en attente
      default:
        return '';
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      <Container fluid className="py-5">
        <Row>
          <Col xs={3} className="p-0">
            {/* Sidebar */}
            <Sidebar />
          </Col>

          {/* Main content */}
          <Col xs={9} className="p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            <h2 
              className="text-center mb-4" 
              style={{
                backgroundColor: '#007bff', 
                color: "white", 
                padding: "40px", 
                borderRadius: "5px"
              }}
            >
              Demandes à traiter
            </h2> 
             {message && <Alert variant={messageType} className="text-center">{message}</Alert>}
              {demandes.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  Aucune demande en attente.
                </Alert>
              ) : (
                demandes.map(demande => (
                  <motion.div 
                    key={demande.id}
                    initial={{ scale: 0.8 }} 
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-4 shadow-lg">
                      <Card.Body>
                        <Card.Title>{demande.type}</Card.Title>
                        <Card.Text><strong>Description: </strong>{demande.description}</Card.Text>
                        <Row>
                          <Col xs={6}>
                            <p><strong>Prix proposé:</strong> {demande.price ? `${demande.price} TND` : 'Non défini'}</p>
                            <p><strong>Taille:</strong> {demande.size}</p>
                            <p><strong>Quantité:</strong> {demande.quantity}</p>
                            <p><strong>Contenance:</strong> {demande.contenance}</p>
                            <p><strong>Date limite:</strong> {new Date(demande.dueDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          
                            <p><strong>Statut</strong> 
                              <span className={`px-3 py-1 rounded ${getStatusClass(demande.status)}`}>
                                {demande.status}
                              </span>
                            </p>
                          </Col>  
                          <Col xs={6} className="text-end">
                            {demande.status === 'En attente' && (
                              <>
                                <Form.Control
                                  type="number"
                                  value={prix}
                                  onChange={(e) => setPrix(e.target.value)}
                                  placeholder="Prix proposé"
                                  className="mb-3"
                                />
                                <div>
                                  <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => accepterDemande(demande.id)}
                                  >
                                    <FaCheckCircle className="me-2" />
                                    Accepter
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => rejeterDemande(demande.id)}
                                  >
                                    <FaTimesCircle className="me-2" />
                                    Rejeter
                                  </Button>
                                </div>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DemandesProthesiste;
