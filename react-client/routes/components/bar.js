import React, { Component } from "react";
import { withRouter } from "react-router";


const Logo = () => (
    <div id="logo">
        <img src="logo.png" id="logo-img" />
        <h1 id="logo-word">
            <span className="blue">VANCOUVER</span>
            <span className="blue">ISLAND</span>
            <span className="green">ECONOMIC</span>
            <span className="green">ALLIANCE</span>
        </h1>

    </div >
);
const BarBtn = (props) => {
    let style = props.location.pathname === props.url ?
        {
            background: "#51BAD9",
            border: "1px solid black"
        } : {
            background: "transparent",
            border: "1px solid #51BAD9"
        };
    return (
        <div id="bar-btn"
            onClick={() => props.history.push(props.url)}
            style={style}
        >
            <img src={props.src} id="bar-btn-img" />
        </div>
    )
}
const BarLink = (props) => {
    let style = props.pathname === props.url ?
        {
            color: "#51BAD9",
            fontSize: "30px",
            fontWeight: "bolder"
        } : {
            color: "#65B585"
        };
    return (
        <div className="bar-link"
            onClick={() => props.history.push(props.url)}
            style={style}
        >
            <label id="link-text">{props.text}</label>
        </div>
    )
}

const Bar = (props) => (
    <div id="home-bar">
        <Logo onClick={() => console.log("Clicked the logo")} />
        <div id="links-container">
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
            <BarLink
                pathname={props.location.pathname}
                history={props.history}
                url="/inventory"
                text="INVENTORY"
            />
            <BarLink
                pathname={props.location.pathname}
                history={props.history}
                url="/"
                text="GENERATOR"
            />
        </div>

    </div>
);
export default withRouter(Bar);