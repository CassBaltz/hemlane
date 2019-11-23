const defaultState = {
    activeTodoId: null,
    todoFilter: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'DELETE_TODO':
        return {...state, activeTodoId: null}
    case 'UPDATE_STATUS':
        return {...state, todoFilter: action.payload.status, activeTodoId: null};
    case 'UPDATE_STATUS_AND_TODO':
        return {...state, todoFilter: action.payload.status, activeTodoId: action.payload.activeTodoId};
    case 'CLOSE_SECONDARY_DISPLAY':
        return {...state, activeTodoId: null};
    case 'OPEN_SECONDARY_DISPLAY':
        return {...state, activeTodoId: action.payload};
    default:
      return state;
  }
}
