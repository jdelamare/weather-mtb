import React, { Component } from 'react'

class Difficulty extends Component {
    
    // TODO Don't need these divs because <svg> is one JSX element

    render() {
        let difficulty = this.props.difficulty;
        if (difficulty === "green") 
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Green Circle" viewBox="0 0 599 599" width="30%" height="auto">
                        <circle id="green_circle" fill="#393" cx="300" cy="300" r="250"/>
                    </svg>
                </div>
            )
        }
        else if (difficulty === "blue")
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Blue Square" viewBox="0 0 600 600" preserveAspectRatio="none" width="30%" height="auto">
                        <rect id="blue_square" fill="#069" x="66" y="66" width="472" height="472"/>
                    </svg>
                </div>
            )
        }
        else if (difficulty === "blueBlack")
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Black Diamond" viewBox="0 0 599 599" width="30%" height="auto">
                        <rect id="blue_square" fill="#069" x="66" y="66" width="472" height="472"/>
                        <path id="black_diamond" fill="#000" d="M 300,66 L 536,300 L 300,536 L 66,300 L 300,66 z"/>
                    </svg>
                </div>
            )
        }
        else if (difficulty === "black") 
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Black Diamond" viewBox="0 0 600 600" width="30%" height="auto">
                        <path id="black_diamond" fill="#000" d="M 300,575 L 575,300 L 300,25 L 25,300 L 300,575 Z"/>
                    </svg>
                </div>
            )
        }
        else if (difficulty === "doubleBlack")
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Double Black Diamond" viewBox="0 0 599 599" width="30%" height="auto">
                        <path id="diamond_left" fill="#000" d="M 155,560 L 290,300 L 155,40 L 20,300 L 155,560 z"/>
                        <path id="diamond_right" fill="#000" d="M 445,40 L 580,300 L 445,560 L 310,300 L 445,40 z"/>
                    </svg>
                </div>
            )
        }
        else if (difficulty === "freeride") // TODO this could be an error
        {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Ski Trail Rating Symbols - Terrain Park" viewBox="0 0 599 599" width="30%" height="auto">
                        <rect id="terrain_park" styles="fill:#F90;stroke:#F90;stroke-width:100px;stroke-linecap:round;stroke-linejoin:round;" fill="#F90" x="100" y="225" width="400" height="150"/>
                    </svg>
                </div>
            )
        }
        else // returning nothing seems best
        {
            return (
                <div></div>
            )
        }
    }
}

export default Difficulty