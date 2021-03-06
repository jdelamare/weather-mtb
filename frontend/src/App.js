import React from 'react';

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
            trails: [], // the main source of data passed down throughout
            lat: 0, // could refactor away these and just use trail data
            lon: 0,
            focusTrail: 0 // indicates the data shown in Details
        }
        this.buttonClick = this.buttonClick.bind(this)
        this.cardClick = this.cardClick.bind(this)
    }

    // Happens on load
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude
        })
        let url = "get_trails";  // TODO BASE URL
        let location = {
            lat: this.state.lat,
            lon: this.state.lon
        };
        let options = {
            method: "POST",
            body: JSON.stringify(location),
            headers: { "Content-Type": "application/json" }
        }
        fetch(url, options)
            .then(response => response.json())
            .then(_trails => {
                if (_trails.length === 0) {
                    return
                }
                this.setState({
                    trails: _trails,
                    lat: _trails[0]["latitude"],
                    lon: _trails[0]["longitude"],
                    focusTrail: 0
                })
            })
            .catch(error => console.log("Request failed", error));
        });
    }

    // write new function for cardClick
    cardClick(coords, idx) {
    // transmit this card's data to GoogelMap as a prop
        this.setState({
            lat: coords.lat,
            lon: coords.lon,
            focusTrail: idx
        })
    }

  
    // if button is clicked, update state
    buttonClick() {
        let url_favorites =  "get_favorites"  // TODO BASE URL
        let _userid = document.getElementById("query").value
        // TODO this could be refactored
        // in lieu of JS, we'll just let other backend deal with bad userid
        if (_userid === "") {
            return
        }
        let userId = {
            userId: `${_userid}`
        }
        let options_favorites = {
            method: "POST",
            body: JSON.stringify(userId),
            headers: { "Content-Type": "application/json" }
        }
    
        fetch(url_favorites, options_favorites)
            .then(response => response.json())
            .then(trail_ids => {
                let url_by_id = "get_trail_by_id"  // TODO BASE URL
                let ids = {
                    ids: trail_ids 
                }
                let options_by_id = {
                    method: "POST",
                    body: JSON.stringify(ids),
                    headers: { "Content-Type": "application/json" }
                }
                return fetch(url_by_id, options_by_id)
            })
            .then(response => response.json())
            .then(_trails => {
                if (_trails.length === 0) {
                    return
                }
                // Point of optimization here, no need to rerender if the same trails are displayed
                this.setState({
                    trails: _trails
                })
            })
            .catch(error => console.log("Request failed", error)) 
    }

    render() {
        return (
          <div>
            <Container fluid>
              <Row>
                <Col 
                  xs={4} 
                  id="TrailList">
                  <TrailList 
                    trails={this.state.trails} 
                    cardClick={this.cardClick}/>
                </Col>
                <Col 
                  xs={8} 
                  id="Info">
                  <Row>
                    <Col 
                      id="Details">
                      <Details 
                        buttonClick={this.buttonClick}
                        trailData={this.state}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col 
                      id="Map">
                      <GoogleMap 
                        coords={{lat: this.state.lat, lon: this.state.lon}}/>
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