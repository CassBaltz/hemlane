const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const app = express();
const db = require("../db/models/index");
const server = require("../graphql/server");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", (req, res) => {
    console.log("serving index");
    res.sendFile(path.join(__dirname, "./../../frontend/build/index.html"));
});

app.use(express.static(path.join(__dirname, "./../../frontend/build")));

db.sequelize.authenticate().then(() => {
    // run any migrations
    db.sequelize.sync();
    server.applyMiddleware({app});
    app.listen(PORT, console.log(`currently listening on port ${PORT}`));
}).catch(e => {console.log(e);});
