const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(`mongodb+srv://huyminh12:${process.env.MONGO_DB}@cluster0.ys3ufsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Connect DB success')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log("Server is running in port: " + port);
});
