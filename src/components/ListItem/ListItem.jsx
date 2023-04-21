import React, { useState, useRef, useEffect } from "react";
import { IoMdCreate } from "react-icons/io";
import { TiCancel, TiTick } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import {
  useUpdateTaskMutation,
  useFilterTaskMutation,
} from "../../api/apiTasks";

import "./ListItem.scss";

const ListItem = ({ id, name, onDeleteTask }) => {
  const [taskName, setTaskName] = useState(name);
  const [editingName, setEditingName] = useState(false);
  const [updateTask] = useUpdateTaskMutation();
  const [completedTask] = useFilterTaskMutation();
  const [finishedTasks, setFinishedTasks] = useState(false);
  const [styles, setStyles] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const inputRef = useRef(null);

  const onEditValue = () => {
    setEditingName(!editingName);
  };

  const onSaveValue = () => {
    const newTaskName = inputRef.current.value;
    setTaskName(newTaskName);

    updateTask({ id, name: newTaskName }).unwrap();

    setEditingName(false);
    return;
  };

  const finishTask = (e) => {
    setFinishedTasks(!finishedTasks);

    const completedStyles = {
      transform: "scale(0.95)",
      opacity: "0.35",
      textDecoration: "line-through",
    };

    const target = e.target.checked;

    setStyles(finishedTasks ? null : completedStyles);

    completedTask({ id, completed: !finishedTasks });

    setIsChecked(target);
    localStorage.setItem(`isChecked-${id}`, target);

    localStorage.setItem(
      `task-${id}`,
      JSON.stringify({ completed: !finishedTasks, styles: completedStyles })
    );
  };

  useEffect(() => {
    const taskData = localStorage.getItem(`task-${id}`);
    if (taskData) {
      const { completed, styles } = JSON.parse(taskData);
      setFinishedTasks(completed);
      setStyles(completed ? styles : null);
    }

    const saveCheckedTask = localStorage.getItem(`isChecked-${id}`);
    if (saveCheckedTask) {
      setIsChecked(saveCheckedTask === "true");
    }
  }, [id]);

  return (
    <ul className="list">
      <li style={finishedTasks ? styles : null} className="list-item">
        <input
          onChange={finishTask}
          type="checkbox"
          checked={isChecked}
          className="list-item__checkbox"
        />

        {editingName === true ? (
          <input
            ref={inputRef}
            className="list-item__task list-item__task-input"
            defaultValue={taskName}
            type="text"
          />
        ) : (
          <div className="list-item__task">{taskName}</div>
        )}

        <div className="list-item__buttons">
          {editingName === true ? (
            <button
              onClick={onSaveValue}
              className="list-item__change-btn list-item__change-btn-save"
            >
              <TiTick />
            </button>
          ) : (
            <button onClick={onEditValue} className="list-item__change-btn">
              <IoMdCreate />
            </button>
          )}

          {editingName === true ? (
            <button
              onClick={onEditValue}
              className="list-item__delete-btn list-item__delete-btn-cancel"
            >
              <TiCancel />
            </button>
          ) : (
            <button onClick={onDeleteTask} className="list-item__delete-btn">
              <AiFillDelete />
            </button>
          )}
        </div>
      </li>
    </ul>
  );
};

export default ListItem;
