import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class Confirmation extends Component{

    state = {
        confirm:false
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    next = (e)=> {
        e.preventDefault();
        var time={'DemogTime':Date.now()}
        this.props.getData({...this.props.inputValues, ...time})
        // this.props.nextPage()
        localStorage.setItem('stage',0)
        this.setState({confirm:true})
    }

    render(){
        const {inputValues: { firstName, lastName, email, city, state, country, ageGroup, gender, driveYrs, driveFreq, platform, skill}} = this.props;

        return(
            <Container>
                {/* <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Email: {email}</p> */}
                <p>City: {city}</p>
                <p>State/Province: {state}</p>
                <p>Country: {country}</p>
                <p>Age Group: {ageGroup}</p>
                <p>Gender: {gender}</p>
                <p>Years of Driving: {driveYrs}</p>
                <p>Frequency of Driving: {driveFreq}</p>
                <p>Survey Platform: {platform}</p>
                <p>Driving Skill: {skill}/10</p>
                <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
                <Button variant="primary" onClick={this.next}>Confirm</Button>
                {this.state.confirm?<Redirect to={'/ResearchBlockInstruction'} push /> : <></>}
            </Container>
        )
    }
}