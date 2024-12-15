import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Modal, Button, ProgressBar, Alert, Card } from 'react-bootstrap';
import Sidebar from '../../../components/prothesiste/sidebarProthesiste/SidebarProthesiste';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchInvoices = () => {
    setInvoices([]);
    setTotal(0);

    if (!startDate || !endDate) {
      setError('Veuillez sélectionner les dates de début et de fin.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }

    setLoading(true);
    axios.get('http://localhost:3001/api/invoices', {
      params: { startDate, endDate }
    })
    .then(response => {
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setInvoices(response.data);
        calculateTotal(response.data);
        setError(null);
      } else {
        setError('Aucune facture trouvée pour cette période.');
      }
      setLoading(false);
    })
    .catch(error => {
      setError('Erreur lors de la récupération des données.');
      setLoading(false);
    });
  };

  const calculateTotal = (data) => {
    const sum = data.reduce((acc, invoice) => acc + parseFloat(invoice.price || 0), 0);
    setTotal(sum);
  };

  const generatePDF = () => {
    setProgress(10);
    setLoading(true);
    setShowModal(true);

    axios.post('http://localhost:3001/api/generate-pdf', { demandes: invoices, total }, { responseType: 'blob' })
    .then(response => {
      setProgress(100);
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'facture.pdf');
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      setShowModal(false);
    })
    .catch(error => {
      setError('Erreur lors de la génération du PDF.');
      setLoading(false);
      setShowModal(false);
    });
  };

  const handleFilterClick = () => {
    setShowTable(true);
    fetchInvoices();
  };

  const handleDateChange = (e) => {
    if (e.target.name === 'startDate') {
      setStartDate(e.target.value);
    } else if (e.target.name === 'endDate') {
      setEndDate(e.target.value);
    }

    if (!startDate || !endDate) {
      setShowTable(false);
      setInvoices([]);
      setTotal(0);
      setError(null);
    }
  };

  return (
    <div className="d-flex" style={{height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenu principal à droite de la Sidebar */}
      <div className="main-content" style={{ flexGrow: 1, paddingLeft: '250px', backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
        <div className="container mt-5" style={{ paddingTop: '20px' }}>
          {/* Titre animé */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-primary text-white p-4 rounded shadow-lg mb-4"
          >
            <h2 className="text-center">Générer la facture dentaire</h2>
          </motion.div>

          {/* Carte pour les filtres */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-sm mb-4" style={{ borderRadius: '10px', backgroundColor: '#ffffff' }}>
              <Card.Body>
                <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Filtres</h5>
                <div className="mb-3">
                  <label className="form-label">Date de début</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                    style={{ borderRadius: '5px' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date de fin</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                    style={{ borderRadius: '5px' }}
                  />
                </div>
                <Button variant="primary" onClick={handleFilterClick} disabled={loading} style={{ borderRadius: '5px' }}>
                  {loading ? 'Chargement...' : 'Filtrer'}
                </Button>
              </Card.Body>
            </Card>

            {/* Affichage des erreurs */}
            {error && <Alert variant="danger" style={{ borderRadius: '5px' }}>{error}</Alert>}

            {/* Tableau des factures */}
            {showTable && (
              <motion.table
                className="table table-bordered table-striped shadow-sm"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  marginTop: '20px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <thead className="table-dark" style={{ backgroundColor: '#343a40', color: 'white' }}>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Contenance</th>
                    <th>Due Date</th>
                    <th>Price</th>
                    <th>Creation Date</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#f8f9fa' }}>
                  {invoices.length > 0 ? (
                    invoices.map((invoice, index) => (
                      <tr key={index}>
                        <td>{invoice.id}</td>
                        <td>{invoice.type}</td>
                        <td>{invoice.description}</td>
                        <td>{invoice.size}</td>
                        <td>{invoice.quantity}</td>
                        <td>{invoice.contenance}</td>
                        <td>{format(new Date(invoice.dueDate), 'dd/MM/yyyy')}</td>
                        <td>{invoice.price}</td>
                        <td>{format(new Date(invoice.creation_date), 'dd/MM/yyyy')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="9">Aucune donnée trouvée pour cette période</td></tr>
                  )}
                </tbody>
              </motion.table>
            )}

            {/* Montant total */}
            {showTable && (
              <div className="mt-3 text-right">
                <h4 style={{ fontWeight: 'bold' }}>Total : {total} TND</h4>
              </div>
            )}

            {/* Bouton pour générer le PDF */}
            {showTable && invoices.length > 0 && (
              <Button variant="success" className="mt-3" onClick={generatePDF} disabled={loading}>
                {loading ? 'Génération en cours...' : 'Générer PDF'}
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal de progression */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Génération de la facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar now={progress} label={`${progress}%`} animated />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Invoice;
