import { gql } from "apollo-boost";

const GET_TODOS = gql`
  query GET_TODOS($status: String) {
    getTodos(status: $status) {
      id
      title
      description
      status
      createdAt
      tasks {
          id
          TodoId
          complete
          title
          description
          createdAt
          actions {
              id
              TaskId
              complete
              title
              description
              createdAt
              contact {
                  name
                  email
              }
          }
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UPDATE_TODO($todo: UpdateTodoInput!) {
    updateTodo(todo: $todo) {
      id
      title
      description
      status
      createdAt
    }
  }
`;

const CREATE_TODO = gql`
    mutation CREATE_TODO($todo: CreateTodoInput!) {
        createTodo(todo: $todo) {
            id
            title
            description
            status
            createdAt
        }
    }
`;

const DELETE_TODO = gql`
    mutation DELETE_TODO($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`;

const CREATE_TASK = gql`
  mutation CREATE_TASK($task: CreateTaskInput!) {
    createTask(task: $task) {
      id
      title
      description
      TodoId
      complete
      createdAt
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UPDATE_TASK($task: UpdateTaskInput!) {
    updateTask(task: $task) {
      id
      title
      description
      TodoId
      complete
      createdAt
    }
  }
`;

const CREATE_ACTION = gql`
  mutation CREATE_ACTION($action: CreateActionInput!) {
    createAction(action: $action) {
      id
      title
      description
      TaskId
      contact {
          name
          email
      }
      complete
      createdAt
    }
  }
`;

const UPDATE_ACTION = gql`
  mutation UPDATE_ACTION($action: UpdateActionInput!) {
    updateAction(action: $action) {
      id
      complete
    }
  }
`;



export {
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_TASK,
  GET_TODOS,
  CREATE_TASK,
  CREATE_TODO,
  CREATE_ACTION,
  UPDATE_ACTION
};
