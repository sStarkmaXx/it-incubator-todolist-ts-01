import React, { ChangeEvent } from 'react';
import { FilterType, TaskType } from './App';
import { AddItemForm } from './AddItemForm';
import EditableSpan from './EditableSpan';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type PropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterType;
  removeTodoList: (todolistId: string) => void;
  removeTask: (taskID: string, todolistId: string) => void;
  createNewTask: (title: string, todolistId: string) => void;
  changeFilter: (filter: FilterType, todolistId: string) => void;
  changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void;
  onChangeTaskTitle: (
    todoListId: string,
    taskId: string,
    newTitle: string
  ) => void;
  onChangeTodolListTitle: (todoListId: string, newTitle: string) => void;
};

export const Todolist = (props: PropsType) => {
  const addTask = (title: string) => {
    props.createNewTask(title, props.todoListId);
  };

  const onChangeTodoListTitle = (newTitle: string) =>
    props.onChangeTodolListTitle(props.todoListId, newTitle);

  let task = props.tasks.map((item) => {
    const removeTask = () => {
      props.removeTask(item.id, props.todoListId);
    };

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeStatus(item.id, newIsDoneValue, props.todoListId);
    };

    const onChangeTaskTitle = (newTitle: string) =>
      props.onChangeTaskTitle(props.todoListId, item.id, newTitle);

    return (
      <li className={item.isDone ? 'is-done' : ''}>
        <input type="checkbox" onChange={changeStatus} checked={item.isDone} />{' '}
        <EditableSpan value={item.title} onChangeTitle={onChangeTaskTitle} />
        <button onClick={removeTask}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>
        <EditableSpan
          value={props.title}
          onChangeTitle={onChangeTodoListTitle}
        />
        <IconButton onClick={() => props.removeTodoList(props.todoListId)}>
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForm addItem={addTask} />
      </div>
      <ul>{task}</ul>
      <div>
        <Button
          size="small"
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => props.changeFilter('all', props.todoListId)}
        >
          All
        </Button>
        <Button
          size="small"
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          onClick={() => props.changeFilter('active', props.todoListId)}
          style={{ marginLeft: '5px' }}
        >
          Active
        </Button>
        <Button
          size="small"
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => props.changeFilter('completed', props.todoListId)}
          style={{ marginLeft: '5px' }}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
