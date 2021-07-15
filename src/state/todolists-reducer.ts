import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../AppWithRedux';

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

export const todoList_1 = v1();
export const todoList_2 = v1();

const initialState: Array<TodolistType> = [
  { id: todoList_1, title: 'What to learn', filter: 'all' },
  { id: todoList_2, title: 'What to buy', filter: 'all' },
];

export const todoListsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((tdl) => tdl.id !== action.todoListID);
    case 'ADD-TODOLIST':
      const newTodoList: TodolistType = {
        id: action.todoListID,
        title: action.title,
        filter: 'all',
      };
      return [newTodoList, ...state];
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((tdl) =>
        tdl.id === action.todoListID ? { ...tdl, filter: action.filter } : tdl
      );
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((tdl) =>
        tdl.id === action.todoListID ? { ...tdl, title: action.newTitle } : tdl
      );
    default:
      return state;
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
