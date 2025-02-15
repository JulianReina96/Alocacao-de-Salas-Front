import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './Aulas.css';

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [disciplinas] = useState([
    { id: 1, nome: 'Matemática', professor: 'João' },
    { id: 2, nome: 'Português', professor: 'Maria' },
    { id: 3, nome: 'História', professor: 'Carlos' },
  ]);
  const [salas] = useState([
    { id: 1, nome: 'Sala 101' },
    { id: 2, nome: 'Sala 102' },
    { id: 3, nome: 'Sala 103' },
  ]);
  const [horarios] = useState([
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentAula, setCurrentAula] = useState(null);
  const [newAula, setNewAula] = useState({ disciplinaId: '', salaId: '', horario: '' });

  const handleShowModal = (aula) => {
    setCurrentAula(aula);
    setNewAula(aula ? { disciplinaId: aula.disciplinaId, salaId: aula.salaId, horario: aula.horario } : { disciplinaId: '', salaId: '', horario: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAula(null);
    setNewAula({ disciplinaId: '', salaId: '', horario: '' });
  };

  const handleSaveAula = () => {
    if (currentAula) {
      setAulas(aulas.map(a => a.id === currentAula.id ? { ...a, ...newAula } : a));
    } else {
      const newId = aulas.length ? Math.max(...aulas.map(a => a.id)) + 1 : 1;
      setAulas([...aulas, { id: newId, ...newAula }]);
    }
    handleCloseModal();
  };

  const handleDeleteAula = (id) => {
    setAulas(aulas.filter(a => a.id !== id));
  };

  const checkConflict = (salaId, horario, disciplinaId) => {
    return aulas.some(aula => (aula.salaId === salaId || aula.disciplinaId === disciplinaId) && aula.horario === horario);
  };

  const handleSaveAulaWithConflictCheck = () => {
    if (!newAula.disciplinaId || !newAula.salaId || !newAula.horario) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    const selectedDisciplina = disciplinas.find(d => d.id === newAula.disciplinaId);
    if (checkConflict(newAula.salaId, newAula.horario, newAula.disciplinaId)) {
      alert('Conflito de horário! A sala ou o professor já está ocupado nesse horário.');
      return;
    }
    handleSaveAula();
  };

  const getAvailableHorarios = () => {
    const occupiedHorarios = aulas
      .filter(aula => aula.salaId === newAula.salaId || aula.disciplinaId === newAula.disciplinaId)
      .map(aula => aula.horario);
    return horarios.filter(horario => !occupiedHorarios.includes(horario));
  };

  return (
    <div className="aulas-container">
      <h1>Aulas Agendadas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Alocar Nova Aula</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Sala</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map(aula => (
            <tr key={aula.id}>
              <td>{aula.id}</td>
              <td>{disciplinas.find(d => d.id === aula.disciplinaId)?.nome}</td>
              <td>{disciplinas.find(d => d.id === aula.disciplinaId)?.professor}</td>
              <td>{salas.find(s => s.id === aula.salaId)?.nome}</td>
              <td>{aula.horario}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(aula)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteAula(aula.id)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentAula ? 'Editar Aula' : 'Alocar Nova Aula'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                as="select"
                value={newAula.disciplinaId}
                onChange={(e) => setNewAula({ ...newAula, disciplinaId: parseInt(e.target.value) })}
                required
              >
                <option value="">Selecione a Disciplina</option>
                {disciplinas.map(disciplina => (
                  <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control
                type="text"
                value={newAula.disciplinaId ? disciplinas.find(d => d.id === newAula.disciplinaId)?.professor : 'Disciplina não selecionada'}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formSala">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                as="select"
                value={newAula.salaId}
                onChange={(e) => setNewAula({ ...newAula, salaId: parseInt(e.target.value) })}
                required
              >
                <option value="">Selecione a Sala</option>
                {salas.map(sala => (
                  <option key={sala.id} value={sala.id}>{sala.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formHorario">
              <Form.Label>Horário</Form.Label>
              <Form.Control
                as="select"
                value={newAula.horario}
                onChange={(e) => setNewAula({ ...newAula, horario: e.target.value })}
                required
              >
                <option value="">Selecione o Horário</option>
                {getAvailableHorarios().map(horario => (
                  <option key={horario} value={horario}>{horario}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveAulaWithConflictCheck}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Aulas;