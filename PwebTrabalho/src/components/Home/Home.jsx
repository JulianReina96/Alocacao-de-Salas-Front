import React, { useState, useEffect } from 'react';
import CardGroup from '../HomeCards/HomeCards';
import TableHorarios from '../TableHorarios/TableHorarios';
import { HttpService } from '../../data/fetchers/HttpService';
import { Card } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [horarios, setHorarios] = useState([]);
  const [aulas, setAulas] = useState([]);

  const httpService = new HttpService();

  const fetchHorarios = async () => {
    try {
      const response = await httpService.get('/horarios');
      setHorarios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the horarios!', error);
      setHorarios([]); // Garanta que horarios seja um array mesmo em caso de erro
    }
  };

  const fetchAulas = async () => {
    try {
      const response = await httpService.get('/aula');
      console.log(response.data);
      setAulas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the aulas!', error);
      setAulas([]); // Garanta que aulas seja um array mesmo em caso de erro
    }
  };

  useEffect(() => {
    fetchHorarios();
    fetchAulas();
  }, []);

  const filterHorariosByTurno = (turno) => {
    const uniqueHorarios = [];
    const seen = new Set();

    horarios.forEach(horario => {
      if (horario.turnoHorario === turno && !seen.has(horario.horaInicio)) {
        uniqueHorarios.push(horario);
        seen.add(horario.horaInicio);
      }
    });

    return uniqueHorarios;
  };

  const filterAulasByTurno = (turno) => {
    return aulas.filter(aula => aula.horario.turnoHorario === turno);
  };

  return (
    <div>
      <CardGroup />
      <Card className="tables-card">
        <Card.Body>
          <TableHorarios turno="MATUTINO" horarios={filterHorariosByTurno('MATUTINO')} aulas={filterAulasByTurno('MATUTINO')} />
          <TableHorarios turno="VESPERTINO" horarios={filterHorariosByTurno('VESPERTINO')} aulas={filterAulasByTurno('VESPERTINO')} />
          <TableHorarios turno="NOTURNO" horarios={filterHorariosByTurno('NOTURNO')} aulas={filterAulasByTurno('NOTURNO')} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;