import React, {useEffect} from 'react';
import { connect } from "react-redux";

const constructHashStatus = ({status, activeTodoId}) => {
    return "#status=" + status + "&activeTodoId=" + activeTodoId;
};

const destructHash = hash => {
    const parts = hash.slice(1).split("&");
    const defaultState = { status: "ALL", activeTodoId: null };
    try {
        const data = parts.reduce((acc, part)  => {
            const [key, val] = part.split("=");
            acc[key] = val === 'null' ? null : val;
            return acc;
        }, {});
        if (!data.status.length) {
            return defaultState;
        }
        return data;
    } catch(e) {
        return defaultState;
    }
};

// Dummy Component that hooks into the Redux Store
// in order to handle updating the window hash when
// relevant view state changes
const LocationManager = ({status, activeTodoId, dispatch}) => {
    useEffect(() => {
      let initialWindowHashData = destructHash(window.location.hash);
        dispatch({ type: "UPDATE_STATUS_AND_TODO", payload: initialWindowHashData })
    }, []);

    useEffect(() => {
        if (status) {
            window.location.hash = constructHashStatus({ status, activeTodoId });
        }
    }, [status, activeTodoId]);
    return null;
};

const mapStateToProps = ({ view }) => {
  return { status: view.todoFilter, activeTodoId: view.activeTodoId };
};

export default connect(mapStateToProps)(LocationManager);