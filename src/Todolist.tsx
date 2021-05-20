import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType, TaskType } from "./App";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterType;
  removeTask: (taskID: string) => void;
  createNewTask: (title: string) => void;
  changeFilter: (filter: FilterType) => void;
  changeStatus: (taskID: string, isDone: boolean) => void;
};

export const Todolist = (props: PropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const addTaskAndClear = () => {
    if (title.trim() !== "") {
      props.createNewTask(title);
      setTitle("");
    } else {
      setError("Title is required!");
      setTitle("");
    }
  };
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTaskAndClear();
    }
  };

  let task = props.tasks.map((item) => {
    const removeTask = () => {
      props.removeTask(item.id);
    };
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeStatus(item.id, newIsDoneValue);
    };
    return (
      <li className={item.isDone ? "is-done" : ""}>
        <input type="checkbox" onChange={changeStatus} checked={item.isDone} />{" "}
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
          className={error ? "error" : ""}
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
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => props.changeFilter("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => props.changeFilter("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => props.changeFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
