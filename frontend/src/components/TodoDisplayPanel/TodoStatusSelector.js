import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const TodoStatusSelector = ({ status, dispatch, classes }) => {
    const dispatchUpdate = e => {
        dispatch({type: "UPDATE_STATUS", payload: {status: e.target.value}});
    };

    return (
      <FormControl style={{width: "200px"}}>
        <InputLabel id="todo-status-selector-label">Filter Todos</InputLabel>
        <Select
          classes={{
             selectMenu: classes.select
          }}
          labelId="todo-status-selector-label"
          id="todo-status-selector"
          value={status || "ALL"}
          onChange={dispatchUpdate}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="TROUBLESHOOTING">TROUBLESHOOTING</MenuItem>
          <MenuItem value="WIP">WIP</MenuItem>
          <MenuItem value="COMPLETE">COMPLETE</MenuItem>
        </Select>
      </FormControl>
    );
    
};

const mapStateToProps = ({view}) => {
    return {status: view.todoFilter};
};

const styles = {
    select: {
        paddingLeft: "8px"
    }
}

export default withStyles(styles)(connect(mapStateToProps)(TodoStatusSelector));