import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Query from './Query'
import BarChart from './BarChart'
import StarRating from './StarRating'
import Difficulty from './Difficulty'
import Summary from './Summary'
import Weather from './Weather'

import './style/Details.css'

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            difficulty: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.trailData.trails.length !== prevProps.trailData.trails.length || // when we first load
            this.props.trailData.focusTrail !== prevProps.trailData.focusTrail)         // when we click a trail
        {  
            let focusTrail = this.props.trailData.focusTrail
            this.setState({
                rating: this.props.trailData.trails[focusTrail].stars,
                difficulty: this.props.trailData.trails[focusTrail].difficulty
            })
        }
    }

    render() 
    {
        console.log("rerendering details")
        console.log(this.props.trailData)

        return (
            <div>
                <Row id="row1">
                    <Col>
                        <Query 
                            buttonClick={this.props.buttonClick}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row id="row2">
                            <Col>
                                <Summary trailData={this.props.trailData}/>
                            </Col>
                            <Col>
                                <Weather coords={{lat: this.state.lat, lon: this.state.lon}}/>
                            </Col> 
                        </Row>
                        <Row id="row3">
                            <Col>
                                <BarChart 
                                    trailData={this.props.trailData}/>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <br />
                                        Rating
                                        <br />
                                        <br />
                                        <StarRating 
                                            rating={this.state.rating}/>
                                    </Col>
                                    <Col>
                                        <br />
                                        <div>Difficulty</div>
                                        <br />
                                        <Difficulty 
                                            difficulty={this.state.difficulty}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Details