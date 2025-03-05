import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { HttpService } from '../../data/fetchers/HttpService';
import './Aulas.css';

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [diasDaSemana, setDiasDaSemana] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [currentAula, setCurrentAula] = useState(null);
  const [newAula, setNewAula] = useState({ disciplinaId: '', salaId: '', diaDaSemana: '', horarioId: '' });
  const [aulaToDelete, setAulaToDelete] = useState(null);

  const httpService = new HttpService();

  const fetchAulas = async () => {
    try {
      const response = await httpService.get('/aula');
      setAulas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the aulas!', error);
      setAulas([]); // Garanta que aulas seja um array mesmo em caso de erro
    }
  };

  const fetchDisciplinas = async () => {
    try {
      const response = await httpService.get('/disciplina');
      setDisciplinas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the disciplinas!', error);
      setDisciplinas([]); // Garanta que disciplinas seja um array mesmo em caso de erro
    }
  };

  const fetchSalas = async () => {
    try {
      const response = await httpService.get('/sala');
      setSalas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the salas!', error);
      setSalas([]); // Garanta que salas seja um array mesmo em caso de erro
    }
  };

  const fetchHorarios = async (salaId, disciplinaId) => {
    try {
      const response = await httpService.get(`/horarios/${salaId}/${disciplinaId}`);
      setHorarios(Array.isArray(response.data) ? response.data : []);
      const dias = [...new Set(response.data.map(horario => horario.diaDaSemana))];
      setDiasDaSemana(dias);
    } catch (error) {
      console.error('There was an error fetching the horarios!', error);
      setHorarios([]); // Garanta que horarios seja um array mesmo em caso de erro
    }
  };

  useEffect(() => {
    fetchAulas();
    fetchDisciplinas();
    fetchSalas();
  }, []);

  const handleShowModal = (aula) => {
    setCurrentAula(aula);
    setNewAula(aula ? { 
disciplinaId: aula.disciplina.id, 
salaId: aula.sala.id, 
diaDaSemana: aula.horario.diaDaSemana, 
horarioId: aula.horario.id 
} : { disciplinaId: '', salaId: '', diaDaSemana: '', horarioId: '' });
if (aula) {
      fetchHorarios(aula.sala.id, aula.disciplina.id);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAula(null);
    setNewAula({ disciplinaId: '', salaId: '', diaDaSemana: '', horarioId: '' });
  };

  const handleShowConfirmDeleteModal = (aula) => {
    setAulaToDelete(aula);
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setAulaToDelete(null);
    setShowConfirmDeleteModal(false);
  };

  const handleSaveAula = async () => {
    try {
      const aulaData = {
        disciplinaId: newAula.disciplinaId,
        salaId: newAula.salaId,
        horarioId: newAula.horarioId,
      };

      if (currentAula) {
        console.log('currentAula', currentAula.id);
        await httpService.put(`/aula/${currentAula.id}`, aulaData);
      } else {
        await httpService.post('/aula', aulaData);
      }
      fetchAulas(); // Recarrega a lista de aulas após salvar
      handleCloseModal();
    } catch (error) {
      console.error('There was an error saving the aula!', error);
    }
  };

  const handleDeleteAula = async () => {
    try {
      await httpService.delete(`/aula/${aulaToDelete.id}`);
      fetchAulas(); // Recarrega a lista de aulas após deletar
      handleCloseConfirmDeleteModal();
    } catch (error) {
      console.error('There was an error deleting the aula!', error);
    }
  };

  const checkConflict = (salaId, diaDaSemana, horarioId, disciplinaId) => {
    return aulas.some(aula => (aula.salaId === salaId || aula.disciplinaId === disciplinaId) && aula.diaDaSemana === diaDaSemana && aula.horarioId === horarioId);
  };

  const handleSaveAulaWithConflictCheck = () => {
    if (!newAula.disciplinaId || !newAula.salaId || !newAula.diaDaSemana || !newAula.horarioId) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    const selectedDisciplina = disciplinas.find(d => d.id === newAula.disciplinaId);
    if (checkConflict(newAula.salaId, newAula.diaDaSemana, newAula.horarioId, newAula.disciplinaId)) {
      alert('Conflito de horário! A sala ou o professor já está ocupado nesse horário.');
      return;
    }
    handleSaveAula();
  };

  const handleSalaChange = (e) => {
    const salaId = parseInt(e.target.value);
    setNewAula({ ...newAula, salaId });
    if (newAula.disciplinaId) {
      fetchHorarios(salaId, newAula.disciplinaId);
    }
  };

  const handleDisciplinaChange = (e) => {
    const disciplinaId = parseInt(e.target.value);
    setNewAula({ ...newAula, disciplinaId });
    if (newAula.salaId) {
      fetchHorarios(newAula.salaId, disciplinaId);
    }
  };

  const getAvailableHorarios = () => {
    const occupiedHorarios = aulas
      .filter(aula => (aula.salaId === newAula.salaId || aula.disciplinaId === newAula.disciplinaId) && aula.diaDaSemana === newAula.diaDaSemana)
      .map(aula => aula.horarioId);
    return horarios.filter(horario => horario.diaDaSemana === newAula.diaDaSemana && !occupiedHorarios.includes(horario.id));
  };

  return (
    <div className="aulas-container">
      <h1>Aulas Agendadas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Alocar Nova Aula</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Sala</th>
            <th>Dia da Semana</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map(aula => (
            <tr key={aula.id}>
              <td>{aula.id}</td>
              <td>{aula.disciplina.nome}</td>
              <td>{aula.professor}</td>
              <td>{aula.sala.nome}</td>
              <td>{aula.horario.diaDaSemana}</td>
              <td>{aula.horario.horaInicio} - {aula.horario.horaFim}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(aula)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleShowConfirmDeleteModal(aula)}>Remover</Button>
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
            <Form.Group controlId="formSala">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                as="select"
                value={newAula.salaId}
                onChange={handleSalaChange}
                required
              >
                <option value="">Selecione a Sala</option>
                {salas.map(sala => (
                  <option key={sala.id} value={sala.id}>{sala.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                as="select"
                value={newAula.disciplinaId}
                onChange={handleDisciplinaChange}
                required
              >
                <option value="">Selecione a Disciplina</option>
                {disciplinas.filter(disciplina => disciplina.professor).map(disciplina => (
                  <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control
                type="text"
                value={newAula.disciplinaId ? disciplinas.find(d => d.id === newAula.disciplinaId)?.professor.nome : 'Disciplina não selecionada'}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formDiaDaSemana">
              <Form.Label>Dia da Semana</Form.Label>
              <Form.Control
                as="select"
                value={newAula.diaDaSemana}
                onChange={(e) => setNewAula({ ...newAula, diaDaSemana: e.target.value })}
                required
                disabled={!newAula.salaId || !newAula.disciplinaId}
              >
                <option value="">Selecione o Dia da Semana</option>
                {diasDaSemana.map((dia, index) => (
                  <option key={index} value={dia}>{dia}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formHorario">
              <Form.Label>Horário</Form.Label>
              <Form.Control
                as="select"
                value={newAula.horarioId}
                onChange={(e) => setNewAula({ ...newAula, horarioId: parseInt(e.target.value) })}
                required
                disabled={!newAula.salaId || !newAula.disciplinaId}
              >
                <option value="">Selecione o Horário</option>
                {getAvailableHorarios().map(horario => (
                  <option key={horario.id} value={horario.id}>{`${horario.horaInicio} - ${horario.horaFim}`}</option>
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

      <Modal show={showConfirmDeleteModal} onHide={handleCloseConfirmDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover a aula "{aulaToDelete?.disciplinaId ? disciplinas.find(d => d.id === aulaToDelete.disciplinaId)?.nome : ''}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteAula}>Remover</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Aulas;