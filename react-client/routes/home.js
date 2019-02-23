import QRCode from "qrcode.react";
import React, { Component, Fragment } from "react";

const ProductImg = (props) => (
    <img src={props.src} id="product-img" />
)

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productImg: "product.png"
        }
    }

    getProductImage(e) {
        e.preventDefault();
        let imageInput = document.querySelector("#prod-img-input");
        let reader = new FileReader();
        reader.readAsDataURL(imageInput.files[0]);
        console.log(imageInput.files[0]);
        reader.onload = () => {
            console.log("reader is ready");
            this.setState({ productImg: reader.result })
        }

    }

    click(e) {
        e.preventDefault();
        let imageInput = document.querySelector("#prod-img-input");
        imageInput.click();
    }
    render() {
        let { productImg } = this.state;
        return (<Fragment>
            <h2 className="white">Quick Response Code Generator</h2>
            <ProductImg src={productImg} />
            <input type="file" id="prod-img-input"
                onChange={this.getProductImage.bind(this)}
                hidden="hidden"
            />
            <button onClick={this.click} id="upload-btn">Upload Product Image</button>
            <button id="upload-btn" style={{ background: "transparent", color: "#5BB9E4" }}>
                Next
            </button>
            {/* <QRCode value="kerfat ma7goobadsadsadsadsada21dsADSADSADSADSADSADSADSADSAda"
                renderAs="svg"
                size={250} /> */}
        </Fragment>
        )



    }
}


export default Home;