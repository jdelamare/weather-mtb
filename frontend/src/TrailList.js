import React, { Component } from 'react';

import Card from 'react-bootstrap/Card'

// [API DATA GOES HERE].map((variant, idx) => (
//     <>
//       <Card
//         border={variant.toLowerCase()}
//         key={idx}
//         text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
//         style={{ width: '18rem' }}
//       >
//         <Card.Header>Header</Card.Header>
//         <Card.Body>
//           <Card.Title>{variant} Card Title </Card.Title>
//           <Card.Text>
//           </Card.Text>
//         </Card.Body>
//       </Card>
//       <br />
//     </>
//   ));

class TrailList extends Component {
    constructor() {
        super()
        this.state = {
            trails: []
        }
        // initially go out and get the API data
        // need to bind the event handler when a user input's their userid
    }


    // don't forget that if a subscription is created here it'll need to be uncreated
    componentDidMount() {
        let url = "get_trails";  // Where the hell does the rest of the URL go??
        fetch(url, {
            headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(_trails => this.setState( {
                trails: _trails
            }))
            .catch(error => console.log("Request failed", error))
    }

    render() {
        return (
            <div>
                {this
                .state
                .trails
                .map((trail, idx) => (
                    <>
                        <Card>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Card Title </Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        <br />
                    </>
                ))}
            </div>
        )
    }
}

export default TrailList

    // TODO: Big current issue here, need to enable CORS since I'm getting a 403?
    // getTrailData() {
    // }
        

    // createJSX() {
    //     let trails = this.getTrailData();
    //     //let trails = this.state.trails
    //     console.log(trails) 
    //     let jsx = this.state.trails.map((variant, idx) => (
    //         <>
    //             <Card
    //                 border={variant.toLowerCase()}
    //                 key={idx}
    //                 text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
    //                 style={{ width: '18rem' }}
    //             >
    //                 <Card.Header>Header</Card.Header>
    //                 <Card.Body>
    //                 <Card.Title>{variant} Card Title </Card.Title>
    //                 <Card.Text>
    //                 </Card.Text>
    //                 </Card.Body>
    //             </Card>
    //             <br />
    //         </>
    //     ));
        
//         return jsx;
//     }
// }