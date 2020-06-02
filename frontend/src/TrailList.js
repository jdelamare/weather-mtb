import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'

import './style/TrailList.css'

class TrailList extends Component {

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

        return "Last Updated: " + trail.conditionDate
    }

    handleCardClick(lat, lon, idx) 
    {
        let coords = {
            lat: lat,
            lon: lon
        }
        this.props.cardClick(coords, idx)
    }


    render() 
    {
        return (
            <div>
                {this
                .props 
                .trails
                .map((trail, idx) => (
                    <div 
                        onClick={() => this.handleCardClick(trail.latitude, trail.longitude, idx)}
                        key={idx}>
                        <Card 
                            border={this.getBorder(trail)}>
                            <Card.Header>
                                Trail Name: {trail.name}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {trail.conditionDetails}
                                </Card.Title>
                                <Card.Text>
                                    {this.getConditionDate(trail)}
                                </Card.Text>
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