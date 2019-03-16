import React from "react";
import Axios from "axios";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBtns: true
        }
    }
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmFsZyIsImEiOiJjanNtZ2x6bDkwMWJtM3lwcG83cnc3YmQ3In0.Dee88tK7P9oLIXFe7uKU0A';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: this.props.center,
            zoom: 6.5
        });
        let geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
        })
        map.addControl(geocoder);
        geocoder.on("result", (data) => {
            console.log(data);
            this.props.moveMarker([data.result.geometry.coordinates[0],
            data.result.geometry.coordinates[1]],
                data.result.context[0].text, // neighborhood
                data.result.context[1].text, // postcode
                data.result.context[2].text, // city
                data.result.context[3].text, // province
                data.result.place_name, // full address
            )

            let marker = document.querySelector(".marker");
            var coordinates = document.querySelector('.coordinates');
            // coordinates.style.display = 'block';
            // coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
            if (marker) {
                marker.parentNode.removeChild(marker);
            }
            // create a HTML element for each feature
            let newMarker = document.createElement('div');
            newMarker.className = 'marker';
            // make a marker for each feature and add to the map
            let Marker = new mapboxgl.Marker(newMarker, { draggable: true })
                .setLngLat(data.result.geometry.coordinates)
                .addTo(map);
            Marker.on("dragend", () => {
                console.log("Draged");
                let lngLat = Marker.getLngLat();
                Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
                    .then(res => {
                        console.log(res.data.features);
                        this.props.moveMarker([lngLat.lng, lngLat.lat],
                            res.data.features[1].text, // neighborhood
                            res.data.features[2].text, // postcode
                            res.data.features[3].text, // city
                            res.data.features[4].text, // province
                            res.data.features[0].place_name, // full address
                        )
                    }).catch(err => console.log(err));


                coordinates.style.display = 'block';
                coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
            })
        })


        let search = document.querySelector(".mapboxgl-ctrl-top-right>div>input");
        search.setAttribute("placeholder", "Enter the address")
        console.log(search);
        // Mobile Optimization 
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            search.addEventListener("focus", () => {
                console.log("Focused Search Input");
                this.setState({ showBtns: false });
            })
            search.addEventListener("blur", () => {
                console.log("Blured Search Input");
                this.setState({ showBtns: true });
            })
        }

    }
    render() {
        let { markerPosition } = this.props;
        return (
            <React.Fragment>
                <div id="map">
                    <pre id='coordinates' className='coordinates'></pre>
                </div>
                {this.state.showBtns &&
                    <div id="map-btns-container">
                        <button
                            style={{ margin: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                            className="upload-btn"
                            onClick={() => {
                                if (markerPosition[0] === -125.4494 && markerPosition[1] === 49.6506) {
                                    let search = document.querySelector(".mapboxgl-ctrl-top-right>div>input");
                                    search.style.border = "2px solid red";
                                } else {
                                    this.props.next();
                                    console.log("Next!!");
                                }
                            }}
                        >
                            NEXT
                        </button>
                        <img id="return-img" src="return.svg" onClick={this.props.back}></img>
                    </div>
                }

            </React.Fragment>
        )
    }
}
export default Map;