import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';

import { useUserContext } from '../contexts/UserContext';

function HeaderComponent() {
  const { user, logout } = useUserContext();

  return (
    <Navbar variant="dark" bg="primary">
      <Container fluid>
        <Navbar.Brand href="/">Shoplist</Navbar.Brand>

        <Dropdown className="text-end">
          <Dropdown.Toggle aria-label="See options" data-testid="user-options">
            <Image src={user?.photoURL || undefined} roundedCircle width={32} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item as="button" disabled>Edit profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as="button" className="text-danger" onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export const Header = HeaderComponent;
