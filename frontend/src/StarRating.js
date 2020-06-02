import React, { Component } from 'react'
import Rating from 'react-rating'

class StarRating extends Component {

    // TODO make little cogs
    render() {
        return (
                <Rating 
                    initialRating={this.props.rating}/> 
        )
    }
}

export default StarRating