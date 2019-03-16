import styled from "styled-components";
import Axios from "axios";
import Map from "./components/map";
import React from "react";
// props=(w,h,s,bg,c,b)
let Btn = styled.button`
    font-family:Raleway;
    text-transform: uppercase;
    font-weight: 800;
    border-radius:5px;
    padding:5px;
    margin:10px;
    min-width:${props => props.w};
    min-height:${props => props.h};
    font-size:${props => props.s};
    background: ${props => props.bg};
    color:${props => props.c};
    cursor: pointer;
    border:1px solid ${props => props.b};
	box-shadow: 0 0 8px ${props => props.c};
    user-select: none;
`;

let Return = styled.img`
    border:1px solid #51BAD9;
    padding:10px;
    width:50px;
    height:50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
`;

let ReturnBtnContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;


let ReturnBtn = (props) => (
    <ReturnBtnContainer>
        <Btn onClick={() => {
            if (props.counter === 3) {
                if (props.productImg === "island.jpg") {
                    let img = document.querySelector("img[name=product-img]");
                    img.style.border = "2px solid red";
                    console.log(props.productImg, img);
                } else {
                    let img = document.querySelector("img[name=product-img]");
                    img.style.border = "1px solid #51BAD9";
                    props.move(props.counter + 1);
                }
            }
            else if (props.counter === 4) {
                if (props.farmImg === "farm.jpg") {
                    let img = document.querySelector("img[name=farm-img]");
                    img.style.border = "2px solid red";
                } else {
                    let img = document.querySelector("img[name=farm-img]");
                    img.style.border = "1px solid #51BAD9";
                    props.move(props.counter + 1);
                }
            } else {
                if (props.ownerImg === "owner.jpg") {
                    let img = document.querySelector("img[name=owners-img]");
                    img.style.border = "2px solid red";
                } else {
                    props.submitForm();
                }
            }
        }}

            w="250px" h="50px" s="14px"
            bg="#51BAD9" b="#51BAD9" c="white" style={{ margin: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        >
            NEXT
        </Btn>
        <Return src="return.svg" onClick={() => {
            props.move(props.counter - 1)
        }} />
    </ReturnBtnContainer>
);


let Avatar = styled.img`
    width: ${props => props.w};
    height: ${props => props.h};
    border-radius: ${props => props.r};
    box-shadow: 0 0 8px rgba(87, 216, 255, 0.8);
    object-fit: fill;
    margin:10px;
`;
let Input = styled.input`
    position:relative;
    font-family: Raleway;
    font-size:14px;
    font-weight: 600;
    width:${props => props.w};
    min-height:${props => props.h};
    padding:5px;
    border-radius:3px;
    border:1px solid #51BAD9;
    margin:5px;
	box-shadow: 0 0 8px rgba(87, 216, 255, 0.8);
    &::placeholder{
        text-transform:capitalize;
    }

    &::before{
        content:"\f1ad";
        font-family: FontAwesome;
        font-size:15px;
        width:50px;
        background:green;
        z-index:5500;
    }
`;

let TextArea = styled.textarea`
    font-family: Raleway;
    font-size:14px;
    font-weight: 600;
    width:${props => props.w};
    min-height:${props => props.h};
    padding:5px;
    border-radius:3px;
    border:1px solid #51BAD9;
    &::placeholder{
        text-transform:capitalize;
    }   
    margin:5px;
`;

let MainHeader = styled.h1`
    color:white;
    font-weight: bolder;
    font-family: Raleway;
    font-size: 20px;
    width:300px;
    text-align: center;
    line-height: 25px;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin:5px;
`;


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productDescription: "",
            businessName: "",
            businessDescription: "",
            businessWebsite: "",
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
            formCounter: 1, // display different parts of the form based on this counter
            position: [-125.4494, 49.6506], // map  initial center point coordinates
            markerPosition: [-125.4494, 49.6506], // marker coordinates
        }

    }

    isTextArea(key) {
        let strings = key.split(/(?=[A-Z])/)
        console.log("checking")
        if (strings[1] === "Description") return true;
        else return false;
    }

    moveToTwo() {
        let { productName, productDescription, businessDescription, businessName, businessWebsite } = this.state;
        console.log(productName);
        let testInput = document.querySelector("input[name=productName]");
        console.log(testInput);
        if (productName === "") {
            let input = document.querySelector("input[name=productName]");
            input.style.border = "2px solid red";
            input.setAttribute("placeholder", "Product name is required");
        } else {
            let input = document.querySelector("input[name=productName]");
            input.style.border = "1px solid #51BAD9";
        }
        if (productDescription === "") {
            let input = document.querySelector("textarea[name=productDescription]");
            input.style.border = "2px solid red";
            input.setAttribute("placeholder", "Product description is required");
        } else {
            let input = document.querySelector("textarea[name=productDescription]");
            input.style.border = "1px solid #51BAD9";
        }
        if (businessWebsite === "") {
            let input = document.querySelector("input[name=businessWebsite]");
            input.style.border = "2px solid red";
            input.setAttribute("placeholder", "Product website is required");
        } else {
            let input = document.querySelector("textarea[name=productDescription]");
            input.style.border = "1px solid #51BAD9";
        }

        if (businessName === "") {
            let input = document.querySelector("input[name=businessName]");
            input.style.border = "2px solid red";
            input.setAttribute("placeholder", "Business name is required");
        } else {
            let input = document.querySelector("input[name=businessName]");
            input.style.border = "1px solid #51BAD9";
        }
        if (businessDescription === "") {
            let input = document.querySelector("textarea[name=businessDescription]");
            input.style.border = "2px solid red";
            input.setAttribute("placeholder", "Business description is required");
        } else {
            let input = document.querySelector("textarea[name=businessDescription]");
            input.style.border = "1px solid #51BAD9";
        }
        if (productDescription !== "" && productName !== "" && businessName !== ""
            && businessDescription !== "") {
            this.move(2);
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



    pickFile(e) {
        e.preventDefault();
        let imageInput = document.querySelector("input[name=product-input]");
        console.log(imageInput);
        console.log("clicked");
        imageInput.click();
    }
    displayImg(e) {
        e.preventDefault();
        console.log(e.target.files[0]);
        let reader = new FileReader();
        let imageInput = document.querySelector("input[name=product-input]");
        let { formCounter } = this.state;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log("reader is ready");
            if (formCounter === 3) {
                this.setState({ productImg: reader.result, productImgFile: imageInput.files[0] })
            } else if (formCounter === 4) {
                this.setState({ farmImg: reader.result, farmImgFile: imageInput.files[0] })
            }
            else {
                this.setState({ ownerImg: reader.result, ownerImgFile: imageInput.files[0] })
            }
        }
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
        let { formCounter, businessName, businessDescription, businessWebsite, productDescription, productName } = this.state;
        let inputs = { productName, productDescription, businessName, businessDescription, businessWebsite };
        let form, btns;
        if (formCounter === 1) {
            form = Object.keys(inputs).map((key, i) => {
                let isTextArea = this.isTextArea(key);
                let placeholder = key.split(/(?=[A-Z])/).join(" ");
                if (isTextArea) {
                    return <TextArea placeholder={placeholder}
                        value={inputs.key}
                        name={key} key={i}
                        onChange={this.onChange.bind(this)}
                        w="300px" h="70px"
                        onFocus={() => {
                            let textarea = document.querySelector(`textarea[name=${key}]`);
                            textarea.scrollIntoView();
                        }}
                    />
                } else {
                    return <Input placeholder={placeholder}
                        value={inputs.key}
                        name={key} key={i}
                        onChange={this.onChange.bind(this)}
                        w="300px" h="50px"
                        onFocus={() => {
                            let textarea = document.querySelector(`input[name=${key}]`);
                            textarea.scrollIntoView();
                        }}
                    />
                }
            })
            btns = <Btn onClick={this.moveToTwo.bind(this)}
                w="300px" h="50px" s="14px"
                bg="#51BAD9" b="white" c="white"
            >
                NEXT
            </Btn>
        } else if (formCounter === 2) {
            form = <Map
                back={this.move.bind(this, 1)}
                next={this.move.bind(this, 3)}
                center={this.state.position}
                markerPosition={this.state.markerPosition}
                moveMarker={this.moveMarker.bind(this)}
            />
        } else {
            let word;
            switch (formCounter) {
                case 3:
                    word = "product"
                    break;
                case 4:
                    word = "business"
                    break;
                case 5:
                    word = "owners"
                    break;
            }
            form = (
                <React.Fragment>
                    <MainHeader>
                        {word} <i className="blue">IMAGE</i>
                    </MainHeader>
                    <Avatar w="285px" h="285px" r="142.5px"
                        src={formCounter === 3 ? this.state.productImg : formCounter === 4 ?
                            this.state.farmImg : this.state.ownerImg
                        }
                        name={formCounter === 3 ? "product-img" : formCounter === 4 ? "farm-img" : "owners-img"}
                    />
                    <input
                        type="file" multiple
                        onChange={this.displayImg.bind(this)}
                        hidden="hidden" name="product-input"
                    />
                    <Btn onClick={this.pickFile.bind(this)}
                        w="300px" h="50px" s="14px"
                        bg="transparent" b="#51BAD9" c="#51BAD9"
                    >UPLOAD</Btn>
                    <ReturnBtn
                        move={this.move.bind(this)}
                        counter={formCounter}
                        productImg={this.state.productImg}
                        farmImg={this.state.farmImg}
                        ownerImg={this.state.ownerImg}
                        submitForm={this.submitForm.bind(this)}
                    />
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div id="overlay" />
                {this.state.formCounter === 1 &&
                    <MainHeader>
                        Quick Response Code <i className="blue">Generator</i>
                    </MainHeader>
                }
                {form}
                {btns}
            </React.Fragment>
        )
    }
}