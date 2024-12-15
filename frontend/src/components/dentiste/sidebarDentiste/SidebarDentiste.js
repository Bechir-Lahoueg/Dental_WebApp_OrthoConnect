import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaUserMd,
  FaCalendarCheck,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

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
        backgroundColor: '#1e1e2f', // Sleek dark background color
        color: '#fff', // White text for contrast
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
      }}
    >
      {/* Logo Section */}
      <div className="sidebar-header text-center mb-4">
        <div className="d-flex flex-column align-items-center">
          <img
            src="./logoo.png"
            alt="Logo"
            width="60"
            height="60"
            className="mb-2"
          />
          <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', color: '#fff' }}>
            Ortho
            <span style={{ color: '#00bfff' }}>Connect</span>
          </h4>
        </div>
      </div>

      {/* Add a separator line */}
      <hr style={{ borderTop: '1px solid #fff', margin: '20px 0' }} />

      {/* Navigation Links */}
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashbord"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaTachometerAlt style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Tableau de bord
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/patients"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaUserMd style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Patients
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/prothesiste"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaCalendarCheck style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Prothésiste
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/progressiondentiste"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaClipboardList style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Progression
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/invoicedentiste"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaFileInvoiceDollar style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Facture
        </Nav.Link>
      </Nav>

      {/* Footer Links */}
      <div className="mt-auto">
        <Nav.Link
          as={Link}
          to="/parametredentiste"
          className="nav-link"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaCog style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Paramètres
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/logindentiste"
          className="nav-link"
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#333')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <FaSignOutAlt style={{ marginRight: '10px', transition: 'transform 0.3s ease' }} />
          Déconnexion
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
