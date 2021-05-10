import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterType, TaskType } from './App';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskID: string) => void;
  createNewTask: (title: string) => void;
  changeFilter: (filter: FilterType) => void;
};

let taska = React.createRef<HTMLInputElement>();

export const Todolist = (props: PropsType) => {
  const [title, setTitle] = useState<string>('');

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const addTaskAndClear = () => {
    props.createNewTask(title);
    setTitle('');
  };
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskAndClear();
    }
  };

  let task = props.tasks.map((item) => {
    const removeTask = () => {
      props.removeTask(item.id);
    };
    return (
      <li>
        <input type="checkbox" checked={item.isDone} />{' '}
        <span>{item.title}</span>
        <button onClick={removeTask}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          ref={taska}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={addTaskAndClear}>+</button>
      </div>
      <ul>{task}</ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
};
