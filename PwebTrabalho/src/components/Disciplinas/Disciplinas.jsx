import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { formatCodigo } from '../../utils';
import './Disciplinas.css';

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([
    { id: 1, nome: 'Matemática', codigo: '01', professorId: 1 },
    { id: 2, nome: 'Português', codigo: '02', professorId: 2 },
    { id: 3, nome: 'História', codigo: '03', professorId: null },
  ]);
  const [professores, setProfessores] = useState([
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Carlos' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemoveProfessorModal, setShowRemoveProfessorModal] = useState(false);
  const [currentDisciplina, setCurrentDisciplina] = useState(null);
  const [newDisciplina, setNewDisciplina] = useState({ nome: '', codigo: '', professorId: '' });
  const [disciplinaToDelete, setDisciplinaToDelete] = useState(null);

  const handleShowModal = (disciplina) => {
    setCurrentDisciplina(disciplina);
    setNewDisciplina(disciplina ? { nome: disciplina.nome, codigo: disciplina.codigo, professorId: disciplina.professorId || '' } : { nome: '', codigo: '', professorId: '' });
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

  const handleSaveDisciplina = () => {
    if (!newDisciplina.nome || !newDisciplina.codigo) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (!/^\d{2}$/.test(newDisciplina.codigo)) {
      alert('O código deve ser composto por 2 caracteres numéricos.');
      return;
    }

    const formattedCodigo = formatCodigo(newDisciplina);

    if (disciplinas.some(d => formatCodigo(d) === formattedCodigo && d.id !== currentDisciplina?.id)) {
      alert('O código informado não pode ser utilizado para essa disciplina.');
      return;
    }

    if (currentDisciplina) {
      setDisciplinas(disciplinas.map(d => d.id === currentDisciplina.id ? { ...d, ...newDisciplina } : d));
    } else {
      setDisciplinas([...disciplinas, { id: disciplinas.length + 1, ...newDisciplina }]);
    }
    handleCloseModal();
  };

  const handleDeleteDisciplina = () => {
    setDisciplinas(disciplinas.filter(d => d.id !== disciplinaToDelete.id));
    handleCloseConfirmModal();
  };

  const handleRemoveProfessor = () => {
    setDisciplinas(disciplinas.map(d => d.id === currentDisciplina.id ? { ...d, professorId: null } : d));
    handleCloseRemoveProfessorModal();
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
              <td>{formatCodigo(disciplina)}</td>
              <td>{professores.find(p => p.id === disciplina.professorId)?.nome || 'Nenhum'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(disciplina)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleShowConfirmModal(disciplina)}>Remover</Button>{' '}
                {disciplina.professorId && (
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
              {currentDisciplina && currentDisciplina.professorId ? (
                <div>
                  <Form.Control
                    type="text"
                    value={professores.find(p => p.id === newDisciplina.professorId)?.nome || 'Nenhum'}
                    readOnly
                  />
                  {/* <Button variant="danger" onClick={() => setNewDisciplina({ ...newDisciplina, professorId: '' })}>Remover Professor</Button> */}
                </div>
              ) : (
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
              )}
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