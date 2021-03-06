import React, { Component } from 'react';
import UserDetails from "../Components/UserDetails";
import AddressDetails from "../Components/AddressDetails";
import Confirmation from "../Components/Confirmation";
import {Card} from "react-bootstrap"

export default class MultiStepForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        step: 2,
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        state: '',
        country:'',
        ageGroup:'',
        gender: '',
        driveYrs: null,
        driveFreq: '',
        platform: '',
        skill: 2
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        const { step, firstName, lastName, email, city, state, country, ageGroup, gender, driveYrs, driveFreq, platform, skill } = this.state;
        const inputValues = { firstName, lastName, email, city, state, country, ageGroup, gender, driveYrs, driveFreq, platform, skill};
        var content
        var title
        var marginTop
        var subtitle
        switch(step) {
        case 1:
            content = <UserDetails
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
            title = "Registration Information"
            marginTop = "8%"
            break
        case 2:
            content = <AddressDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
            title = "Driving Practice"
            marginTop = "3%"
            break
        case 3:
            title = "Detail Confirmation"
            marginTop = "3%"
            subtitle = "Confirm if the following details are correct."
            content = <Confirmation
                    nextPage={this.props.nextPage}
                    prevStep={this.prevStep}
                    inputValues={inputValues}
                    getData = {this.props.getData}
                    />
            break
        }
        return(
            <Card style={{
                        "marginTop":marginTop,
                        minHeight: "70%",
                        "marginLeft":"auto", 
                        maxWidth: '70%', 
                        "marginRight":"auto"
                        }}>
                <Card.Header>{title}</Card.Header>
                <Card.Body style={{
                    padding: "3%"
                }}>
                    <Card.Title>
                        {subtitle}
                    </Card.Title>
                    {content}
                </Card.Body>
            </Card>
        )
    }
}
