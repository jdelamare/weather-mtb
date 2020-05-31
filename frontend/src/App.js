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
    this.state = {
      trails: []
  }
    this.send_location_data();
    this.handleClick = this.handleClick.bind(this)
  }

  // how to bubble up and error from here?
  send_location_data() {
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

  componentDidMount() {
    let url = "get_trails";  // Where the hell does the rest of the URL go??
    fetch(url, {
        headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(_trails => this.setState( {
            trails: _trails
        }))
        .catch(error => console.log("Request failed", error))
  }

  // if button is clicked, update state
  handleClick() {
    console.log('Click happened');
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col xs={4} id="TrailList">
              <TrailList trails={this.state.trails}/>
            </Col>
            <Col xs={8} id="Info">
              <Row>
                <Col id="Details">
                  <Details buttonClick={this.handleClick}/>
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