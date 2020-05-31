import React, { Component } from 'react'

import Query from './Query'

class Details extends Component {
    constructor() {
        super()
        
    }

    render() {
        return (
            <div>
                <Query />
                <div>graphs go here</div>
            </div>
        )
    }
}

export default Details