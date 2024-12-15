import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importation de Link de react-router-dom

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info'); // Pour gérer le type d'alerte (info, success, danger)

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/reset-password', {
        email,
        secretCode,
        newPassword
      });
      setMessage(response.data.message);
      setVariant('success');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur du serveur');
      setVariant('danger');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src="./imagedocc.png"
                  alt="Profile"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                  }}
                />
                <h4>Réinitialiser le mot de passe</h4>
                <p className="text-muted">Dentiste</p>
              </div>

              {message && <Alert variant={variant}>{message}</Alert>}

              <Tab.Container id="reset-password-tabs" defaultActiveKey="form">
                <Row>
                  <Col sm={12}>
                    <Nav variant="tabs" className="mb-3">
                      <Nav.Item>
                        <Nav.Link eventKey="form">Réinitialiser le mot de passe</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="form">
                        <Form onSubmit={handleResetPassword}>
                          <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Entrez votre email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="mb-3"
                            />
                          </Form.Group>

                          <Form.Group controlId="formSecretCode">
                            <Form.Label>Code secret</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Entrez votre code secret"
                              value={secretCode}
                              onChange={(e) => setSecretCode(e.target.value)}
                              required
                              className="mb-3"
                            />
                          </Form.Group>

                          <Form.Group controlId="formNewPassword">
                            <Form.Label>Nouveau mot de passe</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Entrez un nouveau mot de passe"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              className="mb-4"
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit" block>
                            Réinitialiser le mot de passe
                          </Button>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>

          <div className="mt-3 text-center">
            <p>Vous avez Terminé ? <Link to="/dashbord" className="text-primary">Retour à la connexion</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
