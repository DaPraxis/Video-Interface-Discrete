import React, {Component} from "react";
import { storyCollection } from "../drivingText";
import {Card, Col, Row, Badge} from 'react-bootstrap'

export default class StoryBoard extends Component{

    state = {
        video:''
    }

    componentDidMount(){
        // this.setState({video:this.props.video})
    }

    render(){
        return(
            <div 
            // style={{margin:'5% 10% 5% 10%'}}
            style={{marginBottom:'3%'}}
            >
                <Row xs={1} md={this.props.width} className="g-4">
                {Array.from({ length: storyCollection[this.props.video]['texts'].length }).map((_, idx) => (
                    <Col>
                    <Card border="secondary">
                        <Card.Img variant="top" src={require("../Images/storyBoard/"+this.props.video+'-'+(idx+1)+'.png')} />
                        <Card.Body>
                            <Card.Title>
                                <Badge bg="primary" style={{margin:'10px'}}>{idx+1}</Badge></Card.Title>
                            <Card.Text style={{fontFamily:'Calibri, sans-serif', fontSize:"22px"}}>
                                {storyCollection[this.props.video]['texts'][idx]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </div>
        )
    }
}
