import React from "react";
import {Card, Container, Button, Col, Row, Accordion, CardGroup, useAccordionButton} from "react-bootstrap"
import protocol_text from "../protocol.txt"
import Footer from "../Components/Footer"
import { Redirect } from "react-router-dom";
import sp from '../Images/procedures.png'
import videoIll from '../Images/video-ill.png'
import storyIll from '../Images/storyboard-ill.png'

import { randomState } from "../drivingText";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ margin: '0px 10px' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

class Protocal extends React.Component {

    state = {
        texts:[],
        checked:false,
        redirect:false
    }

    componentDidMount(){
        var texts = []
        fetch(protocol_text)
        .then(r => r.text())
        .then(text => {
            var tet = text.split('\r\n')
            if (tet.length<=2){
                tet = text.split('\n')
            }
            if (tet.length<=2){
                tet = text.split('\r')
            }
            for (const str of tet){
                if (str.length>2){
                    var ssp = str.split(/\[([^\]]+)\]/)
                    var s = []
                    for (let i=0; i<ssp.length; i++){
                        if ((i+1)%2==0){
                            s.push(<span style={{backgroundColor: "yellow"}}>{ssp[i]}</span>)
                        }
                        else{
                            s.push(ssp[i])
                        }
                    }
                    texts.push(<p>{s}</p>)
                    texts.push(<br></br>)
                }
            }
            this.setState({texts:texts})
        });
        
    }
        
    render(){
        return(
            <Container className="my-auto" 
                style={{
                padding: '1% 3% 10% 3%',
                justifyContent: 'center',
                alignItems: "center",
            }}>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Experiment Summary</Accordion.Header>
                        <Accordion.Body>
                            <CardGroup style={{display:'flex'}}>
                                <Card style={{maxWidth:'550px'}}>
                                    {/* <Card.Header>Driving Scenario Workload Video Rating Instruction</Card.Header> */}
                                    <Card.Body>
                                        <Card.Text>
                                            <li>Welcome to our online study. It consists of the four steps shown on the right.</li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Please take a break when you feel you need to do. </li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>This experiment should take around 30-45 minutes. </li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Please use a computer or tablet (not a smartphone) to watch videos during the experiment.</li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Expand the tab below or click on the next button to find the detail of study protocol below. Please read it and check the consent box in the bottom when you agree to proceed. 
                                            </li>
                                        </Card.Text>
                                            <li><CustomToggle eventKey="1">Next</CustomToggle></li>
                                    </Card.Body>
                                </Card>
                                <Card style={{width:'60%'}}>
                                    <Card.Body>
                                    <Card.Img src={randomState?storyIll:videoIll}/>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Detailed Study Protocol: A Letter To Our Participants</Accordion.Header>
                        <Accordion.Body>
                            <Card key="light">
                                <Card.Body>
                                    {/* <Card.Header>Experiment Consent</Card.Header> */}
                                    <Card.Title>
                                        Online Subjective Mental Workload Measurement Using Simulated Driving Scenarios
                                    </Card.Title>
                                    <Card.Text style={{fontFamily:'Calibri, sans-serif', fontSize:"20px"}}>
                                        {this.state.texts}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Footer>
                                <Container>
                                    <Row>
                                        {/* <Col md={9}>
                                        <input type="checkbox" checked={this.state.checked} 
                                            onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                                        </input> I certify that I agree to attend this experiment and willing to share my data to the IML Lab
                                        </Col>
                                        <Col>
                                            {this.state.checked?<Button variant="primary" onClick={(e)=>{e.preventDefault();this.setState({redirect:true})}}>Start Experiment</Button>:null}
                                        </Col> */}
                                        <Col>
                                            <Button variant="primary" onClick={(e)=>{e.preventDefault();this.setState({redirect:true})}}>I Consent</Button>
                                        </Col>
                                        <Col md={9}>
                                        </Col>
                                        {this.state.redirect?<Redirect to={'/demo'} push /> : <></>}
                                    </Row>
                                </Container>
                            </Footer>  
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        );
    }

}

export default Protocal;