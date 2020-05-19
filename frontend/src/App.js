import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()

    send_location_data();
  }

  render() {
    return (
      <div>
        working on trails
      </div>
    )
  }
}

export default App;

// how to bubble up and error from here?
function send_location_data() {
  // send geolocation data to the backend for processing
  navigator.geolocation.getCurrentPosition((position) => {
    // Some how get the endpoint to post my geolocation data??
    let url = "set_coords";  // Where the hell does the rest of the URL go??
    let location = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    let options = {
      method: "POST",
      body: JSON.stringify(location),
      headers: { "Content-Type": "application/json" }
    };
    fetch(url, options)
      .catch(error => console.log("Request failed", error));
  });
}