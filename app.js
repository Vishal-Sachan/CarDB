const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const path = require("path");
const app = express();
const port = process.env.PORT || 5500;
const cars = require("./models/cars");

app.use(bodyParser.json());
app.use(express.urlencoded())
app.use(express.json())

mongoose
    .connect("mongodb://localhost:27017/Automobiles", {})
    .then(() => {
        console.log("Database Connected");
    })
    .catch(() => {
        console.log("Database Failed");
    });

// app.use(cors({
//     origin: '*'
// }))

app.use(express.static(path.join(__dirname, "./public")));
app.get('/car', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));

})

app.get("/cars", async (_, res) => {
    try {
        const data = await cars.find();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/cars/:id", async (req, res) => {
    try {
        var idToFind = req.params.id
        const data = await cars.findById(idToFind);
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

app.post("/create", async (req, res) => {
    try {
        const car = req.body;
        const response = await cars.create(car);
        console.log(response);
        console.log(req.body)
        res.redirect('http://localhost:5500/')

        //res.sendFile(path.join(__dirname, "./public/index.html"));
    } catch (err) {
        console.log(err);
    }
});

app.post("/update", async (req, res) => {
    try {
        console.log(req.body)
        const car = req.body;
        const response = await cars.updateOne({ number: car.number }, { $set: { ...car } })
        console.log(response)
        res.redirect('http://localhost:5500/')

    } catch (e) {
        console.log(e)
    }
})

app.post("/delete", async (req, res) => {
    try {
        //console.log(req.body)
        const car = req.body;
        const response = await cars.deleteOne({ _id: car._id })
        console.log(response)
        res.redirect('http://localhost:5500/')

    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Listening at ${port}...`);
});
