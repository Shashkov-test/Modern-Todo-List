import React, { useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { MdAddTask } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { useCreateTaskMutation } from "../../api/apiTasks";

import "./CreatingTask.scss";

const CreatingTask = () => {
  const [createTask] = useCreateTaskMutation();

  const [taskName, setTaskName] = useState("");

  const onCreateNewTask = () => {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      completed: false,
    };

    if (newTask.name.length !== 0) {
      createTask(newTask).unwrap();
    }

    setTaskName("");
  };

  return (
    <div className="creatingTask">
      <div className="creatingTask__icon">
        <FcTodoList />
      </div>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        type="text"
        className="creatingTask__input"
        placeholder="What is next?"
        style={{ paddingLeft: "10px" }}
      />
      <button onClick={onCreateNewTask} className="creatingTask__btn">
        New task <MdAddTask />
      </button>
    </div>
  );
};

export default CreatingTask;
