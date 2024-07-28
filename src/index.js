const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const routers = require("./routers");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json())

routers(app)

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect DB success')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log("Server is running in port: " + port);
});
