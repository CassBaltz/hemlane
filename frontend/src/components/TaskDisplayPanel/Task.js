import React, {useState} from "react";
import { connect } from "react-redux";
import client from "../../graphql/client";
import { UPDATE_TASK } from "../../graphql/tags";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import ActionList from "./ActionList";

const Task = ({ id, title, complete, description, classes, actions, dispatch }) => {
  const [showActions, setShowActions] = useState(false);
  const sendUpdate = e => {
    e.preventDefault();
    client
      .mutate({
        mutation: UPDATE_TASK,
        variables: { task: { id, complete: !complete } }
      })
      .then(response => {
        dispatch({ type: "UPDATE_TASK", payload: response.data.updateTask });
      });
  };

  const actionButtonStyle = showActions ? classes.hideActions : classes.showActions;
  const actionButtonIcon = showActions ? <CloseIcon /> : <AddIcon />;
  const actionButtonLabel = showActions ? "Hide Actions" : "See Actions";

  return (
    <div className={classes.cardWrapper}>
      <Card>
        <CardHeader classes={{ root: classes.header }} title={title} />
        <CardContent>
          <div className={classes.content}>
            <Typography variant="body1">{description}</Typography>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={complete}
                    onChange={sendUpdate}
                    value="complete"
                    color="primary"
                  />
                }
                label="Complete"
              />
            </FormControl>
          </div>
          <div className={classes.actionFooter}>
            <Typography classes={{ root: classes.actionLabel }} variant="body2">
              {actionButtonLabel}
            </Typography>
            <Fab classes={{root: actionButtonStyle}} onClick={() => setShowActions(!showActions)} size="small">
              {actionButtonIcon}
            </Fab>
          </div>
            { showActions && <ActionList TaskId={id} actions={actions} /> }
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  cardWrapper: {
    margin: "10px 0"
  },
  header: {
    backgroundColor: "#e5dbff"
  },
  content: {
    display: "flex",
    justifyContent: "space-between"
  },
  actionFooter: {
    padding: "15px 0 0 0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  actionLabel: {
    marginRight: "10px"
  },
  showActions: {
    backgroundColor: "#fff3bf"
  },
  hideActions: {
    backgroundColor: "#ffe3e3"
  }
};

export default withStyles(styles)(connect()(Task));
