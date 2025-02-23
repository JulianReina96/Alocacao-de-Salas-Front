import React from 'react';
import { Table } from 'react-bootstrap';
import './TableHorarios.css'; // Import the CSS file for styling

const TableHorarios = ({ turno, horarios, aulas }) => {
  const diasDaSemana = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];

  const getAulaForHorario = (dia, horario) => {
    
    const aula = aulas.find(aula => aula.horario.diaDaSemana === dia && aula.horario.horaInicio === horario.horaInicio);
    return aula ? (
      
      <div className="aula-content">
        <strong>{aula.disciplina.codigoTurma}</strong>
        <br />
        {aula.disciplina.nome}
        <div className="sala-tooltip">{aula.sala.nome}</div>
      </div>
    ) : 'Nenhuma aula agendada';
  };

  const getCellClass = (dia, horario) => {
    const aula = aulas.find(aula => aula.horario.diaDaSemana === dia && aula.horario.horaInicio === horario.horaInicio);
    return aula ? 'cell-green' : 'cell-red';
  };

  return (
    <div className="table-container">
      <h2>{turno}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Horário</th>
            {diasDaSemana.map(dia => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map(horario => (
            <tr key={horario.horaInicio}>
              <td>{horario.horaInicio} - {horario.horaFim}</td>
              {diasDaSemana.map(dia => (
                <td key={dia} className={`${getCellClass(dia, horario)} text-center`}>
                  {getAulaForHorario(dia, horario)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableHorarios;