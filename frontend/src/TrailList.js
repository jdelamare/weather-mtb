import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'

import './style/TrailList.css'

class TrailList extends Component {
    constructor(props) {
        super(props)
    }

    getBorder(trail) {
        if (trail.conditionStatus.includes("All Clear")) 
        {
            return "success"
        } 
        else if (trail.conditionStatus.includes("Closed")) 
        {
            return "danger"
        } 
        else 
        {
            return "info"
        }
    }

    // set to epoch if null, so return empty string
    getConditionDate(trail) 
    {
        if (trail.conditionDate === "1970-01-01 00:00:00") 
        {
            return ""
        }

        return trail.conditionDate
    }


    // TODO 
    // pass function down here to handle click and change state in App.js
    // which will update the map
    handleCardClick(lat, lon) 
    {
        // pass this up to the App and get location data
        // Timebox: 1 hour
        let coords = {
            lat: lat,
            lon: lon
        }
        this.props.cardClick(coords)
    }


    render() {
        console.log(this.props)
        return (
            <div>
                {this
                .props 
                .trails
                .map((trail, idx) => (
                    <div 
                        onClick={() => this.handleCardClick(trail.latitude, trail.longitude)}
                        key={idx}>
                        <Card border={this.getBorder(trail)}>
                        <Card.Header>{trail.name}</Card.Header>
                        <Card.Body>
                            <Card.Title>{trail.conditionDetails}</Card.Title>
                            <Card.Text>{this.getConditionDate(trail)}</Card.Text>
                        </Card.Body>
                        </Card>
                        <br/>
                    </div>
                ))}
            </div>
        )
    }
}

export default TrailList