import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { HttpService } from '../../data/fetchers/HttpService';
import { formatCodigo } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [isProfessorDropdownDisabled, setIsProfessorDropdownDisabled] = useState(false);

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
    const codigo = disciplina ? disciplina.codigoTurma.slice(-2) : '';
    setNewDisciplina(disciplina ? { nome: disciplina.nome, codigo, professorId: disciplina.professor?.id || '' } : { nome: '', codigo: '', professorId: '' });
    setIsProfessorDropdownDisabled(!!disciplina?.professor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDisciplina(null);
    setNewDisciplina({ nome: '', codigo: '', professorId: '' });
    setIsProfessorDropdownDisabled(false);
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
    if (!newDisciplina.nome || !newDisciplina.codigo || !newDisciplina.professorId) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }

    if (!/^\d{2}$/.test(newDisciplina.codigo)) {
      toast.error('O código deve ser composto por 2 caracteres numéricos.');
      return;
    }

    if (newDisciplina.professorId === '') {
      toast.error('Selecione um professor.');
      return;
    }

    const formattedCodigo = formatCodigo(newDisciplina);

    if (disciplinas.some(d => d.codigoTurma === formattedCodigo && d.id !== currentDisciplina?.id)) {
      toast.error('O código informado já está em uso.');
      return;
    }

    const disciplinaToSave = { ...newDisciplina, codigo: formattedCodigo, codigoTurma: formattedCodigo };
setNewDisciplina(disciplinaToSave); // Atualiza o estado com o código formatado
    console.log(disciplinaToSave);

    try {
      if (currentDisciplina) {
        await httpService.put(`/disciplina/${currentDisciplina.id}`, disciplinaToSave);
        toast.success('Disciplina atualizada com sucesso.');
      } else {
        await httpService.post('/disciplina', disciplinaToSave);
        toast.success('Disciplina cadastrada com sucesso.');
      }
      fetchDisciplinas(); // Recarrega a lista de disciplinas após adicionar ou editar uma disciplina
      handleCloseModal();
    } catch (error) {
      console.error('There was an error saving the disciplina!', error);
      toast.error('Erro ao salvar a disciplina.');
    }
  };

  const handleDeleteDisciplina = async () => {
    try {
      await httpService.delete(`/disciplina/${disciplinaToDelete.id}`);
      setDisciplinas(disciplinas.filter(d => d.id !== disciplinaToDelete.id));
      handleCloseConfirmModal();
      toast.success('Disciplina deletada com sucesso.');
    } catch (error) {
      console.error('There was an error deleting the disciplina!', error);
      toast.error('Erro ao deletar a disciplina.');
    }
  };

  const handleRemoveProfessor = async () => {
    try {
      console.log('Removing professor from disciplina:', currentDisciplina.professor.id);
      await httpService.delete(`disciplina/professor/${currentDisciplina.id}`);
      setDisciplinas(disciplinas.map(d => d.id === currentDisciplina.id ? { ...d, professor: null } : d));
      handleCloseRemoveProfessorModal();
      toast.success('Professor removido com sucesso.');
    } catch (error) {
      console.error('There was an error removing the professor from the disciplina!', error);
      toast.error('Erro ao remover o professor.');
    }
  };

  return (
    <div className="disciplinas-container">
      <h1>Disciplinas Cadastradas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Nova Disciplina</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codigo</th>
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
                required
                disabled={isProfessorDropdownDisabled}
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
          <br/> <strong>Todas as aulas</strong> agendadas serão <strong>canceladas</strong>.
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

      <ToastContainer />
    </div>
  );
};

export default Disciplinas;