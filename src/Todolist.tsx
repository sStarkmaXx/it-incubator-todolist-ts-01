import React from 'react';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

let taska = React.createRef<HTMLInputElement>();

export const Todolist = (props: PropsType) => {
  let addTask = () => {
    let taskName = taska.current?.value;
    if (taskName != undefined) {
    }
  };
  let task = props.tasks.map((item) => {
    return (
      <li>
        <input type="checkbox" checked={item.isDone} />{' '}
        <span>{item.title}</span>
      </li>
    );
  });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input ref={taska} />
        <button>+</button>
      </div>
      <ul>{task}</ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
