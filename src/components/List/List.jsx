import React, { useState } from "react";
import ListItem from "../ListItem/ListItem";
import { useGetTasksQuery, useDeleteTaskMutation } from "../../api/apiTasks";

import "./List.scss";

const List = () => {
  const { data: tasks = [] } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();

  const [filter, setFilter] = useState("all");

  const handleAllFilter = () => {
    setFilter("all");
  };

  const handleIncompletedFilter = () => {
    setFilter("incompleted");
  };

  const handleCompletedFilter = () => {
    setFilter("completed");
  };

  const onDeleteTask = (id) => {
    deleteTask(id);
  };

  const renderTasksList = (arr) => {
    if (arr.length === 0) {
      return <h2 className="no-tasks">No tasks yet.</h2>;
    }

    const filteredTasks = arr.filter((item) => {
      if (filter === "incompleted") {
        return !item.completed;
      } else if (filter === "completed") {
        return item.completed;
      } else {
        return true;
      }
    });

    if (filteredTasks.length === 0 && filteredTasks !== "all") {
      return <h2 className="no-tasks">Here's no {filter} tasks.</h2>;
    } else {
      return filteredTasks.map(({ id, ...props }) => {
        return (
          <ListItem
            key={id}
            {...props}
            id={id}
            onDeleteTask={() => onDeleteTask(id)}
          />
        );
      });
    }
  };

  const elements = renderTasksList(tasks);

  return (
    <>
      <div className="filterButtons">
        <button
          type="button"
          onClick={handleAllFilter}
          className="filterButtons__btn all"
        >
          <span style={filter === "all" ? { background: "none" } : null}>
            All
          </span>
        </button>

        <button
          type="button"
          onClick={handleIncompletedFilter}
          className="filterButtons__btn incompleted"
        >
          <span
            style={filter === "incompleted" ? { background: "none" } : null}
          >
            Incompleted
          </span>
        </button>

        <button
          type="button"
          onClick={handleCompletedFilter}
          className="filterButtons__btn completed"
        >
          <span style={filter === "completed" ? { background: "none" } : null}>
            Completed
          </span>
        </button>
      </div>

      {elements}
    </>
  );
};

export default List;
