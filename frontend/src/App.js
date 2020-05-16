import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  send_location_data(); 
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


function send_location_data() {
  // send geolocation data to the backend for processing
  navigator.geolocation.getCurrentPosition((position) => {
    // Some how get the endpoint to post my geolocation data??
    let url = "geolocation";  // Where the hell does the rest of the URL go??
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
      .then(response => response.json())
      .then(data => console.log("Data", data))
      .catch(error => console.log("Request failed", error));
  });
}