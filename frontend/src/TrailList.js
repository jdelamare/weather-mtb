import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'

import './style/TrailList.css'

class TrailList extends Component {

    // TODO bind to handle clicks on the cards here

    // constructor() {
    //     super()
    //     this.state = {
    //         trails: []
    //     }
    // }

    // don't forget that if a subscription is created here it'll need to be uncreated
    // componentDidMount() {
    //     console.log(this.props)
    //     let url = "get_trails";  // Where the hell does the rest of the URL go??
    //     fetch(url, {
    //         headers: { "Content-Type": "application/json" }
    //         })
    //         .then(response => response.json())
    //         .then(_trails => this.setState( {
    //             trails: _trails
    //         }))
    //         .catch(error => console.log("Request failed", error))
    // }

    getBorder(trail) {
        if (trail.conditionStatus.includes("All Clear")) {
            return "success"
        } else if (trail.conditionStatus.includes("Closed")) {
            return "danger"
        } else {
            return "info"
        }
    }

    // set to epoch if null, so return empty string
    getConditionDate(trail) {
        if (trail.conditionDate === "1970-01-01 00:00:00") {
            return ""
        }
        return trail.conditionDate
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this
                .props 
                .trails
                .map((trail, idx) => (
                    <div>
                        <Card
                            border={this.getBorder(trail)}
                            key={idx}
                        >
                        <Card.Header>{trail.name}</Card.Header>
                        <Card.Body>
                            <Card.Title>{trail.conditionDetails}</Card.Title>
                            <Card.Text>{this.getConditionDate(trail)}</Card.Text>
                        </Card.Body>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        )
    }
}

export default TrailList