import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { HttpService } from '../../data/fetchers/HttpService';
import { formatCodigo } from '../../utils';
import './Disciplinas.css';

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemoveProfessorModal, setShowRemoveProfessorModal] = useState(false);
  const [currentDisciplina, setCurrentDisciplina] = useState(null);
  const [newDisciplina, setNewDisciplina] = useState({ nome: '', codigo: '', professorId: '' });
  const [disciplinaToDelete, setDisciplinaToDelete] = useState(null);

  const httpService = new HttpService();

  const fetchProfessores = async () => {
    try {
      const response = await httpService.get('/professor');
      setProfessores(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the professores!', error);
      setProfessores([]); // Garanta que professores seja um array mesmo em caso de erro
    }
  };

  const fetchDisciplinas = async () => {
    try {
      const response = await httpService.get('/disciplina');
      console.log('Disciplinas response:', response); // Adicione este log para verificar a resposta da API
      setDisciplinas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('There was an error fetching the disciplinas!', error);
      setDisciplinas([]); // Garanta que disciplinas seja um array mesmo em caso de erro
    }
  };

  useEffect(() => {
    fetchProfessores();
    fetchDisciplinas();
  }, []);

  const handleShowModal = (disciplina) => {
    setCurrentDisciplina(disciplina);
    setNewDisciplina(disciplina ? { nome: disciplina.nome, codigo: disciplina.codigoTurma, professorId: disciplina.professor?.id || '' } : { nome: '', codigo: '', professorId: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDisciplina(null);
    setNewDisciplina({ nome: '', codigo: '', professorId: '' });
  };

  const handleShowConfirmModal = (disciplina) => {
    setDisciplinaToDelete(disciplina);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDisciplinaToDelete(null);
  };

  const handleShowRemoveProfessorModal = (disciplina) => {
    setCurrentDisciplina(disciplina);
    setShowRemoveProfessorModal(true);
  };

  const handleCloseRemoveProfessorModal = () => {
    setShowRemoveProfessorModal(false);
    setCurrentDisciplina(null);
  };

  const handleSaveDisciplina = async () => {
    if (!newDisciplina.nome || !newDisciplina.codigo) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (!/^\d{2}$/.test(newDisciplina.codigo)) {
      alert('O código deve ser composto por 2 caracteres numéricos.');
      return;
    }

    const formattedCodigo = formatCodigo(newDisciplina);

    if (disciplinas.some(d => d.codigoTurma === formattedCodigo && d.id !== currentDisciplina?.id)) {
      alert('O código informado já está em uso.');
      return;
    }

    const disciplinaToSave = { ...newDisciplina, codigoTurma: formattedCodigo };
    console.log(disciplinaToSave);

    try {
      if (currentDisciplina) {
        await httpService.put(`/disciplina/${currentDisciplina.id}`, disciplinaToSave);
        setDisciplinas(disciplinas.map(d => d.id === currentDisciplina.id ? { ...d, ...disciplinaToSave } : d));
      } else {
        await httpService.post('/disciplina', disciplinaToSave);
        fetchDisciplinas(); // Recarrega a lista de disciplinas após adicionar uma nova disciplina
      }
      handleCloseModal();
    } catch (error) {
      console.error('There was an error saving the disciplina!', error);
    }
  };

  const handleDeleteDisciplina = async () => {
    try {
      await httpService.delete(`/disciplina/${disciplinaToDelete.id}`);
      setDisciplinas(disciplinas.filter(d => d.id !== disciplinaToDelete.id));
      handleCloseConfirmModal();
    } catch (error) {
      console.error('There was an error deleting the disciplina!', error);
    }
  };

  const handleRemoveProfessor = async () => {
    try {
      await httpService.put(`/disciplina/${currentDisciplina.id}`, { ...currentDisciplina, professorId: null });
      setDisciplinas(disciplinas.map(d => d.id === currentDisciplina.id ? { ...d, professor: null } : d));
      handleCloseRemoveProfessorModal();
    } catch (error) {
      console.error('There was an error removing the professor from the disciplina!', error);
    }
  };

  return (
    <div className="disciplinas-container">
      <h1>Disciplinas Cadastradas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Nova Disciplina</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Código</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map(disciplina => (
            <tr key={disciplina.id}>
              <td>{disciplina.id}</td>
              <td>{disciplina.nome}</td>
              <td>{disciplina.codigoTurma}</td>
              <td>{disciplina.professor?.nome || 'Nenhum'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(disciplina)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleShowConfirmModal(disciplina)}>Remover</Button>{' '}
                {disciplina.professor && (
                  <Button variant="secondary" onClick={() => handleShowRemoveProfessorModal(disciplina)}>Remover Professor</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentDisciplina ? 'Editar Disciplina' : 'Cadastrar Nova Disciplina'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDisciplinaNome">
              <Form.Label>Nome da Disciplina</Form.Label>
              <Form.Control
                type="text"
                value={newDisciplina.nome}
                onChange={(e) => setNewDisciplina({ ...newDisciplina, nome: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDisciplinaCodigo">
              <Form.Label>Código da Turma</Form.Label>
              <Form.Control
                type="text"
                value={newDisciplina.codigo}
                onChange={(e) => setNewDisciplina({ ...newDisciplina, codigo: e.target.value })}
                maxLength="2"
                pattern="\d*"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDisciplinaProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control
                as="select"
                value={newDisciplina.professorId}
                onChange={(e) => setNewDisciplina({ ...newDisciplina, professorId: parseInt(e.target.value) })}
              >
                <option value="">Selecione um Professor</option>
                {professores.map(professor => (
                  <option key={professor.id} value={professor.id}>{professor.nome}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveDisciplina}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover a disciplina "{disciplinaToDelete?.nome}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteDisciplina}>Remover</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRemoveProfessorModal} onHide={handleCloseRemoveProfessorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remover Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover o professor da disciplina "{currentDisciplina?.nome}"? Todas as aulas agendadas serão canceladas.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveProfessorModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleRemoveProfessor}>Remover</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Disciplinas;