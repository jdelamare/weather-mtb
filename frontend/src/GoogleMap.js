import React, { Component, createRef } from 'react'

// My take on this particular API key is as follows:
// Yes, it's bad practice to put an API key in the code. It's not in the repository
// where the code is hosted. But the only alternative (when hosting out of S3), would
// be to make a call to the backend to get the API key before use. But that's too much
// overhead. As it stands, unless I ship back the map data (clueless how to), an end 
// user would be able to sniff this key in transit anyways- it's in your plaintext 
// request. So the justification is that it stays here and I rate limit in GCP.
const GOOGLE_MAP_API_KEY = ''

class GoogleMap extends Component {
    // A ref is needed here to access the data after it's been loaded.
    googleMapRef = createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')
        
        googleMapScript.src = 
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
        
            window.document.body.appendChild(googleMapScript)

            googleMapScript.addEventListener('load', () => {
                this.googleMap = this.createGoogleMap()
            })
    }

    componentDidUpdate(prevProps) {
        if (window.google) 
        {
            if (this.props.coords.lat.toFixed(3) !== prevProps.coords.lat.toFixed(3) || 
                this.props.coords.lon.toFixed(3) !== prevProps.coords.lon.toFixed(3)) 
            {
                let newCoords = new window.google.maps.LatLng(this.props.coords.lat, this.props.coords.lon)
                this.googleMap.panTo(newCoords)
            }
        }
    }

    render() 
    {
        if (this.props.lat === 0 && this.props.lon === 0) 
        {
            return (
                <div>
                    Loading...
                </div>) 
        }
        return ( 
            // not sure why a closing tag breaks this
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
                lat: this.props.coords.lat,
                lng: this.props.coords.lon      // WARNING: Switch from lon to lng for Google
            },
            disableDefaultUI: true // https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
        })
}

export default GoogleMap