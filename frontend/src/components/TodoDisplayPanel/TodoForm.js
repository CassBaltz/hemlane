import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import client from "../../graphql/client";
import { CREATE_TODO } from "../../graphql/tags";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";


const TodoForm = ({setShowForm, classes, dispatch}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const submitForm = e => {
        e.preventDefault();
        e.stopPropagation();
        client.mutate({
            mutation: CREATE_TODO,
            variables: {
                todo: {
                    title,
                    description
                }
            }
        }).then(result => {
            const todo = result.data.createTodo;
            setTitle("");
            setDescription("");
            setShowForm(false);
            dispatch({type: "ADD_TODO", payload: {...todo, tasks: []}});
        });
    };

    return (
      <form className={classes.form} onSubmit={submitForm}>
        <TextField
          id="todo-title"
          label="Title"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          id="todo-description"
          label="Description"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <div className={classes.buttonsWrapper}>
          <Button onClick={() => setShowForm(false)} variant="contained">
            Cancel
          </Button>
          <Button classes={{root: classes.submitButton}}type="submit" variant="contained" color="primary">
            Add
          </Button>
        </div>
      </form>
    );
};

const styles = {
  textField: {
    width: "100%"
  },
  buttonsWrapper: {
      display: "flex",
      justifyContent: "flex-end"
  },
  submitButton: {
      marginLeft: "10px",
      backgroundColor: "#1098ad"
  },
  form: {
      marginBottom: "20px"
  }
};

export default withStyles(styles)(connect()(TodoForm));