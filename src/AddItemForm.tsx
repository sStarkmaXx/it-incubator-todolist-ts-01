import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title);
      setTitle('');
    } else {
      setError('Title is required!');
    }
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addItem();
    }
  };
  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={title}
        onChange={onChangeTitle}
        onKeyPress={onKeyPressAddTask}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
