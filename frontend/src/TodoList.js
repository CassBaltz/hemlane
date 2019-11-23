import React, {useEffect} from "react";
import client from "./graqphql/client";
import { GET_TODOS } from "./graqphql/tags";
import Todo from "./Todo";
import { connect } from "react-redux";

const TodoList = ({todos, status, dispatch}) => {
    useEffect(() => {
        client.query({query: GET_TODOS, variables: { status }}).then(response => {
            dispatch({type: 'SET_TODOS', payload: response.data.getTodos});
        })
    }, [status]);
    if (!todos) return null;
    return todos.map(todo => <Todo key={todo.id} {...todo} />);
};

const mapStateToProps = ({todos, view}) => ({
    todos,
    status: view.todoFilter
});

export default connect(mapStateToProps)(TodoList);