import { v1 } from 'uuid';
import { TasksStateType, TaskType } from '../AppWithRedux';
import {
  AddTodoListAT,
  RemoveTodoListAT,
  todoList_1,
  todoList_2,
} from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskID: string;
  todoListID: string;
};

type AddTaskActionType = {
  type: 'ADD-TASK';
  todoListID: string;
  title: string;
};

type ChangeStatusActionType = {
  type: 'CHANGE-STATUS';
  todoListID: string;
  taskID: string;
  isDone: boolean;
};

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  todoListID: string;
  taskID: string;
  title: string;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListAT
  | RemoveTodoListAT;

const initialState: TasksStateType = {
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
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      // const stateCopy = { ...state };
      // let filteredTasks = state[action.todoListID].filter(
      //   (task) => task.id !== action.taskID
      // );
      // stateCopy[action.todoListID] = filteredTasks;
      // return stateCopy;
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(
          (t) => t.id !== action.taskID
        ),
      };
    case 'ADD-TASK':
      let newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListID];
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todoListID] = newTasks;
      console.log(typeof newTasks);
      return stateCopy;

    // return {
    //   ...state,
    //   [action.todoListID]: [newTask, ...state[action.todoListID]],
    // };
    case 'CHANGE-STATUS':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskID ? { ...t, isDone: action.isDone } : t
        ),
      };
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((t) =>
          t.id === action.taskID ? { ...t, title: action.title } : t
        ),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todoListID]: [] };
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.todoListID];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskID: string,
  todoListID: string
): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    taskID,
    todoListID,
  };
};

export const addTaskAC = (
  todoListID: string,
  title: string
): AddTaskActionType => {
  return {
    type: 'ADD-TASK',
    todoListID,
    title,
  };
};

export const changeStatusAC = (
  todoListID: string,
  taskID: string,
  isDone: boolean
): ChangeStatusActionType => {
  return {
    type: 'CHANGE-STATUS',
    todoListID,
    taskID,
    isDone,
  };
};

export const changeTaskTitleAC = (
  todoListID: string,
  taskID: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todoListID,
    taskID,
    title,
  };
};
