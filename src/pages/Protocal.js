import React from "react";
import {Card, Container, Button, Col, Row} from "react-bootstrap"
import protocol_text from "../protocol.txt"
import Footer from "../Components/Footer"
import { Redirect } from "react-router-dom";

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
                            s.push(<span style={{color: "#ff0000"}}>{ssp[i]}</span>)
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
                padding: '5%',
                justifyContent: 'center',
                alignItems: "center",
            }}>
                <Card 
                    key="light"
                >
                    <Card.Body>
                        {/* <Card.Header>Experiment Consent</Card.Header> */}
                        <Card.Title>
                            Online Subjective Mental Workload Measurement Using Simulated Driving Videos
                        </Card.Title>
                        <Card.Text>
                            {this.state.texts}
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                        <Container>
                            <Row>
                                <Col md={9}>
                                <input type="checkbox" checked={this.state.checked} 
                                    onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                                </input> I certify that I agree to attend this experiment and willing to share my data to the IML Lab
                                </Col>
                                <Col>
                                    {this.state.checked?<Button variant="primary" onClick={this.props.nextPage}>Start Experiment</Button>:null}
                                </Col>
                            </Row>
                        </Container>
                    </Card.Footer> */}
                </Card>
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