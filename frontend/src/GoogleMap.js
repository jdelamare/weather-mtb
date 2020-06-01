import React, { Component, createRef } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyAksxPrRH53APz-Y_CXxt4fK7upuR4Qvzg'

class GoogleMap extends Component {
    constructor(props) {
        super(props)
    }

    // A ref is needed here to access the data after it's been loaded.
    googleMapRef = createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')
        
        googleMapScript.src = 
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
        
            window.document.body.appendChild(googleMapScript)

            googleMapScript.addEventListener('load', () => {
                this.googleMap = this.createGoogleMap()
                this.marker = this.createMarker()
            })
    }

    render() {
        // not sure why a closing tag breaks this
        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={{ width: "100%", height: "100%"}}
            />
        )
    }

    // double check how this works
    // https://developers.google.com/maps/documentation/javascript/tutorial
    createGoogleMap = () => 
        new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 16,
            center: {
                lat: 45.6985,
                lng: -123.1835
            },
            disableDefaultUI: true // https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
        })

    createMarker = () =>
        new window.google.maps.Marker({
          position: { lat: 43.642567, lng: -79.387054 },
          map: this.googleMap,
        })
}

export default GoogleMap