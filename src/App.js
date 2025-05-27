import './App.css';
import { useState, useEffect } from 'react';
import { Bstrash, BsBookmark, BsBookmarkCheckFill, BsTrash, BsBookmarkCheck } from 'react-icons/bs';

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const res = await fetch(`${API}/todos`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      
      setLoading(false);

      setTodos(res);
    };
    
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      title,
      time,
      done: false,
    };

    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const newTodo = await res.json();

    setTodos((prevState) => [...prevState, newTodo]);

    setTime("");
    setTitle("");
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  const handleEdit = async (todo) => {
    todo.done = !todo.done;

    await fetch(`${API}/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    });

    setTodos((prevState) => prevState.map((t) => (t.id === todo.id ? todo : t)));
  }
  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Task Manager</h1>
      </div>
      <div className='form-todo'>
        <h3>Insira a sua próxima tarefa</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="title">Título da tarefa:</label>
            <input
              type="text"
              name="title"
              placeholder='Digite o título da tarefa'
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="time">Tempo estimado:</label>
            <input
              type="text"
              name="time"
              placeholder='Digite o tempo estimado'
              value={time || ""}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
      <div className='list-todo'>
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Nenhuma tarefa cadastrada</p>}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? 'todo-done' : ''}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
