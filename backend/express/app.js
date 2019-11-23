const express = require("express");
const PORT = 4000;
const app = express();
const db = require("../db/models/index");
const server = require("../graphql/server");
db.sequelize.authenticate().then(() => {
    // run any migrations
    db.sequelize.sync();
    server.applyMiddleware({app});
    app.listen(PORT, console.log(`currently listening on port ${PORT}`));
}).catch(e => {console.log(e);});
