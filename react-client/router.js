import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Fragment, Component } from "react";
import Form from "./routes/form.js";
import Inventory from "./routes/inventory";
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
                    <Route exact path="/inventory" component={Inventory} />
                </div>
            </BrowserRouter>
        )
    }
}

export default ClientRouter;