import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './Salas.css';

const Salas = () => {
  const [salas, setSalas] = useState([
    { id: 1, nome: 'Sala 101' },
    { id: 2, nome: 'Sala 102' },
    { id: 3, nome: 'Sala 103' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentSala, setCurrentSala] = useState(null);
  const [newSala, setNewSala] = useState('');
  const [salaToDelete, setSalaToDelete] = useState(null);

  const handleShowModal = (sala) => {
    setCurrentSala(sala);
    setNewSala(sala ? sala.nome : '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSala(null);
    setNewSala('');
  };

  const handleShowConfirmModal = (sala) => {
    setSalaToDelete(sala);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSalaToDelete(null);
  };

  const handleSaveSala = () => {
    if (!newSala) {
      alert('O nome da sala é obrigatório.');
      return;
    }

    if (salas.some(s => s.nome === newSala && s.id !== currentSala?.id)) {
      alert('Já existe uma sala com esse nome.');
      return;
    }

    if (currentSala) {
      setSalas(salas.map(s => s.id === currentSala.id ? { ...s, nome: newSala } : s));
    } else {
      setSalas([...salas, { id: salas.length + 1, nome: newSala }]);
    }
    handleCloseModal();
  };

  const handleDeleteSala = () => {
    setSalas(salas.filter(s => s.id !== salaToDelete.id));
    handleCloseConfirmModal();
  };

  return (
    <div className="salas-container">
      <h1>Salas Cadastradas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Nova Sala</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map(sala => (
            <tr key={sala.id}>
              <td>{sala.id}</td>
              <td>{sala.nome}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(sala)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleShowConfirmModal(sala)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentSala ? 'Editar Sala' : 'Cadastrar Nova Sala'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSalaNome">
              <Form.Label>Nome da Sala</Form.Label>
              <Form.Control
                type="text"
                value={newSala}
                onChange={(e) => setNewSala(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveSala}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover a sala "{salaToDelete?.nome}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteSala}>Remover</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Salas;