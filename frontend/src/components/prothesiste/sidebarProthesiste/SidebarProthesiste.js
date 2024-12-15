import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaClipboardList, FaFileInvoiceDollar, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div
      className="sidebar"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        background: '#2C3E50',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        color: '#BDC3C7',
        boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo and Title */}
      <div className="sidebar-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img
          src="./logoo.png"
          alt="Logo"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            marginBottom: '10px',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <h4 style={{ color: '#ECF0F1', fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}>
          Ortho<span style={{ color: '#00bfff' }}>Connect</span>
        </h4>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashbordpro"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaTachometerAlt style={iconStyle} />
          Tableau de bord
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dentiste"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaCalendarCheck style={iconStyle} />
          Dentiste
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/progression"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaClipboardList style={iconStyle} />
          Progression
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/invoiceprothesiste"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaFileInvoiceDollar style={iconStyle} />
          Facture
        </Nav.Link>
      </Nav>

      {/* Settings and Logout Links */}
      <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
        <Nav.Link
          as={Link}
          to="/parametreprothesiste"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaCog style={iconStyle} />
          Paramètres
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/loginprothesiste"
          className="nav-link"
          style={navLinkStyle}
        >
          <FaSignOutAlt style={iconStyle} />
          Déconnexion
        </Nav.Link>
      </div>
    </div>
  );
};

const navLinkStyle = {
  fontSize: '16px',
  color: '#BDC3C7',
  marginBottom: '18px',
  padding: '12px 18px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  background: '#34495E', // Background color of the link
  ':hover': {
    backgroundColor: '#16A085',
    transform: 'scale(1.05)', // Subtle scaling effect on hover
  },
};

const iconStyle = {
  marginRight: '12px',
  fontSize: '22px',
  color: '#00bfff',
  transition: 'color 0.3s ease',
  ':hover': {
    color: '#ECF0F1', // Light blue on hover
  },
};

export default Sidebar;
