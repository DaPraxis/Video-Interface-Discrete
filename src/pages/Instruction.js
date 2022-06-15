import React from "react";
import {Carousel, Container, Button, Card} from "react-bootstrap"
import fstp from "../Images/1stp.png"
import fstp2 from "../Images/2stp.png"
import fstp3 from "../Images/3stp.png"
import fstp4 from "../Images/4stp.png"
import fstp5 from "../Images/5stp.png"
import fhstp4 from "../Images/4hstp.png"
import fstp6 from "../Images/6stp.png"
import fstp11 from "../Images/11stp.png"
//
import fsp from "../Images/1sp.png"
import fsp2 from "../Images/2sp.png"
import fsp3 from "../Images/3sp.png"
import fsp4 from "../Images/4sp.png"
import fsp5 from "../Images/5sp.png"
import fhsp4 from "../Images/4hsp.png"
import fsp6 from "../Images/6sp.png"
import fsp11 from "../Images/11sp.png"
import { Redirect } from "react-router-dom";



class Instruction extends React.Component {
    state={
        confirm:false
    }
    render(){
        return(
            <Container className="my-auto d-grid gap-3" style={{width:'70%', justifyContent:'space-between'}} >
                <Card.Title style={{
                margin: '1%',
                justifyContent: 'center',
                textAlign: "center",
                fontSize: '30px',
                fontWeight: 'bold'
                }}>Experiment Instruction</Card.Title>
                {/* <Carousel variant="dark" indicators={false}> */}
                    <Card>
                        <Card.Header>Step 1</Card.Header>
                        <Card.Img
                            className="d-block w-100"
                            src={fsp}
                            alt="First slide"
                        />
                        <Card.Body>
                        <Card.Title>Simulated Driving Videos</Card.Title>
                        <Card.Text>You are required to watch 30 simulated driving videos, each 10-15s long, and you will rate the  
                            <span style={{color:'red'}}> Driving Mental Workload</span> for each driving scenario. </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 2</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp11}
                        alt="Second slide"
                        />
                        <Card.Body>
                        <Card.Title>Driving Mental Workload</Card.Title>
                        <Card.Text><span style={{color:'red'}}> Mental Workload</span> is similar to attention, often refers to <span style={{backgroundColor:'yellow'}}> the amount of thinking and planning on a certain taskload</span>.
                        For example, you need more mental workload when mentally calculating 17x24 than 2x3. <br></br> Similarly, with the given driving scenario, we want you to rate 
                        how much mental effort or attention you need to carry out based on your driving experiences.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 3</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp2}
                        alt="Third slide"
                        />
                        <Card.Body>
                        <Card.Title>Driving Mental Workload Rating</Card.Title>
                        <Card.Text>You need to rate the video using the slider ranging from 1 to 150, which is circled in yellow.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 4</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp3}
                        alt="Fourth slide"
                        />
                        <Card.Body>
                        <Card.Title>Evaluation of Rating Scale Mental Effort (<a href={"https://adasgeek.wordpress.com/2013/12/19/rsme/"}>RSME</a>)</Card.Title>
                        <Card.Text>We use human factor RSME scale for the rating, with value 1-150 mapping from "Absolute No Effort" to "Extreme Effort".
                             When you change the slider value, the corresponding interpretation of the value will show in the yellow highlighted area for your reference. 
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 5</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp4}
                        alt="Fifth slide"
                        />
                        <Card.Body>
                        <Card.Title>Video Replay</Card.Title>
                        <Card.Text>For each video, click highlighted "Replay" button to replay.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 6</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fhsp4}
                        alt="Fifth-mid slide"
                        />
                        <Card.Body>
                        <Card.Title>Workload Demanding Sources On Road</Card.Title>
                        <Card.Text>For each video, you are also required to identify the source of workload demanding elements on the road by ticking the checkbox in the <span style={{backgroundColor:'#90EE90'}}>green area</span>, to further support your rating scores</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Step 7</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp5}
                        alt="Sixth slide"
                        />
                        <Card.Body>
                        <Card.Title>Next Video</Card.Title>
                        <Card.Text>After rating the video with the slider, you may click the "Next" button to proceed to the next video. 
                            Note that for each video, you only have <span style={{color:'red'}}>one chance</span> to rate, and <span style={{color:'red'}}>CANNOT</span> go back. Please <span style={{color:'red'}}>double check</span> your answer before clicking the "NEXT" button.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>Final Step</Card.Header>
                        <Card.Img
                        className="d-block w-100"
                        src={fsp6}
                        alt="Seventh slide"
                        />
                        <Card.Body>
                        <Card.Title>Video Rating Progress</Card.Title>
                        <Card.Text>You may check your experiment progress from the progress bar.</Card.Text>
                        <Button variant="primary" onClick={
                            (e)=>{
                                e.preventDefault()
                                this.setState({confirm:true})
                            }
                        }>Start</Button>
                        {this.state.confirm?<Redirect to={'/video'} push /> : <></>}
                        </Card.Body>
                    </Card>
            </Container>
        )
    }
}
export default Instruction