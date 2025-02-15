import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './Professor.css';

const Professor = () => {
  const [professores, setProfessores] = useState([
    { id: 1, nome: 'João', disciplinas: ['Matemática', 'Física'] },
    { id: 2, nome: 'Maria', disciplinas: ['Português', 'Literatura'] },
    { id: 3, nome: 'Carlos', disciplinas: [] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showDisciplinasModal, setShowDisciplinasModal] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [newProfessor, setNewProfessor] = useState({ nome: '' });
  const [professorToDelete, setProfessorToDelete] = useState(null);

  const handleShowModal = (professor) => {
    setCurrentProfessor(professor);
    setNewProfessor(professor ? { nome: professor.nome } : { nome: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProfessor(null);
    setNewProfessor({ nome: '' });
  };

  const handleShowDisciplinasModal = (professor) => {
    setCurrentProfessor(professor);
    setShowDisciplinasModal(true);
  };

  const handleCloseDisciplinasModal = () => {
    setShowDisciplinasModal(false);
    setCurrentProfessor(null);
  };

  const handleSaveProfessor = () => {
    if (!newProfessor.nome) {
      alert('O nome do professor é obrigatório.');
      return;
    }

    if (currentProfessor) {
      setProfessores(professores.map(p => p.id === currentProfessor.id ? { ...p, ...newProfessor } : p));
    } else {
      setProfessores([...professores, { id: professores.length + 1, ...newProfessor, disciplinas: [] }]);
    }
    handleCloseModal();
  };

  const handleDeleteProfessor = () => {
    setProfessores(professores.filter(p => p.id !== professorToDelete.id));
    setProfessorToDelete(null);
  };

  return (
    <div className="professores-container">
      <h1>Professores Cadastrados</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Novo Professor</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map(professor => (
            <tr key={professor.id}>
              <td>{professor.id}</td>
              <td>{professor.nome}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDisciplinasModal(professor)}>Disciplinas</Button>{' '}
                <Button variant="warning" onClick={() => handleShowModal(professor)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => setProfessorToDelete(professor)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentProfessor ? 'Editar Professor' : 'Cadastrar Novo Professor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProfessorNome">
              <Form.Label>Nome do Professor</Form.Label>
              <Form.Control
                type="text"
                value={newProfessor.nome}
                onChange={(e) => setNewProfessor({ ...newProfessor, nome: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveProfessor}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDisciplinasModal} onHide={handleCloseDisciplinasModal}>
        <Modal.Header closeButton>
          <Modal.Title>Disciplinas de {currentProfessor?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {currentProfessor?.disciplinas.map((disciplina, index) => (
              <li key={index}>{disciplina}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDisciplinasModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!professorToDelete} onHide={() => setProfessorToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover o professor "{professorToDelete?.nome}"? Todas as aulas vinculadas a este professor também serão removidas.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProfessorToDelete(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteProfessor}>Remover</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Professor;