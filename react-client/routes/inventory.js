import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";


let Products = styled.div`
    width:100%;
    flex:1;
    display:grid;
    grid-template-columns: repeat(3,300px);
    grid-auto-rows:325px;
    grid-gap:50px;
    justify-content:center;
    padding:25px;
`;

let ProductContainer = styled.div`
    display:flex;
    flex-direction:column;
    background:rgba(255,255,255,.5);
`;

let ImgContainer = styled.div`
    flex:1;
    background-image:url(${props => props.img});
    background-position:center;
    background-size:cover;
    position:relative;
`;

let ImgGradient = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-image:linear-gradient(#51BAD9,white);
`;


let Product = (props) => (
    <ProductContainer>
        <ImgContainer img={props.img}>

        </ImgContainer>
    </ProductContainer>
);


class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        Axios.get("http://localhost:3000/products")
            .then(products => this.setState({ products }))
            .catch(err => console.log(err))
    }
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