import React, {Fragment, useState} from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodoForm from "./TodoForm";
import TodoStatusSelector from "./TodoStatusSelector";
import {withStyles} from "@material-ui/core/styles";

const TodoFormAndStatusWrapper = ({classes}) => {
  const [showForm, setShowForm] = useState(false);

  const addButton = (
    <Button
        classes={{root: classes.addButton}}
        variant="outlined"
        size="medium"
        onClick={() => setShowForm(true)}
    >
        Add Todo
    </Button>
  );
  const title = <Typography variant="h6">New Todo</Typography>;

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        { showForm ? title : addButton }
        <TodoStatusSelector />
      </div>
      {showForm && <TodoForm setShowForm={setShowForm} />}
    </Fragment>
  );
};

const styles = {
  addButton: {
    backgroundColor: "#e3fafc"
  }
};

export default withStyles(styles)(TodoFormAndStatusWrapper);
