import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'TS', isDone: true },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'NodeJS', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  function changeFilter(filter: FilterType) {
    setFilter(filter);
  }
  function createNewTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function removeTask(taskID: string) {
    const filteredTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(filteredTasks);
  }

  function getFilteredTask() {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => t.isDone === false);
      case 'completed':
        return tasks.filter((t) => t.isDone === true);
      default:
        return tasks;
    }
  }

  return (
    <div className="App">
      <Todolist
        title="What to Learn"
        tasks={getFilteredTask()}
        removeTask={removeTask}
        createNewTask={createNewTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
