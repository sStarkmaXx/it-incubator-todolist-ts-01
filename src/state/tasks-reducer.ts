import { v1 } from 'uuid';
import { TasksStateType, TaskType } from '../App';

type RemoveTaskAT = {
  type: 'REMOVE-TASK';
  taskID: string;
  todoListID: string;
};

type AddTaskAT = {
  type: 'ADD-TASK';
  todoListID: string;
  title: string;
};

export type ActionsType = RemoveTaskAT | AddTaskAT;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      let filteredTasks = state[action.todoListID].filter(
        (task) => task.id !== action.taskID
      );
      return { ...state, filteredTasks };
    case 'ADD-TASK':
      let newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      return {
        ...state,
        [action.todoListID]: [newTask, ...state[action.todoListID]],
      };
    default:
      throw new Error('I dont understand this type');
  }
};

export const FirstTasksAC = (
  taskID: string,
  todoListID: string
): RemoveTaskAT => {
  return {
    type: 'REMOVE-TASK',
    taskID,
    todoListID,
  };
};

export const AddTaskAC = (todoListID: string, title: string): AddTaskAT => {
  return {
    type: 'ADD-TASK',
    title,
    todoListID,
  };
};
