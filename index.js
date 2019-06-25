const express = require('express');

const server = express();

server.use(express.json());

let contador = 0;
projetos = [{"id": "1", "title": "Projeto1", "tasks": []},
            {"id": "2", "title": "Projeto2", "tasks": []}];

server.get('/projects', (req, res) => {
    return res.json(projetos);
})

function ProjectExists(req, res, next) {
    const { id } = req.params;

    const projeto = projetos.find(p => p.id === id);

    if (!projeto){
        return res.status('400').json({ "Mensagem": "Projeto não existe" });
    }

    return next();
}

function logRegister(req, res, next) {
    contador++;
    
    console.log(`Número de Requisições:${contador}`);

    return next();
}

server.use(logRegister);

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const projeto = {
        id,
        title,
        tasks: []
    }
    
    projetos.push(projeto);

    return res.json(projetos);
})

server.put('/projects/:id', ProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projeto = projetos.find(p => p.id === id);

    projeto.title = title;

    return res.json(projetos);
})

server.delete('/projects/:id', ProjectExists, (req, res) => {
    const { id } = req.params;

    const projetoIndex = projetos.findIndex(p => p.id == id);

    projetos.splice(projetoIndex, 1);

    return res.json(projetos);
})

server.post('/projects/:id/tasks', ProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const projeto = projetos.find(p => p.id === id);

    projeto.tasks.push(title);

    return res.json(projetos);
})

server.listen(3000);