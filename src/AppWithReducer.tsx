import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, {useReducer, useState} from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { Todolist } from './Todolist';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducer() {
  const todoList_1 = v1();
  const todoList_2 = v1();

  const [todolists, dispathToTodolists] = useReducer(todoListsReducer,[
    { id: todoList_1, title: 'What to learn', filter: 'all' },
    { id: todoList_2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, dispathToTasks] = useReducer(tasksReducer,{
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

  function changeFilter(filter: FilterType, todolistId: string) {
    dispathToTodolists(ChangeTodoListFilterAC(filter,todolistId))
  }

  function addTodoList(title: string) {
    let action = AddTodoListAC(title)
    dispathToTodolists(action)
    dispathToTasks(action)
  }

  function removeTodoList(todolistId: string) {
    let action = removeTodoListAC(todolistId)
    dispathToTodolists(action)
    dispathToTasks(action)
  }

  function removeTask(taskID: string, todolistId: string) {
    dispathToTasks(removeTaskAC(taskID,todolistId))
  }

  function createNewTask(title: string, todolistId: string) {
    dispathToTasks(addTaskAC(todolistId,title))
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    dispathToTasks(changeStatusAC(todolistId,taskID, isDone))
  }
  function onChangeTodolListTitle(todoListId: string, newTitle: string) {
    dispathToTodolists(ChangeTodoListTitleAC(todoListId,newTitle))
  }
  function onChangeTaskTitle(
    todoListId: string,
    taskId: string,
    newTitle: string
  ) {
    dispathToTasks(changeTaskTitleAC(todoListId,taskId,newTitle))
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
      <Grid item>
        <Paper elevation={5} style={{ padding: '10px' }}>
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
            onChangeTaskTitle={onChangeTaskTitle}
            onChangeTodolListTitle={onChangeTodolListTitle}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
