import React, {useEffect} from "react";
import client from "../../graphql/client";
import { GET_TODOS } from "../../graphql/tags";
import Todo from "./Todo";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TodoFormAndStatusWrapper from "./TodoFormAndStatusWrapper";

const TodoList = ({todos, status, classes, dispatch}) => {
    useEffect(() => {
        status = status === "ALL" ? null : status;
        client.query({fetchPolicy: "network-only", query: GET_TODOS, variables: { status }}).then(response => {
            dispatch({type: 'SET_TODOS', payload: response.data.getTodos});
        })
    }, [status]);
    if (!todos) return null;

    const filteredTodos = todos
        .filter(todo => status === "ALL" || todo.status === status)
        .map(todo => <Todo key={todo.id} {...todo} />);

    return (
      <div className={classes.todoListWrapper}>
        <TodoFormAndStatusWrapper />
        {filteredTodos}
      </div>
    );
};

const mapStateToProps = ({todos, view}) => ({
    todos,
    status: view.todoFilter
});

const styles = {
  todoListWrapper: {
    width: "50%",
    padding: "0 20px",
    borderRight: "1px solid #dee2e6"
  }
};

export default withStyles(styles)(connect(mapStateToProps)(TodoList));