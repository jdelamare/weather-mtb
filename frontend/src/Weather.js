import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const WEATHER_API_KEY = '853a63d3ca859d41b0a88ea4dee35fd4'

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather_data: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.coords.lat !== prevProps.coords.lat || this.props.coords.lon !== prevProps.coords.lon) {
            
            // TODO: This is wrong.. supposed to hit backend not the API directly
            let url = "weather"
            let payload = {
                lat: this.props.coords.lat,
                lon: this.props.coords.lon,
                part: 'current,minutely,hourly' 
            }
            let options = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(_weather_data => {
                    this.setState({
                        weather_data: _weather_data
                    }) 
                })
        }
    }

    render() {
        if (Object.keys(this.state.weather_data).length === 0) {
            return <div id="weather-overall">"Loading..."</div>
        }
        return (
            <Row>
                <Col>
                    <p>Max temp: {this.state.weather_data.max_temp_faren}</p>
                    <p>Morning temp: {this.state.weather_data.morn_temp_faren}</p>
                    <p>Overall: {this.state.weather_data.weather}</p>
                </Col>
                <Col>
                    {this.renderIcon()} 
                </Col> 
            </Row>
        )
    }

    // document the weather API's image codes
    renderIcon() {
        let icon = this.state.weather_data.weather_icon
        console.log(icon)
        if (icon === "01d") 
        {   return (
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 159.705 159.705" styles="enable-background:new 0 0 159.705 159.705;" space="preserve">
       <g>
           <circle styles="fill:#A3DCE2;" cx="79.853" cy="79.852" r="79.853"/>
           <g>
               <path styles="fill:#FFFFFF;" d="M96.621,69.014c-1.29-12.402-11.772-22.071-24.517-22.071c-2.338,0-4.597,0.336-6.74,0.944
                   c-0.031-0.009-0.062-0.021-0.093-0.03c-4.386,1.265-8.272,3.736-11.286,7.004c-1.812-0.706-3.778-1.085-5.841-1.085
                   c-8.287,0-15.106,6.271-15.992,14.319c-7.242,0.59-12.935,6.52-12.935,13.915c0,7.783,6.309,13.965,14.094,13.965
                   c0.386,0,27.418,0,44.5,0c7.793,0,13.517,0,13.692,0c7.784,0,14.094-6.178,14.094-13.963
                   C105.597,76.033,101.872,71.063,96.621,69.014z"/>
               <path styles="opacity:0.03;" d="M96.621,69.014c-1.29-12.402-11.772-22.071-24.517-22.071c-2.371,0-4.662,0.343-6.833,0.968
                   c9.479,2.741,16.608,11.02,17.655,21.104c5.254,2.049,8.978,6.938,8.978,12.916c0,7.785-6.311,13.88-14.094,13.88
                   c7.793,0,13.517,0,13.692,0c7.784,0,14.094-6.095,14.094-13.88C105.597,75.951,101.872,71.063,96.621,69.014z"/>
               <path styles="fill:#F4F4F4;" d="M130.23,82.197c-1.475-14.172-13.451-25.22-28.013-25.22c-2.673,0-5.255,0.383-7.704,1.079
                   c-0.035-0.01-0.069-0.024-0.104-0.034c-5.011,1.444-9.453,4.27-12.896,8.002c-2.069-0.807-4.319-1.239-6.674-1.239
                   c-9.47,0-17.261,7.165-18.273,16.361c-8.274,0.675-14.781,7.438-14.781,15.886c0,8.894,7.211,15.942,16.105,15.942
                   c0.439,0,31.328,0,50.847,0c8.904,0,15.444,0,15.645,0c8.895,0,16.105-7.045,16.105-15.938
                   C140.487,90.204,136.232,84.538,130.23,82.197z"/>
               <path styles="opacity:0.03;" d="M130.23,82.197c-1.475-14.172-13.451-25.22-28.013-25.22c-2.71,0-5.328,0.391-7.809,1.105
                   c10.831,3.131,18.976,12.59,20.176,24.114c6.003,2.341,10.257,7.927,10.257,14.759c0,8.894-7.211,15.858-16.104,15.858
                   c8.904,0,15.444,0,15.645,0c8.895,0,16.105-6.965,16.105-15.858C140.487,90.124,136.232,84.538,130.23,82.197z"/>
           </g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       <g>
       </g>
       </svg>
            )
        }
    }
}

export default Weather

//  https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY} 


// https://api.openweathermap.org/data/2.5/onecall?lat=45.4798&lon=-122.512&exclude=current,minutely,daily&appid=853a63d3ca859d41b0a88ea4dee35fd4

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>