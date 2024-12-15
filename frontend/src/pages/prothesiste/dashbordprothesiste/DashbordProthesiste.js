import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importation des composants Bootstrap
import Sidebar from '../../../components/prothesiste/sidebarProthesiste/SidebarProthesiste';
import Header from '../../../components/prothesiste/headerProthesiste/HeaderProthesiste';
import { FaTools, FaUserMd, FaClipboardList } from 'react-icons/fa'; // Icônes pour les widgets

// Importation des composants Chart.js pour les graphiques
import { Line } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProthesisteDashboard = () => {
  // Données du graphique en ligne
  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [
      {
        label: 'Nombre de commandes traitées',
        data: [5, 12, 18, 25, 30, 27, 35],
        fill: false,
        borderColor: '#ff6347',
        tension: 0.2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Commandes traitées par mois',
        font: { size: 16 },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Mois' } },
      y: { title: { display: true, text: 'Nombre de commandes' }, min: 0 },
    },
  };

  return (
    <div >
      <Header />
      <Container fluid>
        <Row>
          <Col xs={3} className="p-0">
            <Sidebar />
          </Col>

          <Col xs={9} className="p-4" style={{ backgroundColor: '#e9ecef' }}>
            {/* Section des widgets */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#ff6347', color: '#fff' }}>
                  <Card.Body>
                    <FaClipboardList size={50} className="mb-3" />
                    <h5>Commandes en attente</h5>
                    <h3>3</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  <Card.Body>
                    <FaUserMd size={50} className="mb-3" />
                    <h5>Patients traités</h5>
                    <h3>45</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="rounded p-3 mb-3 shadow-sm" style={{ backgroundColor: '#007BFF', color: '#fff' }}>
                  <Card.Body>
                    <FaTools size={50} className="mb-3" />
                    <h5>Outils disponibles</h5>
                    <h3>12</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Graphique des commandes traitées */}
            <Row className="mb-5">
              <Col md={12}>
                <div className="mb-4">
                  <h3 className="text-center text-dark mb-4">Analyse des commandes traitées</h3>
                  <div className="p-3" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Line data={lineData} options={lineOptions} />
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

export default ProthesisteDashboard;
