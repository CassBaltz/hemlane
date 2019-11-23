import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";

import LocationManager from "./components/LocationManager";
import TodoList from "./components/TodoDisplayPanel/TodoList";
import TaskList from "./components/TaskDisplayPanel/TaskList";

function App({classes}) {
  return (
    <Provider store={store}>
      <LocationManager />
      <Typography classes={{ root: classes.header }} variant="h2">
        The TODO App
      </Typography>
      <div className={classes.appBody}>
        <TodoList />
        <TaskList />
      </div>
    </Provider>
  );
};

const styles = {
  appBody: {
    padding: "10px",
    display: "flex"
  },
  header: {
    textAlign: "center",
    backgroundColor: "#c5f6fa",
    marginBottom: "15px",
    padding: "15px",
    position: "sticky",
    top: "0",
    zIndex: "1"
  }
};

export default withStyles(styles)(App);
