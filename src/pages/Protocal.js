import React from "react";
import {Card, Container, Button, Col, Row, Accordion, CardGroup} from "react-bootstrap"
import protocol_text from "../protocol.txt"
import Footer from "../Components/Footer"
import { Redirect } from "react-router-dom";
import sp from '../Images/procedures.png'

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
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Experiment Summary</Accordion.Header>
                        <Accordion.Body>
                            <CardGroup style={{display:'flex'}}>
                                <Card style={{maxWidth:'550px'}}>
                                    {/* <Card.Header>Driving Scenario Workload Video Rating Instruction</Card.Header> */}
                                    <Card.Body>
                                        <Card.Text>
                                            <li>Welcome to our online study! It consists of the five steps shown in the right figure.</li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Please take a rest when you feel you need to do. </li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Total estimated time is 1-1.5 hours (including breaks). </li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>Please use a computer or tablet so that you can see the video image clearly (smartphone would be too small).</li>
                                        </Card.Text>
                                        <Card.Text>
                                            <li>You can find the detail of study protocol below. Please read it and check the consent box in the bottom when you agree to proceed.</li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width:'60%'}}>
                                    <Card.Body>
                                    <Card.Img src={sp}/>
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
                                        Online Subjective Mental Workload Measurement Using Simulated Driving Videos
                                    </Card.Title>
                                    <Card.Text style={{fontFamily:'Calibri, sans-serif', fontSize:"20px"}}>
                                        {this.state.texts}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Footer>
                    <Container>
                        <Row>
                            <Col md={9}>
                            <input type="checkbox" checked={this.state.checked} 
                                onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                            </input> I certify that I agree to attend this experiment and willing to share my data to the IML Lab
                            </Col>
                            <Col>
                                {this.state.checked?<Button variant="primary" onClick={(e)=>{e.preventDefault();this.setState({redirect:true})}}>Start Experiment</Button>:null}
                            </Col>
                            {this.state.redirect?<Redirect to={'/demo'} push /> : <></>}
                        </Row>
                    </Container>
                </Footer>
            </Container>
        );
    }

}

export default Protocal;