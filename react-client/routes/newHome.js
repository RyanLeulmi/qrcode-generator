import QRCode from "qrcode.react";
import React, { Component, Fragment } from "react";
import Axios from "axios";
import { FaBoxOpen, FaBuilding, FaFileInvoice, FaFileAlt } from "react-icons/fa";
import Form from "./form";


const ProductImg = (props) => (
    <img src={props.src} id="product-img" />
)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount() {
        console.log("innerWidth", window.innerWidth);
        console.log("innerHeight:", window.innerHeight);
        let { formCounter } = this.state;
        let container = document.querySelector(".home-container");

        if (/(android)/i.test(navigator.userAgent)) {

        }
    }

    displayImg(e) {
        e.preventDefault();
        console.log(e.target.files[0]);
        let inputName = e.target.name;
        let reader = new FileReader();
        let imageInput;
        if (inputName === "farm-input") {
            imageInput = document.querySelector("#farm-img-input");
            reader.readAsDataURL(e.target.files[0]);
        } else if (inputName === "owner-input") {
            imageInput = document.querySelector("#owner-img-input");
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            imageInput = document.querySelector("#prod-img-input");
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = () => {
            console.log("reader is ready");
            if (inputName === "product-input") {
                this.setState({ productImg: reader.result, productImgFile: imageInput.files[0] })
            } else if (inputName === "owner-input") {
                this.setState({ ownerImg: reader.result, ownerImgFile: imageInput.files[0] })
            }
            else {
                this.setState({ farmImg: reader.result, farmImgFile: imageInput.files[0] })
            }
        }
    }
    // Center the map based on the supplied address by the google places api


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    move(stage) {
        this.setState({ formCounter: stage })
        console.log("Called move");
    }

    moveMarker(lnglat, neighborhood,
        postcode, city,
        province, address) {
        this.setState({
            markerPosition: lnglat,
            neighborhood,
            postcode, address,
            province, city
        })
    }

    submitForm() {
        let formData = new FormData();
        formData.append("product-input", this.state.productImgFile);
        formData.append("product-input", this.state.farmImgFile);
        formData.append("product-input", this.state.ownerImgFile);
        formData.append("productName", this.state.productName);
        formData.append("productDescription", this.state.productDescription);
        formData.append("businessName", this.state.businessName);
        formData.append("businessDescription", this.state.businessDescription);
        formData.append("businessWebsite", this.state.businessWebsite);
        formData.append("neighborhood", this.state.neighborhood);
        formData.append("postcode", this.state.postcode);
        formData.append("city", this.state.city);
        formData.append("province", this.state.province);
        formData.append("longitude", this.state.markerPosition[0]);
        formData.append("latitude", this.state.markerPosition[1]);
        formData.append("address", this.state.address);

        Axios.post('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }
    render() {
        let { productImg, formCounter, productImgFile, farmImgFile } = this.state;
        let { productName, productDescription, businessName, businessDescription, businessWebsite } = this.state;
        let form;
        return (
            <Fragment>
                <Form
                    inputs={{
                        productName, productDescription,
                        businessName, businessDescription,
                        businessWebsite
                    }}
                    onChange={this.onChange.bind(this)}
                    counter={this.state.formCounter}
                    formTwo={this.move.bind(this, 2)}
                    formOne={this.move.bind(this, 1)}
                    formThree={this.move.bind(this, 3)}
                    markerPosition={this.state.markerPosition}
                    moveMarker={this.moveMarker.bind(this)}
                    center={this.state.position}
                />
            </Fragment>
        );


    }
}


export default Home;