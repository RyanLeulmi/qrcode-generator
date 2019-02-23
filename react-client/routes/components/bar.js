import React, { Component } from "react";
import { withRouter } from "react-router";


const Logo = () => (
    <div id="logo">
        <img src="logo.png" id="logo-img" />
        <h1 className="home-header">
            VIE
        <i className="blue">A</i>
        </h1>
    </div>
);
const BarBtn = (props) => (
    <div id="bar-btn"
        onClick={() => props.history.push(props.url)}
        style={{ border: props.location.pathname === props.url ? "2px solid #7c6c77" : "2px solid white" }}
    >
        <img src={props.src} id="bar-btn-img" />
    </div>
);
const Bar = (props) => (
    <div id="home-bar">
        <Logo onClick={() => console.log("Clicked the logo")} />
        <BarBtn
            src="database.svg"
            url="/inventory"
            history={props.history}
            location={props.location}
        />
        <BarBtn
            src="qrcode.svg"
            url="/"
            history={props.history}
            location={props.location}
        />
    </div>
);
export default withRouter(Bar);