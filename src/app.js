// Angelino Fernando Nhampossa
const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repos = {
    id: uuid(), 
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repos);

  return response.json(repos);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes,
  };

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repositório não encontrado.' });
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repositório não encontrado.' });
  }

  repositories[index].likes += 1;

  return response.json(repositories[index]);
});

module.exports = app;
