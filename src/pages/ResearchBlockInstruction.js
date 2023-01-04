import React from "react";
import {Carousel, Container, Button, Card, CardGroup} from "react-bootstrap"
import stp from "../Images/13stp.png"
import videoIns from "../Images/video-ins.png"
import storyboardIns from "../Images/storyboard-ins.png"

import { Redirect } from "react-router-dom";
import {stage, incrementStage, randomState} from "../drivingText"



class ResearchBlockInstruction extends React.Component {
    state={
        confirm:false,
        isVideo:stage==randomState
    }
    componentDidMount(){
        incrementStage()
    }
    render(){
        return(
            <Container className="my-auto d-grid gap-3" style={{width:'70%', justifyContent:'space-between', padding:"3% 0%"}} >
                <CardGroup style={{display:'flex'}}>
                    <Card style={{maxWidth:'800px'}}>
                        <Card.Header>Driving Scenario Workload {this.state.isVideo?'Video':'Storyboard'} Rating Instruction</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                1. Please watch/read the driving {this.state.isVideo?'Video':'Storyboard'} (There are 12 scenarios).
                            </Card.Text>
                            <Card.Text>
                                2. Rate the mental workload<span style={{color:'red'}}>*</span> you will feel in the situation (i.e., how much attention you need pay?) using the slider (0: no workload – 100: very great workload)
                            </Card.Text>
                            <Card.Text>
                                3. Select the most important factors contribute to the mental workload, the system will warn you if you select too many
                            </Card.Text>
                            <Card.Text>
                                4. Give ratings to the following questions
                            </Card.Text>
                            <Card.Text>
                                5. {this.state.isVideo?'Feel free to replay the video if you need to check some of the options, ':'Please '}precede to the next {this.state.isVideo?'video':'storyboard'} with the Next button
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'50%'}}>
                        <Card.Body>
                        <Card.Img src={this.state.isVideo?videoIns:storyboardIns} style={{maxHeight:'600px',height:'auto', width:'auto'}}/>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <span style={{color:'red'}}>*</span>Mental Workload often refers to how mentally challenging a task is and how much you need to focus on it. For instance, a high mental workload
                            scenario would be: you are driving on a busy highway, while you need to make three lane changes within 100 meters to exit.
                        </Card.Text>
                        {/* <Card.Text>
                            <span style={{color:'red'}}>**</span>Factors which you think contribute to the mental workload
                        </Card.Text> */}
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