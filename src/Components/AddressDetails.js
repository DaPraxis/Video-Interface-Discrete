import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';


export default class AddressDetails extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        if(e.target.checkValidity() && !(this.props.inputValues.driveYrs>100)){
            this.props.nextStep();
        }
    };

    ca_states = [
        <option value="AB">Alberta</option>,
        <option value="BC">British Columbia</option>,
        <option value="YT">Yukon</option>,
        <option value="NT">Northwest Territories</option>,
        <option value="NU">Nunavut</option>,
        <option value="NL">Newfoundland and Labrador</option>,
        <option value="PE">Prince Edward Island</option>,
        <option value="NS">Nova Scotia</option>,
        <option value="QC">Quebec</option>,
        <option value="ON">Ontario</option>,
        <option value="MB">Manitoba</option>,
        <option value="SK">Saskatchewan</option>,
    ]

    us_states = [
                <option value="AL">Alabama</option>,
                <option value="AK">Alaska</option>,
                <option value="AZ">Arizona</option>,
                <option value="AR">Arkansas</option>,
                <option value="CA">California</option>,
                <option value="CO">Colorado</option>,
                <option value="CT">Connecticut</option>,
                <option value="DE">Delaware</option>,
                <option value="DC">District Of Columbia</option>,
                <option value="FL">Florida</option>,
                <option value="GA">Georgia</option>,
                <option value="HI">Hawaii</option>,
                <option value="ID">Idaho</option>,
                <option value="IL">Illinois</option>,
                <option value="IN">Indiana</option>,
                <option value="IA">Iowa</option>,
                <option value="KS">Kansas</option>,
                <option value="KY">Kentucky</option>,
                <option value="LA">Louisiana</option>,
                <option value="ME">Maine</option>,
                <option value="MD">Maryland</option>,
                <option value="MA">Massachusetts</option>,
                <option value="MI">Michigan</option>,
                <option value="MN">Minnesota</option>,
                <option value="MS">Mississippi</option>,
                <option value="MO">Missouri</option>,
                <option value="MT">Montana</option>,
                <option value="NE">Nebraska</option>,
                <option value="NV">Nevada</option>,
                <option value="NH">New Hampshire</option>,
                <option value="NJ">New Jersey</option>,
                <option value="NM">New Mexico</option>,
                <option value="NY">New York</option>,
                <option value="NC">North Carolina</option>,
                <option value="ND">North Dakota</option>,
                <option value="OH">Ohio</option>,
                <option value="OK">Oklahoma</option>,
                <option value="OR">Oregon</option>,
                <option value="PA">Pennsylvania</option>,
                <option value="RI">Rhode Island</option>,
                <option value="SC">South Carolina</option>,
                <option value="SD">South Dakota</option>,
                <option value="TN">Tennessee</option>,
                <option value="TX">Texas</option>,
                <option value="UT">Utah</option>,
                <option value="VT">Vermont</option>,
                <option value="VA">Virginia</option>,
                <option value="WA">Washington</option>,
                <option value="WV">West Virginia</option>,
                <option value="WI">Wisconsin</option>,
                <option value="WY">Wyoming</option>,
    ]


    render() {
        return( <Container>
                    <Form onSubmit={this.saveAndContinue}>
                        <Row>
                            <Form.Group as={Col} controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control as="select" name="country" value={this.props.inputValues.country} onChange={this.props.handleChange}>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="CA">Canada</option>
                                    <option value="US">United State</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formState" required>
                                <Form.Label>Province</Form.Label>
                                <Form.Control as="select" name="state" value={this.props.inputValues.state} onChange={this.props.handleChange}>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    {this.props.inputValues.country=='US'?this.us_states:this.ca_states}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.city}
                                name="city"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="formAgeGroup">
                                <Form.Label>Age Group</Form.Label>
                                <Form.Control as="select" name="ageGroup" value={this.props.inputValues.ageGroup} 
                                    onChange={this.props.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="17-­25">17-­25 years</option>
                                    <option value="26­-35">26­-35 years</option>
                                    <option value="36­-45">36­-45 years</option>
                                    <option value="46­-55">46­-55 years</option>
                                    <option value="56­-65">56­-65 years</option>
                                    <option value=">65"> &gt;65 years</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" name="gender" value={this.props.inputValues.gender} 
                                    onChange={this.props.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="N.A.">Not Available</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formPlatform">
                                <Form.Label>Prolific ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={this.props.inputValues.platform}
                                        name="platform"
                                        required
                                        onChange={this.props.handleChange}
                                    />
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formDrivingYrs">
                                <Form.Label>How many years have you been driving (from the year you got your driving license)?</Form.Label>
                                <Form.Control type='number' name="driveYrs" value={this.props.inputValues.driveYrs} 
                                isInvalid={this.props.inputValues.driveYrs>100}
                                    onChange={this.props.handleChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid year
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formDrivingFreq">
                                <Form.Label>How frequent do you drive?</Form.Label>
                                <Form.Control as="select" name="driveFreq" value={this.props.inputValues.driveFreq} 
                                    onChange={this.props.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Almost every day">Almost every day</option>
                                    <option value="A few days a week">A few days a week</option>
                                    <option value="A few days a month">A few days a month</option>
                                    <option value="A few days a year">A few days a year</option>
                                    <option value="Very Rarely">Very Rarely</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formSkill">
                                <Form.Label>What is your driving skill?</Form.Label>
                                <RangeSlider min={1} max={10} name='skill' value={this.props.inputValues.skill} 
                                onChange={this.props.handleChange} tooltip='on' size="lg"/>
                                <Form.Label>I don't trust myself</Form.Label>
                                <Form.Label style={{float:'right'}}>I am the best</Form.Label>
                            </Form.Group>
                        </Row>

                        {/* <Button variant="secondary" style={{marginTop:"2%"}} onClick={this.back}>Back</Button>{' '} */}
                        <Button type="submit" variant="primary" style={{marginTop:"2%"}}>Next</Button>
                    </Form>
                </Container>
        );
    }
}