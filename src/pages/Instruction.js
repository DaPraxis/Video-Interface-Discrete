import React from "react";
import {Carousel, Container, Button} from "react-bootstrap"
import fstp from "../Images/1stp.png"
import fstp2 from "../Images/2stp.png"
import fstp3 from "../Images/3stp.png"
import fstp4 from "../Images/4stp.png"
import fstp5 from "../Images/5stp.png"
import fstp6 from "../Images/6stp.png"
import fstp11 from "../Images/11stp.png"



class Instruction extends React.Component {

    render(){
        return(
            <Container>
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={fstp}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                        <h5>Simulated Driving Videos</h5>
                        <p>Next, you will watch about 30 simulated driving videos, each 10-15s long, and you are required to rate the  
                            <span style={{color:'red'}}> Driving Mental Workload</span> for each driving scenario. </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp11}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h5>Driving Mental Workload</h5>
                        <p><span style={{color:'red'}}> Mental Workload</span> is similar to attention, often refers to <span style={{backgroundColor:'yellow'}}> the amount of thinking and planning on a certain taskload</span>.
                        For example, you need more mental workload when mentally calculating 17x24 than 2x3. <br></br> Similarly, with the given driving scenario, we want you to rate 
                        how much mental effort or attention you need to carry out based on your driving experiences</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp2}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h5>Driving Mental Workload Rating</h5>
                        <p>You need to change the rating with the slider ranging 1-150 that circled in yellow</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp3}
                        alt="Fourth slide"
                        />
                        <Carousel.Caption>
                        <h5>Evaluation of Rating Scale Mental Effort (<a href={"https://adasgeek.wordpress.com/2013/12/19/rsme/"}>RSME</a>)</h5>
                        <p>We are using human factor RSME scale for the rating, with value 1-150 maps from "Absolute No Effort" to "Extreme Effort".
                             When you change the slider value, the meaning for the value will show in the yellow highlighted area for your reference 
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp4}
                        alt="Fifth slide"
                        />
                        <Carousel.Caption>
                        <h5>Video Replay</h5>
                        <p>For each video, you have <span style={{color:'red'}}> only one chance </span> to replay</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp5}
                        alt="Sixth slide"
                        />
                        <Carousel.Caption>
                        <h5>Next Video</h5>
                        <p>After rating the video on the slider, you can click the "Next" button to proceed to the next video. 
                            Noted that each video, <span style={{color:'red'}}>you only got one chance to rate</span>, and can <span style={{color:'red'}}>NEVER</span> go back. <span style={{color:'red'}}>Double check</span> your answer before click the "NEXT" button</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={fstp6}
                        alt="Seventh slide"
                        />
                        <Carousel.Caption>
                        <h5>Video Rating Progress</h5>
                        <p>You can check your experiment progress from the progress bar</p>
                        <Button variant="primary" onClick={this.props.nextPage}>Start</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
        )
    }
}
export default Instruction