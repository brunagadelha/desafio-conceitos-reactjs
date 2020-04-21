import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepositories(response.data);
    });

  }, []);

  async function handleAddRepository() {
    const data = {
      title: "New Repo",
      url: "https://github.com/brunagadelha/new_repo",
      techs: ['NodeJS', 'ReactJS']
    };

    const response = await api.post(`repositories`, data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(x => x.id == id);

    if (repositoryIndex !== -1) {
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(x => {
          return (<li key={x.id}>
            {x.title}

            <button onClick={() => handleRemoveRepository(x.id)}>
              Remover
            </button>
          </li>)
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
