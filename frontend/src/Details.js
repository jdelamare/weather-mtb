import React, { Component } from 'react'

import Query from './Query'

class Details extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div>
                <Query buttonClick={this.props.buttonClick}/>
                <div>graphs go here</div>
            </div>
        )
    }
}

export default Details