import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import client from "../../graphql/client";
import { CREATE_ACTION } from "../../graphql/tags";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const ActionForm = ({TaskId, dispatch, classes}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const [showForm, setShowForm] = useState(false);

    const submitForm = e => {
    e.preventDefault();
    e.stopPropagation();
    client
      .mutate({
        mutation: CREATE_ACTION,
        variables: {
          action: {
            title,
            description,
            contact: {
                name: contactName,
                email: contactEmail
            },
            TaskId
          }
        }
      })
      .then(result => {
        const action = result.data.createAction;
        setTitle("");
        setDescription("");
        setContactName("");
        setContactEmail("");
        setShowForm(false);
        dispatch({ type: "ADD_ACTION", payload: action });
      });
  };

  if (!showForm) {
    return (
        <div className={classes.showButtonWrapper}>
            <Button
                classes={{root: classes.showButton}}
                type="button"
                onClick={() => setShowForm(true)}
            >
                New Action
            </Button>
        </div>
    );
  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        id="action-title"
        label="Title"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        id="action-description"
        label="Description"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <TextField
        id="action-contact-name"
        label="Contact Name"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => setContactName(e.target.value)}
        value={contactName}
      />
      <TextField
        id="action-contact-email"
        label="Contact Email"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => setContactEmail(e.target.value)}
        value={contactEmail}
      />
      <div className={classes.buttonsWrapper}>
        <Button
          classes={{ root: classes.cancelButton }}
          type="button"
          variant="contained"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
        <Button
          classes={{ root: classes.submitButton }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Action
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
    backgroundColor: "#ffe066",
    color: "black"
  },
  showButton: {
    width: "100%"
  },
  showButtonWrapper: {
    display: "flex",
    alignItems: "center"
  }
};

export default withStyles(styles)(connect()(ActionForm));