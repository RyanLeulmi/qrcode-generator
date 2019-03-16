import React, { Component } from "react";
import styled from "styled-components";


let Products = styled.div`
    width:100%;
    flex:1;
    display:grid;
    grid-template-columns: repeat(3,250px);
    grid-auto-rows:300px;
    grid-gap:50px;
    justify-content:center;
    padding:25px;
`;

let Product = styled.div`
    display:flex;
    flex-direction:column;
    background:rgba(255,255,255,.5);
`;


class Inventory extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="overlay" />
                <Products>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                </Products>
            </React.Fragment>

        )
    }
}


export default Inventory;