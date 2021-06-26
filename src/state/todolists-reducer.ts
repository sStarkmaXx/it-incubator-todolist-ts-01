import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST';
  todoListID: string;
};

export type AddTodoListAT = {
  type: 'ADD-TODOLIST';
  title: string;
  todoListID: string;
};

type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER';
  filter: FilterType;
  todoListID: string;
};

type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE';
  todoListID: string;
  newTitle: string;
};

export type ActionType =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeTodoListFilterAT
  | ChangeTodoListTitleAT;

export const todoListsReducer = (
  todoLists: Array<TodolistType>,
  action: ActionType
) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter((tdl) => tdl.id !== action.todoListID);
    case 'ADD-TODOLIST':
      const newTodoList: TodolistType = {
        id: action.todoListID,
        title: action.title,
        filter: 'all',
      };
      return [newTodoList, ...todoLists];
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map((tdl) =>
        tdl.id === action.todoListID ? { ...tdl, filter: action.filter } : tdl
      );
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map((tdl) =>
        tdl.id === action.todoListID ? { ...tdl, title: action.newTitle } : tdl
      );
    default:
      return todoLists;
  }
};

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
  return {
    type: 'REMOVE-TODOLIST',
    todoListID,
  };
};

export const AddTodoListAC = (title: string): AddTodoListAT => {
  return {
    type: 'ADD-TODOLIST',
    title,
    todoListID: v1(),
  };
};

export const ChangeTodoListFilterAC = (
  filter: FilterType,
  todoListID: string
): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todoListID,
  };
};

export const ChangeTodoListTitleAC = (
  todoListID: string,
  newTitle: string
): ChangeTodoListTitleAT => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    todoListID,
    newTitle,
  };
};
