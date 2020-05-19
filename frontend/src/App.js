import React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'


import './App.css';

class App extends React.Component {
  constructor() {
    super()

    send_location_data();
  }

  render() {
    let x = [
      'Primary',
      'Secondary',
      'Success',
      'Danger',
      'Warning',
      'Info',
      'Light',
      'Dark',
    ].map((variant, idx) => (
      <>
        <Card
          bg={variant.toLowerCase()}
          key={idx}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>{variant} Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </>
    ));

    return (
      <div>
        <Container className="p-3">
          {x}
        </Container> 
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