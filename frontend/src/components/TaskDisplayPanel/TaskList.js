import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { Typography } from "@material-ui/core";


const TaskList = ({ tasks, classes, todoId, todoTitle, dispatch}) => {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
      if (!tasks) {
          return;
      }
      setShowForm(!tasks.length);
  }, [todoId]);
  if (!todoId || !tasks) return null;
  return (
    <div className={classes.taskListWrapper}>
        <Typography classes={{root: classes.header}} variant="h5">{todoTitle} tasks</Typography>
      <div className={classes.listHeader}>
        <Button
          classes={{ root: classes.addTaskButton }}
          variant="outlined"
          size="medium"
          onClick={() => setShowForm(true)}
        >
          ADD TASK
        </Button>
        <Button
          classes={{ root: classes.closeButton }}
          variant="outlined"
          size="medium"
          onClick={() => dispatch({ type: "CLOSE_SECONDARY_DISPLAY" })}
        >
          HIDE TASKS
        </Button>
      </div>
      {showForm && <TaskForm setShowForm={setShowForm} />}
      {tasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ todos, view }) => {
  let tasks, todoTitle;
  todos.forEach(todo => {
      if (todo.id === view.activeTodoId) {
          tasks = todo.tasks;
          todoTitle = todo.title;
      }
  });
  return {
      tasks,
      todoId: view.activeTodoId,
      todoTitle
  };
};

const styles = {
  taskListWrapper: {
    width: "49%",
    padding: "0 20px"
  },
  header: {
    border: "2px solid #99e9f2",
    borderRadius: "4px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#f8f9fa"
  },
  listHeader: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  closeButton: {
    backgroundColor: "#ffe3e3"
  },
  addTaskButton: {
    backgroundColor: "#f3f0ff"
  }
};

export default withStyles(styles)(connect(mapStateToProps)(TaskList));
