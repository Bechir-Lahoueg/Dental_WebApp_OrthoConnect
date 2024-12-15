import React, { useState } from 'react';
import { Navbar, Nav, Image, Dropdown, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #f0f0f0;
  margin-left: 250px;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 24px;
  color: #4f86f7;
`;

const NotificationIcon = styled(FaBell)`
  font-size: 24px;
  color: #4f86f7;
`;

const AvatarImage = styled(Image)`
  border: 2px solid transparent;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #4f86f7;
    box-shadow: 0 4px 10px rgba(79, 134, 247, 0.2);
  }
`;

const DropdownMenu = styled(Dropdown.Menu)`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`;

const BadgeStyled = styled(Badge)`
  background-color: #f02d4d;
  font-size: 12px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f05477;
  }
`;

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const handleDropdownToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleNotificationToggle = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };

  return (
    <StyledNavbar expand="lg" variant="light">
      <Container fluid>
        <Link to="/dashbordpro" className="navbar-brand d-flex align-items-center" style={{ marginRight: '30px' }}>
          <SearchIcon className="mr-2" />
        </Link>

        <Nav className="ml-auto d-flex align-items-center">
          <Dropdown show={showNotificationMenu} onToggle={handleNotificationToggle} align="end">
            <Dropdown.Toggle variant="link" id="dropdown-notification" className="p-0" style={{ marginRight: '15px' }}>
              <NotificationIcon className="mr-3" />
              <BadgeStyled pill>{1}</BadgeStyled>
            </Dropdown.Toggle>
            <DropdownMenu>
              <Dropdown.Item>La Facture Mensuelle Est générée</Dropdown.Item>
            </DropdownMenu>
          </Dropdown>

          <Dropdown show={showMenu} onToggle={handleDropdownToggle} align="end">
            <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="p-0">
              <AvatarImage
                src="/imagedoc.png"
                roundedCircle
                width="40"
                height="40"
                className="ml-3"
                alt="User Avatar"
              />
            </Dropdown.Toggle>

            <DropdownMenu>
              <Dropdown.Item href="/parametreprothesiste">
                <FaCog className="mr-2" /> Paramètres
              </Dropdown.Item>
              <Dropdown.Item href="/loginprothesiste">
                <FaSignOutAlt className="mr-2" /> Déconnexion
              </Dropdown.Item>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Container>
    </StyledNavbar>
  );
};

export default Header;
