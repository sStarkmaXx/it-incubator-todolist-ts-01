import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type FilterType = 'all' | 'completed' | 'active';

function App() {
  const todoList_1 = v1();
  const todoList_2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todoList_1, title: 'What to lern', filter: 'all' },
    { id: todoList_2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoList_1]: [
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'TS', isDone: true },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'NodeJS', isDone: false },
    ],
    [todoList_2]: [
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Eggs', isDone: true },
      { id: v1(), title: 'Tomatos', isDone: false },
    ],
  });

  //const [filter, setFilter] = useState<FilterType>('all');
  function changeFilter(filter: FilterType, todolistId: string) {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistId ? { ...tl, filter: filter } : tl
      )
    );
  }

  function removeTodoList(todolistId: string) {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    const copyTasks = { ...tasks };
    delete copyTasks[todolistId];
    setTasks(copyTasks);
  }

  function removeTask(taskID: string, todolistId: string) {
    tasks[todolistId] = tasks[todolistId].filter((task) => task.id !== taskID);
    setTasks({ ...tasks });
  }

  function createNewTask(title: string, todolistId: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const copyTasks = { ...tasks };
    copyTasks[todolistId] = [newTask, ...tasks[todolistId]];
    setTasks(copyTasks);
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    const copyTasks = { ...tasks };
    copyTasks[todolistId] = tasks[todolistId].map((t) =>
      t.id === taskID ? { ...t, isDone } : t
    );
    setTasks(copyTasks);
  }

  function getFilteredTask(tl: TodolistType) {
    switch (tl.filter) {
      case 'active':
        return tasks[tl.id].filter((t) => t.isDone === false);
      case 'completed':
        return tasks[tl.id].filter((t) => t.isDone === true);
      default:
        return tasks[tl.id];
    }
  }

  const todoListComponents = todolists.map((tl) => {
    const tasksForTodoList = getFilteredTask(tl);
    return (
      <Todolist
        key={tl.id}
        todoListId={tl.id}
        title={tl.title}
        tasks={tasksForTodoList}
        filter={tl.filter}
        removeTodoList={removeTodoList}
        removeTask={removeTask}
        createNewTask={createNewTask}
        changeFilter={changeFilter}
        changeStatus={changeStatus}
      />
    );
  });

  return <div className="App">{todoListComponents}</div>;
}

export default App;
