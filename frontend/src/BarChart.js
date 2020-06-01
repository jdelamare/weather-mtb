import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2'

class BarChart extends Component {
    constructor(props) {
      super(props)
      this.state = {
        datasets: [
            {
              label: 'Descent',
              backgroundColor: 'rgb(154, 209, 245, 1)',
              borderColor: 'rgb(54, 162, 235, 1)',
              borderWidth: 2,
              data: []
            },
            {
              label: 'Ascent',
              backgroundColor: 'rgb(255, 176, 193, 1)',
              borderColor: 'rgb(255, 128, 155, 1)',
              borderWidth: 2,
              data: []
            },
            {
              label: 'Difference',
              backgroundColor: 'rgb(150, 217, 121, 1)',
              borderColor: 'rgb(115, 175, 89, 1)',
              borderWidth: 2,
              data: []
            } 
        ]
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.trailData.trails.length !== prevProps.trailData.trails.length || // when we first load
          this.props.trailData.focusTrail !== prevProps.trailData.focusTrail)         // when we click a trail
        {
        let focusTrail = this.props.trailData.focusTrail
        let ascent = this.props.trailData.trails[focusTrail].ascent 
        let descent = this.props.trailData.trails[focusTrail].descent 
        let diff = ascent + descent
        this.setState({
          datasets: [
              {
                label: 'Descent',
                backgroundColor: 'rgb(154, 209, 245, 1)',
                borderColor: 'rgb(54, 162, 235, 1)',
                borderWidth: 2,
                data: [descent]
              },
              {
                label: 'Ascent',
                backgroundColor: 'rgb(255, 176, 193, 1)',
                borderColor: 'rgb(255, 128, 155, 1)',
                borderWidth: 2,
                data: [ascent]
              },
              {
                label: 'Total',
                backgroundColor: 'rgb(150, 217, 121, 1)',
                borderColor: 'rgb(115, 175, 89, 1)',
                borderWidth: 2,
                data: [diff]
              }  
          ]
        })
      }
    }


    render()
    {
        return (
              <HorizontalBar
                data={{ datasets: this.state.datasets }}
                options={{
                  title:{
                    display:true,
                    text: 'Descent / Ascent',
                    fontSize:20
                  },
                  legend:{
                    display:false,
                  },
                  maintainAspectRatio: false
                }}
              />
          )
    }
}

export default BarChart