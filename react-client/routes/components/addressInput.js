import React from "react";

class AddressInput extends React.Component {

    componentDidMount() {
        let input = document.getElementById("address-input");

    }

    render() {
        return (
            <input type="text" id="address-input" />
        )
    }
}
export default AddressInput;