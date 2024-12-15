import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';

const LoginProthesiste = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const errorAnimation = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 200, friction: 15 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/loginprothesiste', { email, password });
      console.log(response.data);
      navigate('/dashbordpro');
    } catch (err) {
      setError('Whoops! Double Check your Email or Password.');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto d-flex align-items-center justify-content-center">
          <Card className="p-4 shadow-lg" style={{ width: '100%' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Connexion Prothésiste</h3>
              
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
                  <a href="/resetpasswordprothesiste" className="text-decoration-none">Mot De Passe Oublier ?</a>
                </div>
                <div className="text-center">
                  <span>Vous n'avez pas encore de compte ? </span>
                  <a href="/voirnosplans" className="text-decoration-none">Voir nos plans</a>
                </div>
                <div className="text-center">
                  <span>Vous êtes Dentiste ? </span>
                  <a href="/logindentiste" className="text-decoration-none">Cliquez içi</a>
                </div>
                <div className="text-center">
                  <a href="/" className="text-decoration-none">Retournez à l'accueil </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="d-none d-md-block">
          <img
            src="./logoprothesiste.png"
            alt="Prothésiste Login"
            className="w-100"
            style={{ borderRadius: '0 10px 10px 0', maxHeight: '110vh', objectFit: 'cover' }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginProthesiste;
