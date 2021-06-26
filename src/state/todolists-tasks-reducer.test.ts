import { TasksStateType, TodolistType } from '../App';
import { tasksReducer } from './tasks-reducer';
import { AddTodoListAC, todoListsReducer } from './todolists-reducer';

test('correct task should be change status', () => {
  const startTasksState: TasksStateType = {};

  const startTodoListsState: Array<TodolistType> = [];

  const action = AddTodoListAC('newTodolist');
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodoListsState = todoListsReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoListID);
  expect(idFromTodoLists).toBe(action.todoListID);
});
