import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterType, TaskType } from './App';

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
};

export const Todolist = (props: PropsType) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const addTaskAndClear = () => {
    if (title.trim() !== '') {
      props.createNewTask(title, props.todoListId);
      setTitle('');
    } else {
      setError('Title is required!');
      setTitle('');
    }
  };
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTaskAndClear();
    }
  };

  let task = props.tasks.map((item) => {
    const removeTask = () => {
      props.removeTask(item.id, props.todoListId);
    };
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeStatus(item.id, newIsDoneValue, props.todoListId);
    };
    return (
      <li className={item.isDone ? 'is-done' : ''}>
        <input type="checkbox" onChange={changeStatus} checked={item.isDone} />{' '}
        <span>{item.title}</span>
        <button onClick={removeTask}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={() => props.removeTodoList(props.todoListId)}>
          x
        </button>
      </h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addTaskAndClear}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>{task}</ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={() => props.changeFilter('all', props.todoListId)}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={() => props.changeFilter('active', props.todoListId)}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={() => props.changeFilter('completed', props.todoListId)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
