# Alocação de Salas

Este é um projeto de alocação de salas desenvolvido como parte do curso de Programação Web. O objetivo deste projeto é permitir a gestão de salas, professores, disciplinas e aulas, facilitando a alocação de aulas em diferentes salas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Bootstrap**: Biblioteca de componentes de interface de usuário baseada no Bootstrap.
- **React Router**: Biblioteca para roteamento em aplicações React.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **React Toastify**: Biblioteca para exibir notificações toast.
- **Sonner**: Biblioteca para exibir notificações toast.
- **Framer Motion**: Biblioteca para animações em React.
- **CSS**: Estilização dos componentes.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório para sua máquina local:

```bash


git clone https://github.com/JulianReina96/Alocacao-de-Salas-Front.git
```

2. Navegue até o diretório do projeto:

```bash
cd alocacao-de-salas
```
3. Instale as dependências do projeto:

```bash
npm install

ou

yarn install

```
## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:
```bash
npm start

ou

yarn start
```
O aplicativo estará disponível em http://localhost:3000.

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:
```bash
src/
├── assets/                 # Imagens e outros arquivos estáticos
├── components/             # Componentes React
│   ├── Aulas/              # Componentes relacionados às aulas
│   ├── Disciplinas/        # Componentes relacionados às disciplinas
│   ├── Professor/          # Componentes relacionados aos professores
│   ├── Salas/              # Componentes relacionados às salas
│   ├── loader/             # Componente de carregamento
│   └── Register/           # Componente de registro
├── data/                   # Serviços de dados e fetchers
├── App.js                  # Componente principal da aplicação
├── index.js                # Ponto de entrada da aplicação
└── ...                     # Outros arquivos e diretórios
```

## Funcionalidades
Cadastro de Salas: Permite cadastrar novas salas e editar ou remover salas existentes.
Cadastro de Professores: Permite cadastrar novos professores e editar ou remover professores existentes.
Cadastro de Disciplinas: Permite cadastrar novas disciplinas e editar ou remover disciplinas existentes.
Alocação de Aulas: Permite alocar aulas em salas específicas, selecionando a disciplina, professor, sala, dia da semana e horário.


## Contribuição
Se você deseja contribuir com este projeto, siga os passos abaixo:

Faça um fork do repositório.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas alterações (git commit -m 'Adiciona nova feature').
Faça um push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.


## Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

Nome: Julian Reina
Email: julianreina@gmail.com
GitHub: github.com/seu-usuario
