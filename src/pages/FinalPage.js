import React from 'react'
import {Table, Container, Row, Col, Button, Toast, ToastContainer, InputGroup, Form, OverlayTrigger, Tooltip, FloatingLabel} from "react-bootstrap"
import axios from 'axios'
import Footer from "../Components/Footer"
import {randomState, randomIndex, trials} from "../drivingText"
import {db} from '../Service/Firestore'
import { collection, addDoc } from "firebase/firestore"; 

class FinalPage extends React.Component{

    state = {
        text: "Tick the agreement checkbox below and submit to complete the experiment",
        checked : false,
        show:false,
        feedback:'',
        submitForm:false,
        satisfaction: '',
        v1:'',
        v2:'',
        t1:'',
        t2:'',
        v3:'',
        tt:{}
    }

    resembleResource(){
        // var newWl = {}
        // if (this.props.index)
        //     {for(var i=0;i<this.props.index.length;i++){
        //         var ind = this.props.index[i]
        //         var name = this.props.names[ind]
        //         var wl = this.props.wl[i] || null
        //         var sug = this.props.sug[name] || null
        //         newWl[name+'_video'] = {"workload":wl,"suggestions":sug}
        //     }}
        // if (this.props.twl)
        //     {for(var i=0;i<this.props.twl['name'].length;i++){
        //         var ind = this.props.twl['index'][i]
        //         var name = this.props.twl['name'][ind]
        //         var wl = this.props.twl['wl'][i] || null
        //         var cc = this.props.twl['cc'][name] || null
        //         newWl[name+'_text'] = {'workload':wl, 'suggestions':cc}
        //     }}
        var newWl = {}
        newWl['workloads'] = this.props.allWl
        newWl["video_org"] = this.props.names
        let num_keys_ls = 3
        for (var i=0; i<num_keys_ls; i++){
            let game = JSON.parse(localStorage.getItem("__LOCALGAMEDATA"+i.toString()))
            if(game){
                game.holeLayout = null
                newWl["Game_"+game['name']] = game
            }
        }

        var newTrials = {}
        for (var k in trials){
            var isVideo = true
            newTrials[k] = []
            for (var j in trials[k]){
                if (isVideo){
                    newTrials[k].push(this.props.names[trials[k][j]]+'_video')
                }
                else{
                    newTrials[k].push(this.props.names[trials[k][j]]+'_text')
                }
                isVideo = !isVideo
            }
        }

        newWl["RatingRandomState"] = newTrials
        newWl["BrainRandomState"] = randomIndex
        newWl["PostTestQuestions"] = this.state.tt
        // newWl['VideoTime'] = this.props.videoT
        // newWl['TextTime'] = this.props.twl['time']
        console.log(this.props.basicInfo)
        var v = {...newWl, ...this.props.basicInfo}
        return v
    }

    downloadFile = async () => {
        this.setState({
            text:"Congratulations, the study is done 🎉🎉🎉"
        })
        
        var v = this.resembleResource()
        const json = JSON.stringify(v);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const fileName = "file";
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        try {
            const docRef = await addDoc(collection(db, "tests-pilot"), v);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            this.setState({
                text:"There is a database connection error, please contact IML lab"
            })
          }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
        var ne = {}
        ne[event.target.name] = event.target.value
        this.setState({tt:{...this.state.tt, ...ne}})
    }

    render(){
        return (
            <div style={{justifyContent: 'center',alignItems: "center",width: "80%", margin:"0 auto", padding: '50px'}}>
                <Container>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        if(e.target.checkValidity()){
                            this.setState({submitForm:true})
                        }
                        }}>
                            <blockquote className="blockquote mb-0">
                                <p style={{fontFamily:'Calibri, sans-serif', fontSize:"22px"}}>
                                    {' '}
                                    {'To what extent do you agree with the following statement:'}
                                    {' '}
                                </p>
                            </blockquote>
                            <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formV1">
                                <Form.Label> The driving videos are realistic and provide me the experience of what would happen in 
                                    that situation when I was actually driving </Form.Label>
                                <Form.Control as="select" name="v1" value={this.state.v1} 
                                    onChange={this.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Strongly disagree">Strongly disagree</option>
                                    <option value="Somewhat disagree">Somewhat disagree</option>
                                    <option value="Neither agree nor disagree">Neither agree nor disagree</option>
                                    <option value="Somewhat agree">Somewhat agree</option>
                                    <option value="Strongly agree">Strongly agree</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formT1">
                                <Form.Label>After reading each driving description text, I can imagine what it would be like to experience
                                    that actual situation while driving
                                </Form.Label>
                                <Form.Control as="select" name="t1" value={this.state.t1} 
                                    onChange={this.handleChange} required >
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Strongly disagree">Strongly disagree</option>
                                    <option value="Somewhat disagree">Somewhat disagree</option>
                                    <option value="Neither agree nor disagree">Neither agree nor disagree</option>
                                    <option value="Somewhat agree">Somewhat agree</option>
                                    <option value="Strongly agree">Strongly agree</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formV2">
                                <Form.Label>The situations shown in the videos like real driving situation that I could imagine experiencing while driving</Form.Label>
                                <Form.Control as="select" name="v2" value={this.state.v2} 
                                    onChange={this.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Strongly disagree">Strongly disagree</option>
                                    <option value="Somewhat disagree">Somewhat disagree</option>
                                    <option value="Neither agree nor disagree">Neither agree nor disagree</option>
                                    <option value="Somewhat agree">Somewhat agree</option>
                                    <option value="Strongly agree">Strongly agree</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formT2">
                                
                                <Form.Label>The situations shown in the driving description texts seem like real driving situation that I could imagine experiencing while driving</Form.Label>
                                <Form.Control as="select" name="t2" value={this.state.t2} 
                                    onChange={this.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Strongly disagree">Strongly disagree</option>
                                    <option value="Somewhat disagree">Somewhat disagree</option>
                                    <option value="Neither agree nor disagree">Neither agree nor disagree</option>
                                    <option value="Somewhat agree">Somewhat agree</option>
                                    <option value="Strongly agree">Strongly agree</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formV3">
                                <Form.Label>I feel like this experiment is neither too long nor too difficult</Form.Label>
                                <Form.Control as="select" name="v3" value={this.state.v3} 
                                    onChange={this.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="Strongly disagree">Strongly disagree</option>
                                    <option value="Somewhat disagree">Somewhat disagree</option>
                                    <option value="Neither agree nor disagree">Neither agree nor disagree</option>
                                    <option value="Somewhat agree">Somewhat agree</option>
                                    <option value="Strongly agree">Strongly agree</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <hr/>
                        <Row>
                            <Form.Group as={Col} controlId="formSatisfy">
                                    <Form.Label>How would you describe your satisfaction of our survey?</Form.Label>
                                    <Form.Control as="select" name="satisfaction" value={this.state.satisfaction} 
                                        onChange={this.handleChange} required>
                                        <option hidden value="">
                                            Select...
                                        </option>
                                        <option value="Very Satisfied">Very Satisfied</option>
                                        <option value="Satisfied">Satisfied</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                        <option value="Terrible">Terrible</option>
                                    </Form.Control>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Group as={Col} controlId="formFeedBack">
                                <FloatingLabel label={'Is there anything else you would like to tell us about your experience in this experiment?'}>
                                    <Form.Control as="textarea" aria-label="With textarea" value={this.state.feedback} 
                                    placeholder={'leave a comment here'}
                                    style={{minHeight:'100px'}}
                                        onChange={(e)=>{
                                            var t = this.state.tt
                                            t['feedback'] = e.target.value
                                            this.setState({
                                                feedback: e.target.value,
                                                tt:t
                                            })
                                        }}/>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>

                    <ToastContainer className="p-3" position='middle-center'>
                        <Toast show={this.state.submitForm} onClose={()=>{this.setState({submitForm:!this.state.submitForm})}}>
                            <Toast.Header closeButton={this.state.checked}>
                            <strong className="me-auto">IML Lab</strong>
                            <small>1 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>{this.state.text}</Toast.Body>
                        </Toast>
                        </ToastContainer>
                    {this.state.submitForm?
                        <Footer>
                        <Container>
                            <Row>
                                <Col md={9}>
                                <input type="checkbox" checked={this.state.checked} 
                                    onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                                </input> I certify that all the information entered is correct and I am willing to share my data to the IML Lab
                                </Col>
                                <Col>
                                    {this.state.checked?<Button variant="primary" onClick={this.downloadFile}>Confirm</Button>:null}
                                </Col>
                            </Row>
                        </Container>
                    </Footer>:<></>}
                </Container>
                
            </div>
        )
    }
}

export default FinalPage;