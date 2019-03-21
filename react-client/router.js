import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Form from "./routes/form.js";
import Products from "./routes/products";
import Product from "./routes/product";
import Bar from "./routes/components/bar";

class ClientRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: { bool: false, }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="home-container">
                    <Bar />
                    <Route exact path="/" component={Form} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/products/:id" component={Product} />
                    <div id="overlay" />
                </div>
            </BrowserRouter>
        )
    }
}

export default ClientRouter;