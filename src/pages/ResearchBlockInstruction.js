import React from "react";
import {Carousel, Container, Button, Card, CardGroup} from "react-bootstrap"
import stp from "../Images/13stp.png"
import { Redirect } from "react-router-dom";



class ResearchBlockInstruction extends React.Component {
    state={
        confirm:false
    }
    render(){
        return(
            <Container className="my-auto d-grid gap-3" style={{width:'70%', justifyContent:'space-between', padding:"3% 0%"}} >
                <CardGroup style={{display:'flex'}}>
                    <Card style={{maxWidth:'400px'}}>
                        <Card.Header>Driving Scenario Workload Video Rating Instruction</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                1. Please watch/read the driving scenario (There are 16 scenarios).
                            </Card.Text>
                            <Card.Text>
                                2. Rate the mental workload<span style={{color:'red'}}>*</span> you will feel in the situation (i.e., how much attention you need pay?) using the slider (0: no workload – 100: very great workload)
                            </Card.Text>
                            <Card.Text>
                                3. Select up to <span style={{color:'red', fontWeight:'bold'}}>3</span> most important the source of the mental workload<span style={{color:'red'}}>**</span> from the options (you can choose multiple options)
                            </Card.Text>
                            <Card.Text>
                                4. If necessary, replay the video or go to next one.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'70%'}}>
                        <Card.Body>
                        <Card.Img src={stp}/>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <span style={{color:'red'}}>*</span>Mental Workload often refers to the amount of thinking and planning on a certain taskload. For example, you would feel higher mental workload when mentally calculating 17x24 than 2x3.
                        </Card.Text>
                        <Card.Text>
                            <span style={{color:'red'}}>**</span>Factors which you think contribute to the mental workload
                        </Card.Text>
                        <Button variant="primary" onClick={
                            (e)=>{
                                e.preventDefault()
                                this.setState({confirm:true})
                            }
                        }>Start</Button>
                        {this.state.confirm?<Redirect to={'/ResearchBlock'} push /> : <></>}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
export default ResearchBlockInstruction