import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {
  let tasks1 = [
    { id: 1, title: 'React', isDone: true },
    { id: 2, title: 'TS', isDone: true },
    { id: 3, title: 'CSS', isDone: true },
  ];
  let tasks2 = [
    { id: 1, title: 'Angular', isDone: true },
    { id: 2, title: 'Vue', isDone: false },
    { id: 3, title: 'Node JS', isDone: true },
  ];
  return (
    <div className="App">
      <Todolist title="What to Learn" tasks={tasks1} />
      <Todolist title="Books" tasks={tasks2} />
    </div>
  );
}

export default App;
