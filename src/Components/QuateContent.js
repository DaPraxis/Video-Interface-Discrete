import { ConnectionStates } from 'mongoose';
import React from 'react'
import { drivingText, randomState} from '../drivingText';
import {Card, Container, InputGroup, FloatingLabel, FormControl, Button, ProgressBar} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';

import { Redirect } from "react-router-dom";


class QuateContent extends React.Component{
    state = {
        textNames:[],
        textContent:[],
        textCounter:0,
        textTotal:0,
        shuffledIndex:[],
        rangeMax:10,
        rangeMin:1,
        rangeValue:5,
        wl:{},
        wlValue:40,
        canvasShow:false,
        done:false
        // canvasShow:true
    }

    componentDidMount() {
        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        var name = []
        var content = []
        drivingText.map((data, keyi)=>{
            for (var k in data){
                name.push(k)
                content.push(data[k])
            }
        })
        var len = name.length
        this.setState({textNames:name, textContent:content, textTotal:len})
        var arr = shuffle([...Array(len).keys()])
        var mem={}
            for (let i=0; i<len;i++){
                mem[i] = "";
            }
        this.setState({shuffledIndex:arr})
        this.setState({wl:mem})
    }

    handleBtClickNext = () =>{
        var cur = this.state.textCounter + 1;
        if (cur<this.state.textTotal){
            this.setState({textCounter:cur})
        } 
    }


    buttonSelect = (e) =>{
        var mem = this.state.wl
        mem[this.state.textCounter] = e
        this.setState({wl:mem})
    }

    rangeSelect = (e) =>{
        var mem = this.state.wl
        mem[this.state.textCounter] = e.target.value
        this.setState({wl:mem, wlValue:e.target.value})
    }

    handleFinish = () => {
        // this.props.nextPage() 
        this.props.getData({'name':this.state.textNames, 'index':this.state.shuffledIndex, 'wl':this.state.wl})
        this.setState({done:true})
    }

    mentalEffort(wl){
        if(wl>112){
            return "Extreme Effort: "+wl
        }
        else if (wl>111){
            return "Very Great Effort: "+wl
        }
        else if (wl>85){
            return "Great Effort: "+wl
        }
        else if (wl>71){
            return "Considerable Effort: "+wl
        }
        else if (wl>56){
            return "Rather Much Effort: "+wl
        }
        else if (wl>37){
            return "Some Effort: "+wl
        }
        else if (wl>25){
            return "A Little Effort: "+wl
        }
        else if (wl>11){
            return "Almost No Effort: "+wl
        }
        else if (typeof wl===undefined | typeof wl===null | wl==0){
            return "Select Workload from Slider"
        }
        else if (wl>0){
            return "Absolute No Effort: "+wl
        }
    }

    render(){
        if (this.state.textTotal>0){
            var progress = Math.round(((this.state.textCounter+1)/this.state.textTotal)*100)
            var buttonDisable = this.state.wl[this.state.textCounter]==""
            return(
                <Container className="my-auto" 
                    style={{
                    padding: '5%',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <ProgressBar now={progress} label={` Rating Jobs: ${progress}%`} animated/>
                    <Card>
                        <Card.Header>Driving Scenario Description</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                {this.state.textContent[this.state.shuffledIndex[this.state.textCounter]]}
                                {' '}
                            </p>
                            <InputGroup>
                                <FloatingLabel label="Driving Workload Level">
                                    <FormControl value={this.mentalEffort(this.state.wl[this.state.textCounter])} style={{width:"300px"}} readOnly/>
                                </FloatingLabel>
                                <div style={{width: 'inherit'}}>
                                    <RangeSlider min={1} max={150} value={this.state.wlValue} onChange={this.rangeSelect} tooltip='on' size="lg"/>
                                </div>
                                {this.state.textCounter<this.state.textTotal-1?
                                // {this.state.videoCounter<2?
                                    <Button variant="outline-secondary" onClick={this.handleBtClickNext} disabled={buttonDisable}>
                                        Next
                                    </Button>:
                                    <Button variant="outline-secondary" onClick={this.handleFinish} disabled={buttonDisable}>
                                        Finish
                                    </Button>
                                }
                            </InputGroup>
                            {/* <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer> */}
                            </blockquote>
                        </Card.Body>
                    </Card>
                    {this.state.done?<Redirect to={randomState?'/done':'/instruction'} push /> : <></>}
                </Container>
            )
        }
        else{
            return(<div>{"Text Description Invalid"}</div>)
        }
    }
}

export default QuateContent;
