import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import logo from '../../assets/ifbaLogo.png'; // Certifique-se de ajustar o caminho para a sua imagem
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Adicione a lógica de logout aqui

    console.log("Logout");
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="75"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Aulas">Aulas</Nav.Link>
            <Nav.Link as={Link} to="/Disciplinas">Disciplinas</Nav.Link>
            <Nav.Link as={Link} to="/Salas">Salas</Nav.Link>
            <Nav.Link as={Link} to="/Professor">Professores</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout} className="ms-auto">
            Sair
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;