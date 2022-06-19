import React from 'react'
import {Button, Card, Container, CardGroup} from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import stp from "../Images/8stp.png"

class QuateInstruction extends React.Component{
    render(){
        return(
            <Container className="my-auto" 
                    style={{
                    padding: '3% 5%',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <CardGroup style={{display:'flex'}}>
                        <Card style={{maxWidth:'400px'}}>
                            <Card.Header>Driving Scenario Workload Text Rating Instruction</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    1. Please read the driving scenario
                                </Card.Text>
                                <Card.Text>
                                    2. Rate the mental workload<span style={{color:'red'}}>*</span> you will feel in the situation (i.e., how much attention you need pay?) using the slider (0: very low – 150: extremely high)
                                </Card.Text>
                                <Card.Text>
                                    3. Select the source of the mental workload<span style={{color:'red'}}>**</span> from the options (you can choose multiple options)
                                </Card.Text>
                                <Card.Text>
                                    4. Go to next one
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
                            <Button onClick={(e)=>{e.preventDefault();this.props.nextPage()}}>Start!</Button>
                        </Card.Body>
                    </Card>
            </Container>
        )
    }
}

export default QuateInstruction