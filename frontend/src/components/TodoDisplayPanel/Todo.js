import React from "react";
import { connect } from 'react-redux';
import client from "../../graphql/client";
import { UPDATE_TODO } from "../../graphql/tags";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const Todo = ({id, title, status, description, classes, tasks, dispatch}) => {
    const sendUpdate = e => {
        e.preventDefault();
        client.mutate({mutation: UPDATE_TODO, variables: {todo: {id, status: e.target.value}}}).then(response => {
            dispatch({type: "UPDATE_TODO", payload: response.data.updateTodo});
        });
    }

    const showTasks = e => {
        dispatch({ type: "OPEN_SECONDARY_DISPLAY", payload: id });
        window.scrollTo(0, 0);
    }

    const taskLabel = tasks.length ? `See ${tasks.length} Task(s)` : "Add Task";

    return (
      <div className={classes.cardWrapper}>
        <Card>
          <CardHeader classes={{ root: classes.header }} title={title} />
          <CardContent>
            <div className={classes.content}>
            <Typography variant="body1">{description}</Typography>
            <FormControl classes={{ root: classes.select }}>
              <InputLabel id="todo-status-selector-label">Status</InputLabel>
              <Select
                labelId="todo-status-selector-label"
                id="todo-status-selector"
                value={status}
                onChange={sendUpdate}
                classes={{
                    selectMenu: classes.selectInput
                }}
              >
                <MenuItem value="ALL">ALL</MenuItem>
                <MenuItem value="TROUBLESHOOTING">TROUBLESHOOTING</MenuItem>
                <MenuItem value="WIP">WIP</MenuItem>
                <MenuItem value="COMPLETE">COMPLETE</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div className={classes.actionFooter}>
                <Typography classes={{root: classes.actionLabel}} variant="body2">{taskLabel}</Typography>
                <Fab
                    classes={{root: classes.fab}}
                    onClick={showTasks}
                    size="small"
                >
                    <AddIcon/>
                </Fab>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

const styles = {
  cardWrapper: {
    margin: "10px 0"
  },
  header: {
    backgroundColor: "#99e9f2"
  },
  content: {
    display: "flex",
    justifyContent: "space-between"
  },
  select: {
    minWidth: "200px"
  },
  selectInput: {
    paddingLeft: "8px"
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
  fab: {
      backgroundColor: "#b197fc"
  }
};

export default withStyles(styles)(connect(null, null)(Todo));