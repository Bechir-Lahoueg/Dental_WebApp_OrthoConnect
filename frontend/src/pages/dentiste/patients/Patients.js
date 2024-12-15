import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/dentiste/headerDentiste/HeaderDentiste'; // Import du Header
import Sidebar from '../../../components/dentiste/sidebarDentiste/SidebarDentiste'; // Import du Sidebar

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', email: '' });
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const filterPatients = useCallback(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patients, searchTerm]);

  useEffect(() => {
    filterPatients();
  }, [filterPatients]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatientId !== null) {
        await axios.put(`http://localhost:3001/api/patients/${editingPatientId}`, newPatient);
      } else {
        await axios.post('http://localhost:3001/api/patients', newPatient);
      }
      setNewPatient({ name: '', age: '', email: '' });
      setEditingPatientId(null);
      setShowModal(false); // Fermer la popup
      fetchPatients();
    } catch (error) {
      console.error('Error adding or editing patient:', error);
    }
  };

  const editPatient = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    setNewPatient({ name: patient.name, age: patient.age, email: patient.email });
    setEditingPatientId(id);
    setShowModal(true);
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      {/* Main content */}
      <Container fluid>
        <Row>
          {/* Sidebar à gauche */}
          <Col xs={3} className="p-0">
            <Sidebar />
          </Col>

          {/* Contenu principal à droite */}
          <Col xs={9} className="p-4">
            <div className="container my-5">
              

              {/* Patients List */}
              <section>
              <h2 
              className="text-center mb-4" 
              style={{
                backgroundColor: "#007bff", 
                color: "white", 
                padding: "40px", 
                borderRadius: '8px'
              }}
            >
              Liste des Patients
            </h2> 
            {/* Search and Add Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Add Patient
                </Button>
              </div>
                {filteredPatients.length === 0 ? (
                  <p>No patients found.</p>
                ) : (
                  <div className="list-group">
                    {filteredPatients.map((patient) => (
                      <div key={patient.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{patient.name}</strong> - {patient.age} years - {patient.email}
                        </div>
                        <div>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editPatient(patient.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deletePatient(patient.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
              </section>

              {/* Add/Edit Patient Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>{editingPatientId ? 'Edit Patient' : 'Add Patient'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handlePatientSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      {editingPatientId ? 'Update Patient' : 'Add Patient'}
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

export default Patients;
