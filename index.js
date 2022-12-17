"use strict";

const express = require("express");
const app = express();
const productRoute = require("./routes/product.route");
const {dbConnect} = require('./model/db.connection');
const bodyParser = require('body-parser')
const {conf} = require("./conf/conf");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser);
app.use(conf.url_prefix + "/product", productRoute.router);
app.use(conf.url_prefix + "/", productRoute.router);
app.use("*", function (req, res) {
    res.status(404).send({
      error: "Resource not found"
    });
});
const server = app.listen(conf.PORT, () => {
    console.log(`Server is working on http://localhost:${conf.PORT}`);
});


dbConnect();