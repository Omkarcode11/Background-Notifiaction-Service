let express = require("express");
let app = express();
let dbConfig = require("./config/db.config");
let mongoose = require("mongoose");
require('dotenv').config()

const { PORT } = require("./config/server.config");
const { backgroundService } = require("./cron/emailSenderBackgroundService");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connection to db
console.log(dbConfig.DB_STRING)
mongoose.connect(dbConfig.DB_STRING);
const db = mongoose.connection;
db.on("error", () => {
  console.log("err while connecting db");
});
db.once("open", () => {
  console.log("connected to DB");
  backgroundService
});




// add routes
require('./routes/ticketNotification.routes')(app)

app.listen(PORT, () => console.log("running on 7777"));
