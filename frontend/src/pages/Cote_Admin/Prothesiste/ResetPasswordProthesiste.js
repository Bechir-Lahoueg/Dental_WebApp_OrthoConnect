import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResetPasswordProthesiste = () => {
  const [email, setEmail] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/reset-password-prothesiste', {
        email,
        secretCode,
        newPassword,
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
        <Col xs={12} md={6} className="p-4 border rounded shadow-lg">
          <h2 className="text-center mb-4 text-primary">Réinitialiser le mot de passe (Prothésiste)</h2>

          {message && <Alert variant={variant}>{message}</Alert>}

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

          <div className="mt-3 text-center">
            <p>Vous avez Terminer ? <Link to="/loginprothesiste" className="text-primary">Retour à la connexion</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordProthesiste;
