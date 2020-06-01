import React, { Component } from 'react'

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import './style/Query.css'

class Query extends Component {

    render() {
        
        return (
            <div>
                <InputGroup 
                    id="Query">
                    <InputGroup.Prepend>
                    <InputGroup.Text 
                        id="inputGroup-sizing-sm">
                        >
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        id="query"
                        placeholder="MTBProject UserID"
                        aria-label="Small" 
                        aria-describedby="inputGroup-sizing-sm" />
                    <InputGroup.Append>
                        <Button 
                            variant="outline-secondary" 
                            onClick={this.props.buttonClick}>
                            Button
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}

export default Query