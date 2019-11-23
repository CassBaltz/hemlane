import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import client from "../../graphql/client";
import { UPDATE_ACTION } from "../../graphql/tags";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

const Action = ({
  id,
  title,
  complete,
  description,
  contact,
  classes,
  dispatch
}) => {
  const sendUpdate = e => {
    e.preventDefault();
    client
      .mutate({
        mutation: UPDATE_ACTION,
        variables: { action: { id, complete: !complete } }
      })
      .then(response => {
        dispatch({ type: "UPDATE_ACTION", payload: response.data.updateAction });
      });
  };

  return (
    <div className={classes.cardWrapper}>
      <Card>
        <CardHeader classes={{ root: classes.header }} title={title} />
        <CardContent>
          <div className={classes.content}>
            <div className={classes.textWrapper}>
            <Typography variant="body1">Description: {description}</Typography>
            <Typography variant="body1">Contact Name: {contact.name}</Typography>
            <Typography variant="body1">Contact Email: {contact.email}</Typography>
            </div>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={complete}
                    onChange={sendUpdate}
                    value="complete"
                    color="primary"
                  />
                }
                label="Complete"
              />
            </FormControl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  cardWrapper: {
    marginTop: "20px"
  },
  header: {
    backgroundColor: "#ffec99"
  },
  content: {
    display: "flex",
    justifyContent: "space-between"
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
  showActions: {
    backgroundColor: "#fff3bf"
  },
  hideActions: {
    backgroundColor: "#ffe3e3"
  },
  textWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
  }
};

export default withStyles(styles)(connect()(Action));
