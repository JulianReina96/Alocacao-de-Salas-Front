import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { HttpService } from '../../data/fetchers/HttpService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Salas.css';

const Salas = () => {
  const [salas, setSalas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentSala, setCurrentSala] = useState(null);
  const [newSala, setNewSala] = useState('');
  const [salaToDelete, setSalaToDelete] = useState(null);

  const httpService = new HttpService();

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await httpService.get('/sala');
        setSalas(response.data);
      } catch (error) {
        console.error('There was an error fetching the salas!', error);
      }
    };

    fetchSalas();
  }, []);

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

  const handleSaveSala = async () => {
    if (!newSala) {
      toast.error('O nome da sala é obrigatório.');
      return;
    }

    if (salas.some(s => s.nome === newSala && s.id !== currentSala?.id)) {
      toast.error('Já existe uma sala com esse nome.');
      return;
    }

    try {
      if (currentSala) {
        await httpService.put(`/sala/${currentSala.id}`,  newSala );
        setSalas(salas.map(s => s.id === currentSala.id ? { ...s, nome: newSala } : s));
        toast.success('Sala atualizada com sucesso.');
      } else {        
        const response = await httpService.post('/sala',  newSala );
        setSalas([...salas, response.data]);
        toast.success('Sala cadastrada com sucesso.');
      }
      handleCloseModal();
    } catch (error) {
      console.error('There was an error saving the sala!', error);
      toast.error('Erro ao salvar a sala.');
    }
  };

  const handleDeleteSala = async () => {
    try {
      await httpService.delete(`/sala/${salaToDelete.id}`);
      setSalas(salas.filter(s => s.id !== salaToDelete.id));
      handleCloseConfirmModal();
      toast.success('Sala deletada com sucesso.');
    } catch (error) {
      if (error.response) {
        // A resposta foi recebida, mas o servidor retornou um status de erro
        console.error('There was an error deleting the sala!', error.response.data);
        toast.error(`Erro ao deletar a sala: ${error.response.data.message}`);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('No response received:', error.request);
        toast.error('Erro ao deletar a sala: Nenhuma resposta recebida do servidor.');
      } else {
        // Algo aconteceu ao configurar a requisição que acionou um erro
        console.error('Error', error.message);
        toast.error(`Erro ao deletar a sala: ${error.message}`);
      }
    }
  };

  return (
    <div className="salas-container">
      <h1>Salas Cadastradas</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Nova Sala</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codigo</th>
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
          Tem certeza que deseja remover a sala "{salaToDelete?.nome}"?<br />
          <strong>Todas as aulas</strong> associadas a essa sala também serão <strong>removidas</strong>.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteSala}>Remover</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Salas;