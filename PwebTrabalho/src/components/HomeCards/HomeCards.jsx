import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './HomeCards.css';
import Button from 'react-bootstrap/Button';

function GroupExample() {
  return (
    <div>
      <CardGroup className="custom-card-group">
        <Card className="custom-card">
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body className="custom-card-body">
            <Card.Title>Disciplinas</Card.Title>
            <Card.Text className="custom-card-text">
              <strong>Total de Disciplinas Cadastradas:</strong> 10
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <small className="text-muted">Last updated 3 mins ago</small>
            <Button variant="primary" className="ms-auto">Detalhar</Button>
          </Card.Footer>
        </Card>
        <Card className="custom-card">
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body className="custom-card-body">
            <Card.Title>Aulas</Card.Title>
            <Card.Text>
              <strong>Total de Aulas Cadastradas:</strong> 10
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <small className="text-muted">Last updated 3 mins ago</small>
            <Button variant="primary" className="ms-auto">Detalhar</Button>
          </Card.Footer>
        </Card>
        <Card className="custom-card">
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body className="custom-card-body">
            <Card.Title>Salas</Card.Title>
            <Card.Text>
              <strong>Total de Salas Cadastradas:</strong> 10
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <small className="text-muted">Last updated 3 mins ago</small>
            <Button variant="primary" className="ms-auto">Detalhar</Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
}

export default GroupExample;