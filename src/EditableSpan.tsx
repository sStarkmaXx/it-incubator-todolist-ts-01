import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

export type EditableSpanPropsType = {
  value: string;
  onChangeTitle: (newTitle: string) => void;
};
function EditableSpan(props: EditableSpanPropsType) {
  const [title, setTitle] = useState(props.value);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function activateViewModeOnKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      activateViewMode();
    }
  }
  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setTitle(e.currentTarget.value);
  }
  function activateEditMode() {
    setEditMode(true);
  }
  function activateViewMode() {
    if (title.trim() !== "") {
      setEditMode(false);
      props.onChangeTitle(title);
    } else {
      setError("Title is required!");
    }
  }
  return editMode ? (
    <TextField
      value={error ? error : title}
      autoFocus
      onBlur={activateViewMode}
      onChange={onChangeTitle}
      className={error ? "error" : ""}
      onKeyPress={activateViewModeOnKey}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
}

export default EditableSpan;
