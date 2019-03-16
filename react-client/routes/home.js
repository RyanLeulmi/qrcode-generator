import QRCode from "qrcode.react";
import React, { Component, Fragment } from "react";
import Map from "./components/map";
import Axios from "axios";
import { FaBoxOpen, FaBuilding, FaFileInvoice, FaFileAlt } from "react-icons/fa";



const ProductImg = (props) => (
    <img src={props.src} id="product-img" />
)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productDesc: "",
            businessName: "",
            businessDesc: "",
            businessWeb: "",
            productImg: "island.jpg", // product image source base64
            productImgFile: null,
            farmImg: "farm.jpg", // product image source base64
            farmImgFile: null,
            ownerImg: "owner.jpg", // product image source base64
            ownerImgFile: null,
            neighborhood: "", // context[0]
            postcode: "", // context[1],
            city: "", // context[2],
            province: "",// context[3]
            address: "", // result.place_name
            formCounter: 3, // display different parts of the form based on this counter
            position: [-125.4494, 49.6506], // map  initial center point coordinates
            markerPosition: [-125.4494, 49.6506], // marker coordinates
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

    // Custome file input
    pickFile(e) {
        e.preventDefault();
        let imageInput;
        console.log(e.target.name);
        if (e.target.name === "farm-upload") {
            imageInput = document.querySelector("#farm-img-input");
            imageInput.click();
        } else if (e.target.name === "owner-upload") {
            imageInput = document.querySelector("#owner-img-input");
            imageInput.click();
        }
        else {
            imageInput = document.querySelector("#prod-img-input");
            imageInput.click();
        }

    }


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
        formData.append("productDesc", this.state.productDesc);
        formData.append("businessName", this.state.businessName);
        formData.append("businessDesc", this.state.businessDesc);
        formData.append("businessWeb", this.state.businessWeb);
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
        let form;
        if (formCounter === 2) {
            form = (
                <Fragment>
                    <h2 className="white">Product<span className="blue"> Image</span></h2>
                    <ProductImg src={productImg} />
                    <input type="file" id="prod-img-input"
                        onChange={this.displayImg.bind(this)}
                        hidden="hidden"
                        name="product-input"
                        multiple
                    />
                    {productImgFile != null &&
                        <label style={{ color: "#51BAD9", fontFamily: "Raleway", fontWeight: "bold" }}>
                            {productImgFile.name}
                        </label>}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <button className="upload-btn" name="product-upload" onClick={this.pickFile.bind(this)}
                            style={{ background: "transparent", color: "#51BAD9" }}
                        >
                            UPLOAD
                        </button>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button
                                style={{ margin: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                                className="upload-btn"
                                onClick={() => {
                                    if (!productImgFile) {
                                        let img = document.getElementById("product-img");
                                        img.style.border = "2px solid red";
                                    } else {
                                        this.move(3);
                                    }
                                }}
                            >
                                NEXT
                        </button>
                            <img id="return-img" src="return.svg" onClick={this.move.bind(this, 1)}></img>
                        </div >
                    </div>
                </Fragment>
            )
        } else if (formCounter === 3) {
        } else if (formCounter === 4) {
            form = (
                <Fragment>
                    <h2 className="white">Business<span style={{ color: "#65B585" }}> Image</span></h2>
                    <img id="farm-img" src={this.state.farmImg} />
                    <input type="file" id="farm-img-input"
                        onChange={this.displayImg.bind(this)}
                        hidden="hidden"
                        name="farm-input"
                    />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <button className="upload-btn" name="farm-upload" onClick={this.pickFile.bind(this)}
                            style={{ background: "transparent", color: "#51BAD9" }}
                        >
                            UPLOAD
                        </button>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button
                                style={{ margin: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                                className="upload-btn"
                                onClick={() => {
                                    if (this.state.farmImgFile !== null) {
                                        this.move(5);
                                    } else {
                                        let img = document.querySelector("#farm-img");
                                        img.style.border = "2px solid red";
                                    }
                                }}
                            >
                                NEXT
                        </button>
                            <img id="return-img" src="return.svg" onClick={this.move.bind(this, 3)}></img>
                        </div >
                    </div>
                </Fragment >
            )

        } else if (formCounter === 5) {
            form = (
                <Fragment>
                    <h2 className="white">Business<span style={{ color: "#65B585" }}> Owners</span></h2>
                    <img id="farm-img" src={this.state.ownerImg} />
                    <input type="file" id="owner-img-input"
                        onChange={this.displayImg.bind(this)}
                        hidden="hidden"
                        name="owner-input"
                    />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <button className="upload-btn" name="owner-upload" onClick={this.pickFile.bind(this)}
                            style={{ background: "transparent", color: "#51BAD9" }}
                        >
                            UPLOAD
                        </button>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button
                                style={{ margin: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                                className="upload-btn"
                                onClick={this.submitForm.bind(this)}
                            >
                                SUBMIT
                        </button>
                            <img id="return-img" src="return.svg" onClick={this.move.bind(this, 4)}></img>
                        </div >
                    </div>
                </Fragment >
            )

        }

        else {
            form = (
                <Fragment>
                    <h2 className="white">Quick Response Code <span className="blue">Generator</span></h2>
                    <input className="text-input" type="text"
                        placeholder="Product Name"
                        value={this.state.productName}
                        onChange={this.onChange.bind(this)}
                        name="productName"
                    />

                    <textarea className="text-area"
                        placeholder="Product Description"
                        value={this.state.productDesc}
                        onChange={this.onChange.bind(this)}
                        name="productDesc"
                    />
                    <input className="text-input" type="text"
                        placeholder="Business Name"
                        value={this.state.businessName}
                        onChange={this.onChange.bind(this)}
                        name="businessName"
                    />
                    <input className="text-input" type="text"
                        placeholder="Business Website"
                        value={this.state.businessWeb}
                        onChange={this.onChange.bind(this)}
                        name="businessWeb"
                    />
                    <textarea className="text-area"
                        placeholder="Business Description"
                        value={this.state.businessDesc}
                        onChange={this.onChange.bind(this)}
                        name="businessDesc"
                    />
                    <button className="upload-btn" style={{ width: "280px" }} onClick={() => {
                        let { productName, productDesc, businessDesc, businessName, businessWeb } = this.state;
                        if (productName === "") {
                            let input = document.querySelector(".text-input[name=productName]");
                            input.style.border = "2px solid red";
                            input.setAttribute("placeholder", "Product name is required");
                        } else {
                            let input = document.querySelector(".text-input[name=productName]");
                            input.style.border = "1px solid #51BAD9";
                        }
                        if (productDesc === "") {
                            let input = document.querySelector(".text-area[name=productDesc]");
                            input.style.border = "2px solid red";
                            input.setAttribute("placeholder", "Product description is required");
                        } else {
                            let input = document.querySelector(".text-area[name=productDesc]");
                            input.style.border = "1px solid #51BAD9";
                        }
                        if (businessWeb === "") {
                            let input = document.querySelector(".text-input[name=businessWeb]");
                            input.style.border = "2px solid red";
                            input.setAttribute("placeholder", "Product website is required");
                        } else {
                            let input = document.querySelector(".text-area[name=productDesc]");
                            input.style.border = "1px solid #51BAD9";
                        }

                        if (businessName === "") {
                            let input = document.querySelector(".text-input[name=businessName]");
                            input.style.border = "2px solid red";
                            input.setAttribute("placeholder", "Business name is required");
                        } else {
                            let input = document.querySelector(".text-input[name=businessName]");
                            input.style.border = "1px solid #51BAD9";
                        }
                        if (businessDesc === "") {
                            let input = document.querySelector(".text-area[name=businessDesc]");
                            input.style.border = "2px solid red";
                            input.setAttribute("placeholder", "Business description is required");
                        } else {
                            let input = document.querySelector(".text-area[name=businessDesc]");
                            input.style.border = "1px solid #51BAD9";
                        }
                        if (productDesc !== "" && productName !== "" && businessName !== ""
                            && businessDesc !== "") {
                            this.move(2);
                        }
                    }}>NEXT</button>
                </Fragment>
            )
        }


        return (
            <Fragment>
                {form}
            </Fragment>
        );


    }
}


export default Home;