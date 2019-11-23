const addTask = (state, action) => {
    const newState = [];
    let newTask, newTodo, newTodoTasks;
    state.forEach(todo => {
        newTodo = { ...todo };
        newTodoTasks = [];
        if (todo.id === action.payload.TodoId) {
            newTodoTasks.push(action.payload);
        }
        newTodo.tasks.forEach(task => {
            newTask = { ...task };
            newTodoTasks.push(newTask);
        });
        newTodo = { ...newTodo, ...{ tasks: newTodoTasks } };
        newState.push(newTodo);
    });
    return newState;
};

const addAction = (state, action) => {
    const newState = [];
    let newTask, newTodo, newTodoTasks, newTaskActions, newAction;
    state.forEach(todo => {
        newTodo = { ...todo };
        newTodoTasks = [];
        newTodo.tasks.forEach(task => {
            newTask = { ...task };
            newTaskActions = [];
            if (task.id === action.payload.TaskId) {
                newTaskActions.push(action.payload);
            }
            newTask.actions.forEach(action => {
                newAction = {...action};
                newTaskActions.push(newAction);
            })
            newTask = {...newTask, ...{actions: newTaskActions}};
            newTodoTasks.push(newTask);
        });
        newTodo = { ...newTodo, ...{ tasks: newTodoTasks } };
        newState.push(newTodo);
    });
    return newState;
};

const updateAction = (state, action) => {
  const newState = [];
  let newTask, newTodo, newTodoTasks, newTaskActions, newAction;
  state.forEach(todo => {
    newTodo = { ...todo };
    newTodoTasks = [];
    newTodo.tasks.forEach(task => {
      newTask = { ...task };
      newTaskActions = [];
      newTask.actions.forEach(act => {
        newAction = { ...act };
        if (newAction.id === action.payload.id) {
          newAction = {...newAction, ...action.payload};
        }
        newTaskActions.push(newAction);
      });
      newTask = { ...newTask, ...{ actions: newTaskActions } };
      newTodoTasks.push(newTask);
    });
    newTodo = { ...newTodo, ...{ tasks: newTodoTasks } };
    newState.push(newTodo);
  });
  return newState;
};


export default (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [action.payload, ...state];
        case "DELETE_TODO":
            const deleteTodoArray = [];
            state.forEach(todo => {
                if (todo.id !== action.payload.id) {
                    return deleteTodoArray.push(todo);
                }
            });
            return deleteTodoArray;
        case "SET_TODOS":
            return [...action.payload];
        case "UPDATE_TODO":
            return state.map(todo => {
              let newTodo = {...todo};
              if (action.payload.id === todo.id) {
                newTodo = { ...todo, ...action.payload };
              }
              return newTodo;
            });
        case "UPDATE_TASK":
            const newState = [];
            let newTask, newTodo, newTodoTasks;
            state.forEach(todo => {
                newTodo = {...todo};
                newTodoTasks = [];
                newTodo.tasks.forEach(task => {
                    newTask = {...task};
                    if (task.id === action.payload.id) {
                        newTask = {...newTask, ...action.payload}
                    }
                    newTodoTasks.push(newTask);
                });
                newTodo = {...newTodo, ...{tasks: newTodoTasks}}
                newState.push(newTodo);
            });
            return newState;
        case "ADD_TASK": {
            return addTask(state, action);
        }
        case "ADD_ACTION": {
            return addAction(state, action);
        }
        case "UPDATE_ACTION": {
            return updateAction(state, action);
        }
        default:
            return state;
    }
};