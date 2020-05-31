import React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import TrailList from "./TrailList"
import GoogleMap from "./GoogleMap"
import Details from "./Details"
import './style/App.css';

class App extends React.Component {
  constructor() {
    super()

    send_location_data();
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col xs={4} id="TrailList">
              <TrailList />
            </Col>
            <Col xs={8} id="Info">
              <Row>
                <Col id="Details">
                  <Details />
                </Col>
              </Row>
              <Row>
                <Col id="Map">
                  <GoogleMap />
                </Col>
              </Row>
            </Col>
          </Row>
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