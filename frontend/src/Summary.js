import React, { Component } from 'react'

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailName: "",
            trailSummary: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.trailData.trails.length !== prevProps.trailData.trails.length || // when we first load
            this.props.trailData.focusTrail !== prevProps.trailData.focusTrail)         // when we click a trail
        {  
            let focusTrail = this.props.trailData.focusTrail

            this.setState({
                trailName: this.props.trailData.trails[focusTrail].name,
                trailSummary: this.props.trailData.trails[focusTrail].summary
            })
        }
    }
    
    render() {
        return (
            <div>
                <h4>{this.state.trailName}</h4>
                <p>{this.state.trailSummary}</p>
            </div>
        )
    }
}

export default Summary