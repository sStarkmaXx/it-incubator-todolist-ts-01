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
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { Todolist } from './Todolist';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

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

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

  function changeFilter(filter: FilterType, todolistId: string) {
    dispatch(ChangeTodoListFilterAC(filter, todolistId));
  }

  function addTodoList(title: string) {
    dispatch(AddTodoListAC(title));
  }

  function removeTodoList(todolistId: string) {
    dispatch(removeTodoListAC(todolistId));
  }

  function removeTask(taskID: string, todolistId: string) {
    dispatch(removeTaskAC(taskID, todolistId));
  }

  function createNewTask(title: string, todolistId: string) {
    dispatch(addTaskAC(todolistId, title));
  }

  function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
    dispatch(changeStatusAC(todolistId, taskID, isDone));
  }
  function onChangeTodolListTitle(todoListId: string, newTitle: string) {
    dispatch(ChangeTodoListTitleAC(todoListId, newTitle));
  }
  function onChangeTaskTitle(
    todoListId: string,
    taskId: string,
    newTitle: string
  ) {
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
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

export default AppWithRedux;
