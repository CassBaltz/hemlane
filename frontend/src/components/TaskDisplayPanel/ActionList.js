import React from "react";
import ActionForm from "./ActionForm";
import Action from "./Action";
import Card from "@material-ui/core/Card";

const ActionList = ({actions, TaskId}) => {
    if (!actions) return null;
    return (
      <div style={{ padding: "10px", marginTop: "20px" }}>
        <Card style={{padding: "10px"}}>
          <ActionForm TaskId={TaskId} />
          {actions.map(action => (
            <Action key={action.id} {...action} />
          ))}
        </Card>
      </div>
    );
}

export default ActionList;