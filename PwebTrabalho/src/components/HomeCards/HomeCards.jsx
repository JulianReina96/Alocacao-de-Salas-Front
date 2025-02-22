import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { HttpService } from '../../data/fetchers/HttpService';
import { BsBook, BsCalendar, BsBuilding, BsPerson } from 'react-icons/bs';
import './HomeCards.css';

function GroupExample() {
  const [totalDisciplinas, setTotalDisciplinas] = useState(0);
  const [totalAulas, setTotalAulas] = useState(0);
  const [totalSalas, setTotalSalas] = useState(0);
  const [totalProfessores, setTotalProfessores] = useState(0);

  const httpService = new HttpService();

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const disciplinasResponse = await httpService.get('/disciplina');
        setTotalDisciplinas(Array.isArray(disciplinasResponse.data) ? disciplinasResponse.data.length : 0);

        const aulasResponse = await httpService.get('/aula');
        setTotalAulas(Array.isArray(aulasResponse.data) ? aulasResponse.data.length : 0);

        const salasResponse = await httpService.get('/sala');
        setTotalSalas(Array.isArray(salasResponse.data) ? salasResponse.data.length : 0);

        const professoresResponse = await httpService.get('/professor');
        setTotalProfessores(Array.isArray(professoresResponse.data) ? professoresResponse.data.length : 0);
      } catch (error) {
        console.error('There was an error fetching the totals!', error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <div>
      <CardGroup className="custom-card-group">
        <Card className="custom-card">
          <Card.Body className="custom-card-body text-center">
            <BsBook size={50} />
            <Card.Title>Disciplinas</Card.Title>
            <Card.Text className="custom-card-text">
              <strong>Total de Disciplinas Cadastradas:</strong> {totalDisciplinas}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Link to="/disciplinas">
              <Button variant="primary">Detalhar</Button>
            </Link>
          </Card.Footer>
        </Card>
        <Card className="custom-card">
          <Card.Body className="custom-card-body text-center">
            <BsCalendar size={50} />
            <Card.Title>Aulas</Card.Title>
            <Card.Text>
              <strong>Total de Aulas Cadastradas:</strong> {totalAulas}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Link to="/aulas">
              <Button variant="primary">Detalhar</Button>
            </Link>
          </Card.Footer>
        </Card>
        <Card className="custom-card">
          <Card.Body className="custom-card-body text-center">
            <BsBuilding size={50} />
            <Card.Title>Salas</Card.Title>
            <Card.Text>
              <strong>Total de Salas Cadastradas:</strong> {totalSalas}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Link to="/salas">
              <Button variant="primary">Detalhar</Button>
            </Link>
          </Card.Footer>
        </Card>
        <Card className="custom-card">
          <Card.Body className="custom-card-body text-center">
            <BsPerson size={50} />
            <Card.Title>Professores</Card.Title>
            <Card.Text>
              <strong>Total de Professores Cadastrados:</strong> {totalProfessores}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Link to="/professor">
              <Button variant="primary">Detalhar</Button>
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  );
}

export default GroupExample;