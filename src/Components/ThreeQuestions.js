import React, {Component} from "react";
import {Card, Col, Row, Badge, Form} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';


export default class ThreeQuestions extends Component{

    render(){
        return(
            <div 
            // style={{margin:'5% 10% 5% 10%'}}
            style={{marginBottom:'3%'}}
            >
                <Card>
                    <Card.Header as="h5" style={{padding:"20px 10px"}}>📳If you are driving in this scenario, and you receive a message in your phone📲...
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Badge bg="primary" style={{margin:'10px'}}>{1}</Badge>Would you feel comfortable receiving a message notification (with a short notification <b>sound</b> 🔊) in this scenario? (respond with yes or no)
                            </Card.Title>
                        <Row>
                            <Form.Group as={Col} controlId="FormQ1" style={{maxWidth:'1000px'}}>
                                {/* <Form.Label>What is your driving skill?</Form.Label> */}
                                <RangeSlider min={1} max={10} name='Q1' 
                                value={this.props.inputValues.Q1} 
                                onChange={this.props.handleChange} 
                                tooltip='on' size="lg"/>
                                <Form.Label>Not comfortable</Form.Label>
                                <Form.Label style={{float:'right'}}>Very comfortable</Form.Label>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title>
                            <Badge bg="primary" style={{margin:'10px'}}>{2}</Badge> Would you feel comfortable to <b>hear</b> 🦻 message read out to you in this scenario (e.g., a short email or text message)?
                            </Card.Title>
                        <Row>
                            <Form.Group as={Col} controlId="FormQ2" style={{maxWidth:'1000px'}}>
                                {/* <Form.Label>What is your driving skill?</Form.Label> */}
                                <RangeSlider min={1} max={10} name='Q2' 
                                value={this.props.inputValues.Q2} 
                                onChange={this.props.handleChange} 
                                tooltip='on' size="lg"/>
                                <Form.Label>Not comfortable</Form.Label>
                                <Form.Label style={{float:'right'}}>Very comfortable</Form.Label>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title>
                            <Badge bg="primary" style={{margin:'10px'}}>{3}</Badge>Would you feel comfortable making a <b>verbal</b> 🗣️ response to a message in this scenario (e.g., someone sent you birthday wishes, and you spoke a response saying thank you and asking them how they are doing)?
                            </Card.Title>
                            <Row>
                        <Form.Group as={Col} controlId="FormQ3" style={{maxWidth:'1000px'}}>
                                {/* <Form.Label>What is your driving skill?</Form.Label> */}
                                <RangeSlider min={1} max={10} name='Q3' 
                                value={this.props.inputValues.Q3} 
                                onChange={this.props.handleChange} 
                                tooltip='on' size="lg"/>
                                <Form.Label>Not comfortable</Form.Label>
                                <Form.Label style={{float:'right'}}>Very comfortable</Form.Label>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}