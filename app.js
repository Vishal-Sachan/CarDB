const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 5500;
const cars = require("./models/cars");

app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/Automobiles", {})
    .then(() => {
        console.log("Database Connected");
    })
    .catch(() => {
        console.log("Database Failed");
    });

app.use(express.static(path.join(__dirname, "./public")));

app.get("/cars", async (_, res) => {
    try {
        const data = await cars.find();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

app.post("/cars/create", async (req, res) => {
    try {
        const car = req.body;
        const response = await cars.create(car);
        console.log(response);
        res.json({
            status: "Created Successfully",
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Listening at ${port}...`);
});
