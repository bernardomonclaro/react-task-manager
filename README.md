# React Task Manager

Um aplicativo simples de lista de tarefas (todo list) feito com React. Permite adicionar, marcar como concluído, e deletar tarefas com tempo estimado. Utiliza um backend fake com JSON Server para armazenar os dados.

---

## Funcionalidades

- Adicionar novas tarefas com título e tempo estimado
- Marcar tarefas como concluídas (com efeito de texto riscado)
- Deletar tarefas
- Interface moderna com React Hooks e React Icons
- Persistência de dados via JSON Server (API REST)

---

## Tecnologias utilizadas

- React
- React Hooks (`useState`, `useEffect`)
- React Icons
- JSON Server (backend fake)
- Fetch API para comunicação com backend
- CSS moderno com gradiente e estilo minimalista


## Para rodar o projeto

Se não tiver o json-server instalado globalmente, rode:

`npm install -g json-server`

Depois execute o servidor:

`json-server --watch data/db.json --port 5000`

Em outro terminal, rode:

`npm start`