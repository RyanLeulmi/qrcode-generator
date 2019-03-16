import express from 'express';
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Route, Switch } from "react-router-dom";
import multer from "multer";
import BodyParser from "body-parser";
import React, { Fragment } from "react";
import Form from "../react-client/routes/form";
import Inventory from "../react-client/routes/inventory";
import Bar from "../react-client/routes/components/bar";
import mysql from "mysql";
import { renderToNodeStream } from 'react-dom/server'
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components'



// multer file storage config

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10 mb max
    },
    fileFilter: fileFilter
});

// mysql config

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dexkerfa1997",
    database: "qrcode_app"
});

db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("MySQL database connected");
});




const port = 3000
const app = express()

app.use(express.static("build/"))
app.use("/uploads", express.static("uploads/"))
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

let ServerRouter = (url, sheet) => {
    return sheet.collectStyles(
        <StaticRouter location={url}>
            <div className="home-container">
                <Bar />
                <Route exact path="/" component={Form} />
                <Route exact path="/inventory" component={Inventory} />
            </div>
        </StaticRouter>
    )
}

let renderPage = (html, css) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        ${css}
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.2/mapbox-gl-geocoder.css' type='text/css' />
        <link rel="stylesheet" type="text/css" href="home.css">
        <title>React-SSR</title>
    </head>
    <body id="app">
        ${html}
    </body>
    <script defer src="clientBundle.js"></script>
    <script defer src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
    <script defer src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.2/mapbox-gl-geocoder.min.js'></script>
    </html>
`;


// get all the products

app.get("/products", (req, res) => {
    // Select + Inner Join query
    let getProducts = `SELECT products.business AS business_address,products.name AS product_name,products.description AS product_description,products.image AS product_image,businesses.name AS business_name,businesses.description AS business_description, businesses.image as business_image , businesses.ownersImage as owners_image from products JOIN businesses ON products.business=businesses.address`;

    // SQL SELECT + TABLE JOIN 4th
    db.query(getProducts, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log(rows);
            res.json(rows)
        }
    })

})

// post a new product
app.post('/product', upload.array("product-input"), (req, res) => {
    // console.log(req.files);
    // console.log(req.body);
    // Destructuring ///
    let { businessDesc, businessName, businessWeb, address } = req.body;
    let { productName, productDesc } = req.body;
    let { neighborhood, postcode, city, province, longitude, latitude } = req.body;
    // Destructuring ///

    // Data that will be inserted into mysql tables
    // Data ==> businesses TABLE
    let businessData = {
        name: businessName,
        address: address,
        description: businessDesc,
        website: businessWeb,
        image: "/" + req.files[1].path,
        ownersImage: "/" + req.files[2].path
    }
    // Data ==> addresses TABLE
    let addressData = {
        neighborhood,
        postcode,
        city,
        province,
        longitude,
        latitude,
        business: address // foreign key
    }
    // Data ==> products TABLE
    let productData = {
        name: productName,
        description: productDesc,
        image: "/" + req.files[0].path,
        business: address // foreign key
    }
    // SQL queries
    let businessesQuery = `INSERT INTO businesses SET ?`;
    let addressesQuery = `INSERT INTO addresses SET ?`;
    let productsQuery = `INSERT INTO products SET ?`;

    // SQL INSERT INTO businesses 1st query
    db.query(businessesQuery, businessData, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // SQL INSERT INTO addresses 2nd query
        db.query(addressesQuery, addressData, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            // SQL INSERT INTO products 3rd
            db.query(productsQuery, productData, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }


            })
        })
    })
})

app.get('*', (req, res) => {
    // Interleave the HTML stream with <style> tags
    let sheet = new ServerStyleSheet();
    let html = renderToString(ServerRouter(req.url, sheet));
    let css = sheet.getStyleTags();
    let page = renderPage(html, css);
    console.log("Rendering to string");
    res.send(page);
})



app.listen(port, () => console.log(`express server listening on port ${port}!`))