import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { HttpService } from '../../data/fetchers/HttpService';
import './Professor.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';

const Professor = () => {
  const [professores, setProfessores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDisciplinasModal, setShowDisciplinasModal] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [newProfessor, setNewProfessor] = useState({ nome: '' });
  const [professorToDelete, setProfessorToDelete] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);

  const httpService = new HttpService();

  const fetchProfessores = async () => {
    try {
      const response = await httpService.get('/professor');
      setProfessores(response.data);
    } catch (error) {
      console.error('There was an error fetching the professores!', error);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

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
    setDisciplinas(professor.disciplinas || []);
    setShowDisciplinasModal(true);
  };

  const handleCloseDisciplinasModal = () => {
    setShowDisciplinasModal(false);
    setCurrentProfessor(null);
    setDisciplinas([]);
  };

  const handleSaveProfessor = async () => {
    if (!newProfessor.nome) {
      toast.error('O nome do professor é obrigatório.');
      return;
    }

    try {
      if (currentProfessor) {
        await httpService.put(`/professor/${currentProfessor.id}`, newProfessor.nome);
        setProfessores(professores.map(p => p.id === currentProfessor.id ? { ...p, nome: newProfessor.nome } : p));
        toast.success("Professor editado com sucesso!");
      } else {
        await httpService.post('/professor', newProfessor.nome);
        fetchProfessores();
        toast.success("Professor adicionado com sucesso!"); // Recarrega a lista de professores após adicionar um novo professor
      }
      handleCloseModal();
    } catch (error) {
      console.error('There was an error saving the professor!', error);
    }
  };

  const handleDeleteProfessor = async () => {
    try {
      await httpService.delete(`/professor/${professorToDelete.id}`);
      setProfessores(professores.filter(p => p.id !== professorToDelete.id));
      setProfessorToDelete(null);
      toast.success("Professor removido com sucesso!");
    } catch (error) {
      toast.error('There was an error deleting the professor!', error);
    }
  };

  return (
    
    
    <div className="professores-container">
      <Toaster position="top-right" />
      <ToastContainer />
      <h1>Professores Cadastrados</h1>
      <Button variant="primary" onClick={() => handleShowModal(null)}>Cadastrar Novo Professor</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Codigo Professor</th>
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
            {disciplinas.map((disciplina, index) => (
              <li key={index}>{disciplina.nome}</li>
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