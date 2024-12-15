import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importation des composants Bootstrap
import Header from '../../../components/dentiste/headerDentiste/HeaderDentiste'; // Composant Header
import Sidebar from '../../../components/dentiste/sidebarDentiste/SidebarDentiste'; // Composant Sidebar
import { FaUsers, FaEnvelope, FaDollarSign, FaCalendarAlt } from 'react-icons/fa'; // Icônes pour les widgets

// Importation des composants Chart.js pour les graphiques
import { Line, Pie } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrement des composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Données du graphique en ligne
  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [
      {
        label: 'Revenus ce mois-ci',
        data: [200, 600, 600, 780, 900, 820, 900],
        fill: false,
        borderColor: '#007BFF',
        tension: 0.2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenus mensuels',
        font: { size: 16 },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Mois' } },
      y: { title: { display: true, text: 'Revenus (€)' }, min: 0 },
    },
  };

  // Données des graphiques en camembert
  const pieData = {
    labels: ['Patients', 'Prothésistes', 'Autres'],
    datasets: [
      {
        label: 'Répartition des utilisateurs',
        data: [300, 150, 50],
        backgroundColor: ['#28a745', '#007BFF', '#ffc107'],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Répartition des utilisateurs',
        font: { size: 16 },
      },
    },
  };

  const pieData2 = {
    labels: ['Terminés', 'En attente'],
    datasets: [
      {
        label: 'Statut des rendez-vous',
        data: [180, 30],
        backgroundColor: ['#007BFF', '#ffc107'],
        hoverOffset: 4,
      },
    ],
  };

  const pieData3 = {
    labels: ['Homme', 'Femme'],
    datasets: [
      {
        label: 'Répartition par sexe',
        data: [200, 100],
        backgroundColor: ['#28a745', '#ffc107'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={3} className="p-0">
            <Sidebar />
          </Col>

          <Col xs={9} className="p-4" style={{ backgroundColor: '#f4f6f9' }}>
            {/* Section des widgets */}
            <Row className="mb-4">
              <Col md={3}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <Card.Body>
                    <FaUsers size={50} className="mb-3" />
                    <h5>Total des patients</h5>
                    <h3>250</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#007BFF', color: '#fff' }}>
                  <Card.Body>
                    <FaEnvelope size={50} className="mb-3" />
                    <h5>Nouveaux messages</h5>
                    <h3>8</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  <Card.Body>
                    <FaDollarSign size={50} className="mb-3" />
                    <h5>Revenus ce mois-ci</h5>
                    <h3>5000 TND</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                  <Card.Body>
                    <FaCalendarAlt size={50} className="mb-3" />
                    <h5>Rendez-vous aujourd'hui</h5>
                    <h3>15</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Graphique des revenus */}
            <Row className="mb-5">
              <Col md={13}>
                <div className="mb-4">
                  <h3 className="text-center text-dark mb-4">Analyse des revenus</h3>
                  <div className="p-3" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </div>
              </Col>
            </Row>

            {/* Graphiques en camembert */}
            <Row className="mb-5">
              <Col md={4}>
                <div className="mb-4">
                  <h3 className="text-center text-dark mb-4">Répartition des utilisateurs</h3>
                  <div className="p-3" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <h3 className="text-center text-dark mb-4">Statut des rendez-vous</h3>
                  <div className="p-3" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Pie data={pieData2} options={pieOptions} />
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <h3 className="text-center text-dark mb-4">Répartition par sexe</h3>
                  <div className="p-3" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Pie data={pieData3} options={pieOptions} />
                  </div>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
