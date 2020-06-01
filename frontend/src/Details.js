import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Query from './Query'
import BarChart from './BarChart'

class Details extends Component {

    render() 
    {
        console.log("rerendering details")
        console.log(this.props.trailData)
        return (
            <div>
                <Row>
                    <Col>
                        <Query 
                            buttonClick={this.props.buttonClick}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BarChart trailData={this.props.trailData}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Details