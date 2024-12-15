import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/dentiste/headerDentiste/HeaderDentiste';
import Sidebar from '../../../components/dentiste/sidebarDentiste/SidebarDentiste';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    type: '',
    description: '',
    size: '',
    quantity: 1,
    contenance: '',
    dueDate: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-demandes/1');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/add-demande', {
        ...newRequest,
        userId: 1,
      });
      setNewRequest({
        type: '',
        description: '',
        size: '',
        quantity: 1,
        contenance: '',
        dueDate: '',
      });
      setShowModal(false);
      fetchRequests();
    } catch (error) {
      console.error('Error adding the request:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Non spécifié';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f0f4f7' }}>
      {/* Header */}
      <Header />

      {/* Main content */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={3} className="p-0">
            <Sidebar />
          </Col>

          {/* Main content */}
          <Col xs={9} className="p-4">
            <div className="container my-5">
              {/* Title */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-white py-2 px-4" style={{ backgroundColor: '#007bff', borderRadius: '8px' }}>Mes Demandes</h3>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Ajouter une demande
                </Button>
              </div>

              {/* Requests list */}
              <section>
                {requests.length === 0 ? (
                  <p>Aucune demande trouvée.</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Taille</th>
                        <th>Quantité</th>
                        <th>Contenance</th>
                        <th>Date d'échéance</th>
                        <th>Status</th>
                        <th>Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td>{request.type}</td>
                          <td>{request.description}</td>
                          <td>{request.size}</td>
                          <td>{request.quantity}</td>
                          <td>{request.contenance}</td>
                          <td>{formatDate(request.dueDate)}</td>
                          <td>{request.status}</td>
                          <td>{request.price ? `${request.price} TND` : 'En attente'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>

              {/* Modal to add a new request */}
              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Ajouter une nouvelle demande</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleRequestSubmit}>
                    {/* Type selection */}
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <div>
                        {[
                          'Blanchiment d\'éteins',
                          'Appareils dentaires',
                          'Plaques d\'alignement (Invisalign)',
                          'Prothèses fixes (Couronnes, Bridges)',
                          'Prothèses amovibles (Dentiers)',
                          'Facettes dentaires',
                          'Inlays/Onlays',
                          'Implants dentaires',
                          'Réparations de prothèses',
                          'Garde de rétention (Post-Orthodontie)',
                          'Plaques occlusales (Bruxisme)',
                          'Protège-dents sportifs',
                          'Dispositifs dentaires pour enfants',
                          'Consultations esthétiques sur mesure',
                        ].map((option, index) => (
                          <Form.Check
                            key={index}
                            type="radio"
                            label={option}
                            name="type"
                            value={option}
                            checked={newRequest.type === option}
                            onChange={(e) =>
                              setNewRequest({ ...newRequest, type: e.target.value })
                            }
                          />
                        ))}
                      </div>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Entrez une description"
                        value={newRequest.description}
                        onChange={(e) =>
                          setNewRequest({ ...newRequest, description: e.target.value })
                        }
                        required
                      />
                    </Form.Group>

                    {/* Size */}
                    <Form.Group className="mb-3">
                      <Form.Label>Taille</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Entrez la taille (facultatif)"
                        value={newRequest.size}
                        onChange={(e) => setNewRequest({ ...newRequest, size: e.target.value })}
                      />
                    </Form.Group>

                    {/* Quantity */}
                    <Form.Group className="mb-3">
                      <Form.Label>Quantité</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={newRequest.quantity}
                        onChange={(e) =>
                          setNewRequest({ ...newRequest, quantity: e.target.value })
                        }
                      />
                    </Form.Group>

                    {/* Content */}
                    <Form.Group className="mb-3">
                      <Form.Label>Contenance</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Entrez la contenance (facultatif)"
                        value={newRequest.contenance}
                        onChange={(e) =>
                          setNewRequest({ ...newRequest, contenance: e.target.value })
                        }
                      />
                    </Form.Group>

                    {/* Due Date */}
                    <Form.Group className="mb-3">
                      <Form.Label>Date d'échéance</Form.Label>
                      <Form.Control
                        type="date"
                        min={today}
                        value={newRequest.dueDate}
                        onChange={(e) =>
                          setNewRequest({ ...newRequest, dueDate: e.target.value })
                        }
                        required
                      />
                    </Form.Group>

                    {/* Submit Button */}
                    <Button variant="primary" type="submit" className="w-100">
                      Soumettre la demande
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Requests;
