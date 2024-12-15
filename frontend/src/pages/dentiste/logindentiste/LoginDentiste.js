import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web'; // Importer react-spring pour les animations

const LoginDentiste = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Animation d'erreur
  const errorAnimation = useSpring({
    opacity: error ? 1 : 0,  // Afficher ou masquer le message en fonction de l'erreur
    transform: error ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 200, friction: 15 },  // Ajuster la vitesse de l'animation
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête d'authentification
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      // Si l'authentification réussit
      console.log(response.data);
      navigate('/dashbord');
    } catch (err) {
      // Si l'email ou le mot de passe est incorrect
      setError('Whoops! Double Check your Email or Password.');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto d-flex align-items-center justify-content-center">
          <Card className="p-4 shadow-lg" style={{ width: '100%' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Connexion Dentiste</h3>
              
              {/* Affichage du message d'erreur avec animation */}
              {error && (
                <animated.div style={errorAnimation} className="alert alert-danger">
                  {error}
                </animated.div>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Entrez votre email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Connexion
                </Button>

                <div className="text-center mb-3">
                  <a href="/resetpassworddentiste" className="text-decoration-none">Mot De Passe Oublier ?</a>
                </div>

                <div className="text-center">
                  <span>Vous n'avez pas encore de compte ? </span>
                  <a href="/voirnosplans" className="text-decoration-none">Voir nos plans</a>
                </div>
                <div className="text-center">
                  <span>Vous êtes prothésiste ? </span>
                  <a href="/loginprothesiste" className="text-decoration-none">Cliquez içi</a>
                </div>
                <div className="text-center">
                  <a href="/" className="text-decoration-none">Retournez à l'accueil </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Image à droite, taille réduite */}
        <Col md={6} className="d-none d-md-block">
          <img
            src="./dd.png"  // Remplacez l'URL par l'image que vous souhaitez utiliser
            alt="Dentiste Login"
            className="w-100"
            style={{ borderRadius: '0 10px 10px 0', maxHeight: '80vh', objectFit: 'cover' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginDentiste;
