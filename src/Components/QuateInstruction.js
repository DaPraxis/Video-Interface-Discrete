import React from 'react'
import {Button, Card, Container} from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import stp from "../Images/7stp.png"

class QuateInstruction extends React.Component{
    render(){
        return(
            <Container className="my-auto" 
                    style={{
                    padding: '1% 5%',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                <Card>
                    <Card.Header>Driving Scenario Workload Text Rating Instruction</Card.Header>
                    <Card.Body>
                    <Card.Img src={stp}/>

                        <Card.Text>
                            In this section, you will be presented with text descriptions of several driving scenarios, and you will be asked to rate the 
                            driving workload required from the relevant driving scenarios based on your driving experiences.
                        </Card.Text>
                        <Card.Text>
                            <span style={{color:'red'}}> Mental Workload</span> is similar to attention, often refers to <span style={{backgroundColor:'yellow'}}> the amount of thinking and planning on a certain taskload</span>.
                            For example, you need more mental workload when mentally calculating 17x24 than 2x3. <br></br> Similarly, with the given driving scenario, we want you to rate 
                            how much mental effort or attention you need to carry out based on your driving experiences.
                        </Card.Text>
                        <Card.Text>
                            We use human factor Evaluation of Rating Scale Mental Effort (<a href={"https://adasgeek.wordpress.com/2013/12/19/rsme/"}>RSME</a>) scale for the rating, with value 1-150 mapping from "Absolute No Effort" to "Extreme Effort".
                            When you change the slider value, the corresponding interpretation of the value will show in the text area for your reference. 
                        </Card.Text>
                        <Button onClick={(e)=>{e.preventDefault();this.props.nextPage()}}>Start!</Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default QuateInstruction