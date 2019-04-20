import React, { Component } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { FiMapPin, FiArrowLeft, FiArrowRight, FiLink } from "react-icons/fi";
import Axios from "axios";

let SliderContainer = styled.div`
    width:100%;
    height:300px;
    position:relative;
    background-image:url(${props => props.img});
    background-position:center;
    background-size:cover;
`;

let Gradient = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-image:linear-gradient(#5BB9E4,gray);
    opacity:0.5;
`;

let ArrowRight = styled(FiArrowRight)`
    position:absolute;
    right:5px;
    top:50%;
    transform:translateY(-50%);
    width:30px;
    height:30px;
    cursor:pointer;
    color:white;
    &:active{
        color:#5BB9E4;
    }
`;

let ArrowLeft = styled(FiArrowLeft)`
    position:absolute;
    color:white;
    cursor:pointer;
    width:30px;
    height:30px;
    left:5px;
    top:50%;
    transform:translateY(-50%);
    &:active{
        color:#5BB9E4;
    }
`;

let Link = styled(FiLink)`
    color:gray;
    min-width:25px;
    min-height:25px;
    cursor:pointer;
    margin:5px;
    margin-left:auto;
`
let Pin = styled(FiMapPin)`
    color:gray;
    min-width:25px;
    min-height:25px;
    cursor:pointer;
    margin-right:8px;
`;
let ProductContainer = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:100%;
    min-height:100%;
    @media(min-width:800px){
        width:700px;
        right:-50%;
        transform:translateX(-50%);
    }
`;

let Code = styled(QRCode)`
    position:absolute;
    top:50%;
    left:50%;
    width:185px;
    height:185px;
    transform:translate(-50%,-55%);
`;


let Slider = (props) => {
    if (props.index !== props.imgs.length - 1) {
        return (<SliderContainer img={props.imgs[props.index]}>
            <Gradient />
            <ArrowLeft onClick={props.prev} />
            <ArrowRight onClick={props.next} />
            <Ind imgs={props.imgs} index={props.index} />
        </SliderContainer>)

    } else {
        return (
            <div style={{ width: "100%", height: "300px", position: "relative" }}>
                <Gradient />
                <ArrowLeft onClick={props.prev} />
                <ArrowRight onClick={props.next} />
                <Ind imgs={props.imgs} index={props.index} />
                <Code value={props.url}
                    renderAs="svg" />
                >
            </div>
        )
    }
}

let Indicator = styled.div`
    height:50px;
    display:flex;
    justify-content:center;
    align-items:ceneter;
    position:absolute;
    bottom:5px;
    left:50%;
    transform:translateX(-50%);
`;

let Circle = styled.div`
    width:15px;
    height:15px;
    margin:2.5px;
    border-radius:15px;
    background:${props => props.i === props.n ? "#5BB9E4" : "transparent"};
    border:1px solid white;
`;

let Ind = (props) => (
    <Indicator>
        {props.imgs.map((img, i) => {
            return <Circle n={i} i={props.index} />
        })}
    </Indicator>
)

let Data = styled.div`
    position:relative;
    font-family:Alegreya;
    line-height:18px;
    width:100%;
    display:flex;
    flex-direction:column;
    background:rgba(255,255,255,.65);
    flex:1;
    padding:10px 10px 10px 10px;
`;


let Header = styled.h1`
    color:white;
    text-transform:uppercase;
    font-size:22px;
    line-height:22px;
    justify-content:space-between;
    font-family:Eczar;
`;

let Para = styled.p`
    color:black;
    font-size:18px;
    margin-top:10px;
    margin-bottom:10px;
`;

let Address = styled.p`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-size:14px;
    color:white;
    width:100%;
    position:absolute;
    bottom:0;
    padding:10px;
`;

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productDesc: "",
            businessName: "",
            businessDesc: "",
            address: "",
            imgs: [],
            imgIndex: 0,
        }
    }

    next() {
        if (this.state.imgIndex === this.state.imgs.length - 1) {
            this.setState({ imgIndex: 0 })
        } else {
            this.setState((state) => {
                return { imgIndex: state.imgIndex + 1 }
            })
        }
    }
    prev() {
        if (this.state.imgIndex === 0) {
            this.setState((state) => {
                return { imgIndex: state.imgs.length - 1 }
            })
        } else {
            this.setState((state) => {
                return { imgIndex: state.imgIndex - 1 }
            })
        }
    }
    componentDidMount() {
        let { id } = this.props.match.params;
        Axios.get(`http://192.168.1.138:3000/prods/${id}`)
            .then(res => this.setState({
                productName: res.data[0].product_name,
                productDesc: res.data[0].product_description,
                businessName: res.data[0].business_name,
                businessDesc: res.data[0].business_description,
                address: res.data[0].business_address,
                imgs: [res.data[0].product_image, res.data[0].business_image, res.data[0].owners_image, "code"]
            }))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <ProductContainer>
                <Slider imgs={this.state.imgs}
                    next={this.next.bind(this)}
                    prev={this.prev.bind(this)}
                    index={this.state.imgIndex}
                    url={"http://192.168.1.138:3000" + this.props.match.url}
                />
                <Data>
                    <Header>{this.state.productName}</Header>
                    <Para>{this.state.productDesc}</Para>
                    <Header>{this.state.businessName}</Header>
                    <Para style={{ marginBottom: "65px" }}>{this.state.businessDesc}</Para>
                    <Address> <Pin /> {this.state.address} <Link /></Address>
                </Data>
            </ProductContainer>
        )
    }

}

export default Product;