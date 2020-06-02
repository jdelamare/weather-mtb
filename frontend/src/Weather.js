import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const WEATHER_API_KEY = ''

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
            return <div id="weather-overall">Loading...</div>
        }
        return (
            <Row>
                <Col>
                    <p>Max temp: {this.state.weather_data.max_temp_faren}</p>
                    <p>Morning temp: {this.state.weather_data.morn_temp_faren}</p>
                    <p>Overall: {this.state.weather_data.weather}</p>
                </Col>
                <Col>
                    <br/>
                    {this.renderIcon()} 
                </Col> 
            </Row>
        )
    }

    // document the weather API's image codes
    /*
    01d clear               sun.svg         done
    02d few clouds          cloud-2.svg     done
    03d scattered clouds    cloud-1.svg     done
    04d broken clouds       cloud-2.svg     done
    09d shower rain         rain-1.svg      done
    10d rain                rain-3.svg      done
    11d storm               storm.svg       done
    13d snow                snow.svg
    50d mist                cloud-1.svg     done
    */

    renderIcon() {
        let icon = this.state.weather_data.weather_icon
        console.log(icon)
        if (icon === "01d") 
        {   
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.852" cy="79.852" r="79.852"/>
                        <g>
                            <g>
                                <polygon style={{fill:"#F8B000"}} points="80.389,33.315 84.195,37.671 88.715,34.065 91.68,39.031 96.773,36.289 98.806,41.704 
                                    104.306,39.916 104.812,45.607 110.019,44.83 110.019,50.614 116.32,50.872 115.55,56.563 121.321,57.849 119.353,63.264 
                                    124.704,65.536 121.754,70.502 126.589,73.687 122.787,78.042 126.972,82.038 122.45,85.645 125.851,90.323 120.756,93.063 
                                    123.267,98.274 117.766,100.061 119.306,105.635 113.575,106.411 114.093,112.171 108.316,111.911 107.798,117.671 
                                    102.158,116.384 100.621,121.96 95.303,119.685 92.794,124.897 87.968,121.709 84.569,126.39 80.388,122.391 76.209,126.39 
                                    72.81,121.709 67.983,124.897 65.474,119.685 60.157,121.96 58.617,116.384 52.98,117.671 52.462,111.911 46.684,112.171 
                                    47.203,106.411 41.472,105.635 43.011,100.061 37.511,98.274 40.021,93.063 34.927,90.323 38.327,85.645 33.805,82.038 
                                    37.987,78.042 34.18,73.687 39.008,70.502 36.04,65.536 41.36,63.264 39.326,57.849 44.964,56.564 43.585,50.872 49.019,50.614 
                                    49.019,44.83 55.095,45.607 56.3,39.916 61.886,41.704 63.961,36.289 69.075,39.031 72.052,34.065 76.578,37.671 			"/>
                                <circle style={{fill:"#F6D100"}} cx="80.389" cy="79.946" r="34.472"/>
                            </g>
                            <polyline style={{fill:"#EAA200"}} points="80.389,33.315 84.195,37.671 88.715,34.065 91.68,39.031 96.773,36.289 98.806,41.704 
                                104.306,39.916 104.812,45.607 110.019,44.83 110.019,50.614 116.32,50.872 115.55,56.563 121.321,57.849 119.353,63.264 
                                124.704,65.536 121.754,70.502 126.589,73.687 122.787,78.042 126.972,82.038 122.45,85.645 125.851,90.323 120.756,93.063 
                                123.267,98.274 117.766,100.061 119.306,105.635 113.575,106.411 114.093,112.171 108.316,111.911 107.798,117.671 
                                102.158,116.384 100.621,121.96 95.303,119.685 92.794,124.897 87.968,121.709 84.569,126.39 80.388,122.391 		"/>
                            <path style={{fill:"#EAC300"}} d="M80.389,45.475c19.037,0,34.472,15.434,34.472,34.471c0,19.038-15.435,34.472-34.472,34.472"/>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "03d" || icon === "50d")
        {
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.853" cy="79.852" r="79.853"/>
                        <g>
                            <path style={{fill:"#FFFFFF"}} d="M96.621,69.014c-1.29-12.402-11.772-22.071-24.517-22.071c-2.338,0-4.597,0.336-6.74,0.944
                                c-0.031-0.009-0.062-0.021-0.093-0.03c-4.386,1.265-8.272,3.736-11.286,7.004c-1.812-0.706-3.778-1.085-5.841-1.085
                                c-8.287,0-15.106,6.271-15.992,14.319c-7.242,0.59-12.935,6.52-12.935,13.915c0,7.783,6.309,13.965,14.094,13.965
                                c0.386,0,27.418,0,44.5,0c7.793,0,13.517,0,13.692,0c7.784,0,14.094-6.178,14.094-13.963
                                C105.597,76.033,101.872,71.063,96.621,69.014z"/>
                            <path style={{opacity:0.03}} d="M96.621,69.014c-1.29-12.402-11.772-22.071-24.517-22.071c-2.371,0-4.662,0.343-6.833,0.968
                                c9.479,2.741,16.608,11.02,17.655,21.104c5.254,2.049,8.978,6.938,8.978,12.916c0,7.785-6.311,13.88-14.094,13.88
                                c7.793,0,13.517,0,13.692,0c7.784,0,14.094-6.095,14.094-13.88C105.597,75.951,101.872,71.063,96.621,69.014z"/>
                            <path style={{fill:"#F4F4F4"}} d="M130.23,82.197c-1.475-14.172-13.451-25.22-28.013-25.22c-2.673,0-5.255,0.383-7.704,1.079
                                c-0.035-0.01-0.069-0.024-0.104-0.034c-5.011,1.444-9.453,4.27-12.896,8.002c-2.069-0.807-4.319-1.239-6.674-1.239
                                c-9.47,0-17.261,7.165-18.273,16.361c-8.274,0.675-14.781,7.438-14.781,15.886c0,8.894,7.211,15.942,16.105,15.942
                                c0.439,0,31.328,0,50.847,0c8.904,0,15.444,0,15.645,0c8.895,0,16.105-7.045,16.105-15.938
                                C140.487,90.204,136.232,84.538,130.23,82.197z"/>
                            <path style={{opacity:0.03}} d="M130.23,82.197c-1.475-14.172-13.451-25.22-28.013-25.22c-2.71,0-5.328,0.391-7.809,1.105
                                c10.831,3.131,18.976,12.59,20.176,24.114c6.003,2.341,10.257,7.927,10.257,14.759c0,8.894-7.211,15.858-16.104,15.858
                                c8.904,0,15.444,0,15.645,0c8.895,0,16.105-6.965,16.105-15.858C140.487,90.124,136.232,84.538,130.23,82.197z"/>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "02d" || icon === "04d") 
        {
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.852" cy="79.852" r="79.852"/>
                        <g>
                            <g>
                                <g>
                                    <polygon style={{fill:"#F8B000"}} points="59.389,30.505 62.562,34.137 66.332,31.13 68.805,35.271 73.051,32.984 74.745,37.5 
                                        79.332,36.009 80.049,40.754 84.686,40.106 84.686,44.929 89.645,45.144 88.855,49.89 93.593,50.962 91.915,55.477 
                                        96.359,57.372 93.89,61.512 97.917,64.168 94.744,67.799 98.231,71.131 94.461,74.138 97.296,78.039 93.048,80.324 
                                        95.142,84.669 90.555,86.159 91.839,90.807 87.06,91.454 87.493,96.257 82.675,96.04 82.243,100.843 77.542,99.77 
                                        76.26,104.419 71.825,102.522 69.733,106.868 65.708,104.21 62.874,108.113 59.389,104.779 55.904,108.113 53.069,104.21 
                                        49.045,106.868 46.953,102.522 42.519,104.419 41.236,99.77 36.535,100.843 36.103,96.04 31.285,96.257 31.718,91.454 
                                        26.938,90.807 28.223,86.159 23.636,84.669 25.729,80.324 21.482,78.039 24.317,74.138 20.546,71.131 24.032,67.799 
                                        20.859,64.168 24.884,61.512 22.41,57.372 26.845,55.477 25.149,50.962 29.852,49.89 28.928,45.144 33.686,44.929 
                                        33.686,40.106 38.525,40.754 39.416,36.009 44.018,37.5 45.719,32.984 49.97,35.271 52.444,31.13 56.216,34.137 				"/>
                                    <circle style={{fill:"#F6D100"}} cx="59.389" cy="69.387" r="28.743"/>
                                </g>
                                <polyline style={{fill:"#EAA200"}} points="59.389,30.505 62.562,34.137 66.332,31.13 68.805,35.271 73.051,32.984 74.745,37.5 
                                    79.332,36.009 80.049,40.754 84.686,40.106 84.686,44.929 89.645,45.144 88.855,49.89 93.593,50.962 91.915,55.477 
                                    96.359,57.372 93.89,61.512 97.917,64.168 94.744,67.799 98.231,71.131 94.461,74.138 97.296,78.039 93.048,80.324 
                                    95.142,84.669 90.555,86.159 91.839,90.807 87.06,91.454 87.493,96.257 82.675,96.04 82.243,100.843 77.542,99.77 76.26,104.419 
                                    71.825,102.522 69.733,106.868 65.708,104.21 62.874,108.113 59.389,104.779 			"/>
                                <path style={{fill:"#EAC300"}} d="M59.389,40.644c15.873,0,28.743,12.869,28.743,28.743c0,15.874-12.869,28.743-28.743,28.743"/>
                            </g>
                            <g>
                                <path style={{fill:"#F0F0F0"}} d="M128.505,82.851c-1.615-15.531-14.743-27.642-30.702-27.642c-2.971,0-5.84,0.428-8.558,1.212
                                    c11.872,3.432,20.799,13.8,22.112,26.43c6.579,2.566,11.243,8.689,11.243,16.177c0,9.749-7.903,17.382-17.652,17.382
                                    c9.761,0,16.928,0,17.147,0c9.749,0,17.653-7.633,17.653-17.382C139.748,91.54,135.083,85.416,128.505,82.851z"/>
                                <path style={{fill:"#FFFFFF"}} d="M122.6,99.028c0-7.488-4.664-13.747-11.243-16.313c-1.313-12.629-10.24-22.929-22.112-26.361
                                    c-5.494,1.583-10.362,4.68-14.136,8.771c-2.269-0.885-4.733-1.358-7.315-1.358c-10.378,0-18.919,7.853-20.028,17.935
                                    c-9.07,0.739-16.202,8.063-16.202,17.323c0,9.749,7.903,17.387,17.653,17.387c0.481,0,34.336,0,55.73,0
                                    C114.697,116.41,122.6,108.777,122.6,99.028z"/>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "09d")
        {
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.853" cy="79.852" r="79.853"/>
                        <g>
                            <path style={{fill:"#F0F0F0"}} d="M120.438,67.047c-1.53-14.711-13.965-26.182-29.081-26.182c-2.813,0-5.531,0.406-8.106,1.148
                                c11.244,3.251,19.699,13.07,20.943,25.033c6.231,2.43,10.649,8.23,10.649,15.322c0,9.233-7.486,16.463-16.719,16.463
                                c9.243,0,16.033,0,16.241,0c9.233,0,16.719-7.229,16.719-16.463C131.085,75.277,126.667,69.477,120.438,67.047z"/>
                            <path style={{fill:"#FFFFFF"}} d="M114.844,82.369c0-7.092-4.418-13.021-10.649-15.451c-1.244-11.962-9.699-21.717-20.943-24.969
                                c-5.203,1.5-9.813,4.434-13.389,8.309c-2.148-0.838-4.483-1.287-6.928-1.287c-9.83,0-17.919,7.438-18.971,16.986
                                c-8.589,0.7-15.344,7.637-15.344,16.408c0,9.232,7.485,16.467,16.719,16.467c0.456,0,32.523,0,52.786,0
                                C107.357,98.832,114.844,91.603,114.844,82.369z"/>
                            <path style={{fill:"#FFFFFF"}} d="M112.049,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.522-2.472-5.522-5.521
                                c0-3.05,5.522-8.621,5.522-8.621S112.049,111.667,112.049,114.717"/>
                            <path style={{fill:"#F7F7F7"}} d="M106.527,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C112.049,111.667,106.527,106.096,106.527,106.096"/>
                            <path style={{fill:"#FFFFFF"}} d="M86.975,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.521-2.472-5.521-5.521
                                c0-3.05,5.521-8.621,5.521-8.621S86.975,111.667,86.975,114.717"/>
                            <path style={{fill:"#F7F7F7"}} d="M81.453,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C86.975,111.667,81.453,106.096,81.453,106.096"/>
                            <path style={{fill:"#FFFFFF"}} d="M61.9,114.717c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.521-2.472-5.521-5.521
                                c0-3.05,5.521-8.621,5.521-8.621S61.9,111.667,61.9,114.717"/>
                            <path style={{fill:"#F7F7F7"}} d="M56.379,106.096v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C61.9,111.667,56.379,106.096,56.379,106.096"/>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "10d") 
        {
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.853" cy="79.852" r="79.853"/>
                        <g>
                            <path style={{fill:"#F0F0F0"}} d="M119.438,62.126c-1.53-14.71-13.965-26.181-29.081-26.181c-2.813,0-5.531,0.406-8.105,1.148
                                c11.244,3.251,19.699,13.07,20.943,25.033c6.231,2.431,10.649,8.231,10.649,15.322c0,9.234-7.486,16.463-16.719,16.463
                                c9.243,0,16.033,0,16.241,0c9.233,0,16.719-7.229,16.719-16.463C130.086,70.356,125.668,64.556,119.438,62.126z"/>
                            <path style={{fill:"#FFFFFF"}} d="M113.845,77.448c0-7.092-4.418-13.02-10.649-15.451c-1.244-11.961-9.699-21.717-20.943-24.968
                                c-5.203,1.5-9.813,4.433-13.389,8.308c-2.148-0.838-4.483-1.287-6.928-1.287c-9.83,0-17.919,7.438-18.971,16.987
                                c-8.589,0.7-15.344,7.637-15.344,16.407c0,9.233,7.485,16.467,16.719,16.467c0.456,0,32.523,0,52.786,0
                                C106.358,93.911,113.845,86.682,113.845,77.448z"/>
                            <path style={{fill:"#FFFFFF"}} d="M111.05,109.796c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.522-2.472-5.522-5.521
                                c0-3.05,5.522-8.621,5.522-8.621S111.05,106.746,111.05,109.796"/>
                            <path style={{fill:"#F7F7F7"}} d="M105.528,101.175v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C111.05,106.746,105.528,101.175,105.528,101.175"/>
                            <path style={{fill:"#FFFFFF"}} d="M85.976,109.796c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.522-2.472-5.522-5.521
                                c0-3.05,5.522-8.621,5.522-8.621S85.976,106.746,85.976,109.796"/>
                            <path style={{fill:"#F7F7F7"}} d="M80.454,101.175v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C85.976,106.746,80.454,101.175,80.454,101.175"/>
                            <path style={{fill:"#FFFFFF"}} d="M60.901,109.796c0,3.05-2.473,5.521-5.521,5.521c-3.05,0-5.521-2.472-5.521-5.521
                                c0-3.05,5.521-8.621,5.521-8.621S60.901,106.746,60.901,109.796"/>
                            <path style={{fill:"#F7F7F7"}} d="M55.38,101.175v14.143c3.049,0,5.521-2.472,5.521-5.521
                                C60.901,106.746,55.38,101.175,55.38,101.175"/>
                            <path style={{fill:"#FFFFFF"}} d="M98.513,126.718c0,3.05-2.473,5.522-5.521,5.522c-3.05,0-5.522-2.472-5.522-5.522
                                s5.522-8.621,5.522-8.621S98.513,123.668,98.513,126.718"/>
                            <path style={{fill:"#F7F7F7"}} d="M92.991,118.097v14.143c3.049,0,5.521-2.472,5.521-5.522S92.991,118.097,92.991,118.097"/>
                            <path style={{fill:"#FFFFFF"}} d="M73.438,126.718c0,3.05-2.473,5.522-5.521,5.522c-3.05,0-5.521-2.472-5.521-5.522
                                s5.521-8.621,5.521-8.621S73.438,123.668,73.438,126.718"/>
                            <path style={{fill:"#F7F7F7"}} d="M67.917,118.097v14.143c3.049,0,5.521-2.472,5.521-5.522S67.917,118.097,67.917,118.097"/>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "11d")
        {
            return (
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 159.705 159.705" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="79.852" cy="79.852" r="79.852"/>
                        <g>
                            <path style={{fill:"#F0F0F0"}} d="M120.253,59.004c-1.53-14.711-13.965-26.182-29.081-26.182c-2.813,0-5.531,0.406-8.105,1.148
                                c11.244,3.251,19.699,13.07,20.943,25.033c6.231,2.43,10.649,8.23,10.649,15.322c0,9.233-7.486,16.463-16.719,16.463
                                c9.243,0,16.033,0,16.241,0c9.233,0,16.719-7.229,16.719-16.463C130.9,67.235,126.482,61.434,120.253,59.004z"/>
                            <path style={{fill:"#FFFFFF"}} d="M114.659,74.327c0-7.092-4.418-13.021-10.649-15.451c-1.244-11.962-9.699-21.717-20.943-24.969
                                c-5.203,1.5-9.813,4.434-13.389,8.309c-2.148-0.838-4.483-1.287-6.928-1.287c-9.83,0-17.919,7.438-18.971,16.986
                                c-8.589,0.7-15.344,7.637-15.344,16.408c0,9.232,7.485,16.467,16.719,16.467c0.456,0,32.523,0,52.786,0
                                C107.173,90.789,114.659,83.56,114.659,74.327z"/>
                        </g>
                        <g>
                            <polygon style={{fill:"#F6D100"}} points="68.633,139.09 98.475,114.932 91.843,114.932 85.396,114.932 94.054,96.932 87.422,96.932 
                                70.843,96.932 60.896,124.932 66.422,124.932 73.054,124.932 70.852,131.984 		"/>
                            <g>
                                <polygon style={{fill:"#EAC300"}} points="98.475,114.932 91.843,114.932 70.852,131.879 68.633,139.168 			"/>
                                <polygon style={{fill:"#EAC300"}} points="85.396,114.932 94.054,96.932 87.422,96.932 78.765,114.932 			"/>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        }
        else if (icon === "13d")
        {
            return (
                <svg version="1.1" id="weather-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="-225 317.3 159.7 159.7" width="30%" height="auto" xmlSpace="preserve">
                    <g>
                        <circle style={{fill:"#A3DCE2"}} cx="-145.1" cy="397.1" r="79.9"/>
                        <g>
                            <g>
                                <path style={{fill:"#F0F0F0"}} d="M-107.2,380c-1.5-14.7-14-26.2-29.1-26.2c-2.8,0-5.5,0.4-8.1,1.1c11.2,3.3,19.7,13.1,20.9,25
                                    c6.2,2.4,10.6,8.2,10.6,15.3c0,9.2-7.5,16.5-16.7,16.5c9.2,0,16,0,16.2,0c9.2,0,16.7-7.2,16.7-16.5
                                    C-96.5,388.3-101,382.5-107.2,380z"/>
                                <path style={{fill:"#FFFFFF"}} d="M-112.8,395.4c0-7.1-4.4-13-10.6-15.5c-1.2-12-9.7-21.7-20.9-25c-5.2,1.5-9.8,4.4-13.4,8.3
                                    c-2.1-0.8-4.5-1.3-6.9-1.3c-9.8,0-17.9,7.4-19,17c-8.6,0.7-15.3,7.6-15.3,16.4c0,9.2,7.5,16.5,16.7,16.5c0.5,0,32.5,0,52.8,0
                                    C-120.3,411.8-112.8,404.6-112.8,395.4z"/>
                            </g>
                            <g>
                                <g>
                                    <path style={{fill:"#FFFFFF"}} d="M-147.1,442.8c-1.4,0-2.5-1.1-2.5-2.5v-20c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5v20
                                        C-144.6,441.7-145.8,442.8-147.1,442.8z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-137.6,433.3h-20c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5
                                        S-136.3,433.3-137.6,433.3z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-154.5,440.2c-0.6,0-1.3-0.2-1.8-0.7c-1-1-1-2.6,0-3.5l14.5-14.5c1-1,2.6-1,3.5,0s1,2.6,0,3.5l-14.5,14.5
                                        C-153.2,440-153.8,440.2-154.5,440.2z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-140.3,440.2c-0.6,0-1.3-0.2-1.8-0.7l-14.5-14.5c-1-1-1-2.6,0-3.5c1-1,2.6-1,3.5,0l14.5,14.5
                                        c1,1,1,2.6,0,3.5C-139.1,440-139.7,440.2-140.3,440.2z"/>
                                </g>
                                <g>
                                    <path style={{fill:"#FFFFFF"}} d="M-117.1,442.8c-1.4,0-2.5-1.1-2.5-2.5v-20c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5v20
                                        C-114.6,441.7-115.8,442.8-117.1,442.8z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-107.6,433.3h-20c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5
                                        S-106.3,433.3-107.6,433.3z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-124.5,440.2c-0.6,0-1.3-0.2-1.8-0.7c-1-1-1-2.6,0-3.5l14.5-14.5c1-1,2.6-1,3.5,0s1,2.6,0,3.5l-14.5,14.5
                                        C-123.2,440-123.8,440.2-124.5,440.2z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-110.3,440.2c-0.6,0-1.3-0.2-1.8-0.7l-14.5-14.5c-1-1-1-2.6,0-3.5s2.6-1,3.5,0l14.5,14.5c1,1,1,2.6,0,3.5
                                        C-109.1,440-109.7,440.2-110.3,440.2z"/>
                                </g>
                                <g>
                                    <path style={{fill:"#FFFFFF"}} d="M-177.1,442.8c-1.4,0-2.5-1.1-2.5-2.5v-20c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5v20
                                        C-174.6,441.7-175.8,442.8-177.1,442.8z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-167.6,433.3h-20c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5
                                        S-166.3,433.3-167.6,433.3z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-184.5,440.2c-0.6,0-1.3-0.2-1.8-0.7c-1-1-1-2.6,0-3.5l14.5-14.5c1-1,2.6-1,3.5,0c1,1,1,2.6,0,3.5
                                        l-14.5,14.5C-183.2,440-183.8,440.2-184.5,440.2z"/>
                                    <path style={{fill:"#FFFFFF"}} d="M-170.3,440.2c-0.6,0-1.3-0.2-1.8-0.7l-14.5-14.5c-1-1-1-2.6,0-3.5c1-1,2.6-1,3.5,0l14.5,14.5
                                        c1,1,1,2.6,0,3.5C-169.1,440-169.7,440.2-170.3,440.2z"/>
                                </g>
                            </g>
                        </g>
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