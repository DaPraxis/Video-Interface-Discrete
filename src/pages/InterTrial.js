import React from 'react'
import {Table, Container, Row, Col, Button, Card} from "react-bootstrap"
import Footer from "../Components/Footer"
import { Redirect } from "react-router-dom";

class InterTrial extends React.Component{

    state = {
        checked : false,
        session: 0
    }

    componentDidMount(){
        localStorage.setItem('gameReady', JSON.stringify(false))
        var s = JSON.parse(localStorage.getItem('stage')) || 0
        this.setState({session:s+1})
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({checked:true})
    }

    getSessionSeq(){
        switch(this.state.session){
            case 1:
                return 'first'
            case 2:
                return 'second'
            case 3:
                return 'third'
        }
    }

    
    render(){
        return(
            <div style={{justifyContent: 'center',alignItems: "center",width: "65%", margin:"0 auto", padding: '50px'}}>
                <Container className="p-3" position='middle-center'>
                    <Card>
                        <Card.Header closeButton={false}>
                        <strong className="me-auto">Section Instruction</strong>
                        </Card.Header>
                        <Card.Body>
                            <li>Let’s start the <span style={{color:'red'}}>{this.getSessionSeq()}</span> session.</li>
                            <li>It will start with a mini game. You will see how to play the game in the next page. Have fun!</li>
                            <li>After the game, you will be asked to rate various driving scenarios. Further instruction will be provided later.</li>
                        </Card.Body>
                    </Card>
                </Container>
                <Footer>
                    <Container>
                       <Button onClick={this.handleClick}>Starts Section</Button>
                    </Container>
                </Footer>
                {this.state.checked?<Redirect to={'/mainmenu'} push /> : <></>}
            </div>
        )
    }

}

export default InterTrial;