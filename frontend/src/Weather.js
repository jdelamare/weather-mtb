import React, { Component } from 'react'

const WEATHER_API_KEY = '853a63d3ca859d41b0a88ea4dee35fd4'

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request_once: false,
            weather_data: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.coords.lat !== prevProps.coords.lat || this.props.coords.lon !== prevProps.coords.lon) {

            // TODO: This is wrong.. supposed to hit backend not the API directly

            // let LATITUDE = this.props.coords.lat
            // let LONGITUDE = this.props.coords.lon
            // let PART = 'current,minutely,hourly'
            // let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=${PART}&appid=${WEATHER_API_KEY}`
            // console.log("getWeatherData")
            // this.state.request_once = true;
            // console.log(LATITUDE)
            // fetch(url)
            //     .then(response => response.json())
            //     .then(weather_data => {
            //         console.log(weather_data)
            //         this.state = {
            //             weather_data:
            //         }
            //     })
        }
    }
    // getWeatherData() {
    //     if (!this.state.request_once && this.) {

    //     }
    // }

    render() {
        return(
            <div>
                {/* {this.getWeatherData()} */}
            </div>
        )
    }
}

export default Weather

//  https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY} 


// https://api.openweathermap.org/data/2.5/onecall?lat=45.4798&lon=-122.512&exclude=current,minutely,daily&appid=853a63d3ca859d41b0a88ea4dee35fd4