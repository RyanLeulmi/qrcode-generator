import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
import { withRouter } from "react-router";


let Products = styled.div`
    width:100%;
    height:100%;
    position:relative;
    flex:1;
    display:grid;
    grid-template-columns: repeat(3,300px);
    grid-auto-rows:325px;
    grid-gap:50px;
    justify-content:center;
    padding:50px;
    @media (max-width: 1100px) {
        grid-template-columns: repeat(2,300px);
  }
    @media (max-width: 750px) {
        grid-template-columns: 1fr;
  }

    @media (max-width: 500px) {
        grid-gap:0px;
        padding:0px;
  }


`;

let ProductContainer = styled.div`
    background:rgba(255,255,255,.5);
    display:flex;
    flex-direction:column;
    box-shadow: 0 0 8px rgba(87, 216, 255, 0.8);
    cursor:pointer;
    @media (min-width: 1000px) {
    &:hover{
        transform: scale(1.1);
        & > div{
            background-position:center-top;
        }
    }
    }
 
`;

let ImgContainer = styled.div`
    background-image:url(${props => props.img});
    background-position:center;
    background-size:cover;
    position:relative;
    width:100%;
    height:60%;
`;

let ImgGradient = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-image:linear-gradient(#51BAD9,black);
    opacity:0.5;
`;

let ProductDesc = styled.p`
    padding:10px;
    font-weight:500;
    font-size:16px;
    width:100%;
    height:40%;
    line-height:15px;
    font-family:Roboto;
`;

let ProductName = styled.h1`
    color:white;
    position:absolute;
    font-family:Raleway;
    font-weight:500;
    font-size:20px;
    text-align:center;
    text-transform:uppercase;
    margin:15px;
`;

let Product = (props) => (
    <ProductContainer onClick={() => {
        props.history.push(`/products/${props.id}`);
    }}>
        <ImgContainer img={props.img}>
            <ImgGradient />
            <ProductName>
                {props.name}
            </ProductName>
        </ImgContainer>
        <ProductDesc>
            {props.description}
        </ProductDesc>
    </ProductContainer>
);


class ProductsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        console.log("Mounted Inventory");
        Axios.get("http://192.168.0.168:3000/prods")
            .then(res => {
                this.setState({ products: res.data });
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }
    render() {
        let { products } = this.state;
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Products>
                    {products.length !== 0 && products.map((prod, i) => {
                        return <Product
                            history={this.props.history}
                            id={prod.product_id}
                            img={prod.product_image}
                            name={prod.product_name}
                            description={prod.product_description}
                        />
                    })}
                </Products>
            </div>

        )
    }
}


export default withRouter(ProductsGrid);