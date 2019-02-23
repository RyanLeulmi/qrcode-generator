import express from 'express';
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Route, Switch } from "react-router-dom";
import React, { Fragment } from "react";
import Home from "../react-client/routes/home";
import Inventory from "../react-client/routes/inventory";
import Bar from "../react-client/routes/components/bar";


const port = 3000
const app = express()
app.use(express.static("build/"))

let ServerRouter = (url) => (
    <StaticRouter location={url}>
        <div className="home-container">
            <Bar />
            <Route exact path="/" component={Home} />
            <Route exact path="/inventory" component={Inventory} />
        </div>
    </StaticRouter>
)

let renderPage = (html) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="home.css">
        <title>React-SSR</title>
    </head>
    <body id="app">
        ${html}
    </body>
    <script defer src="clientBundle.js"></script>
    </html>
`;


app.get('*', (req, res) => {
    let stringified = renderToString(ServerRouter(req.url));
    let page = renderPage(stringified);
    res.send(page);
})

app.listen(port, () => console.log(`express server listening on port ${port}!`))