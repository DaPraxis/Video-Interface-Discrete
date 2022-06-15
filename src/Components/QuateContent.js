import React from 'react'
import { drivingText, randomState, checkBoxs} from '../drivingText';
import {Card, Container, InputGroup, FloatingLabel, FormControl, Button, ProgressBar, Form, Row, Col} from 'react-bootstrap'
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
        done:false,
        // canvasShow:true

        driver:[],
        dyn:[],
        static:[],
        driver_c:[],
        dyn_c:[],
        static_c:[],
        driver_t:"",
        dyn_t:"",
        static_t:"",
        cc:{}
    }

    initCheckBoxG(videoName){
        var driver_init = []
        var dyn = []
        var stat = []
        var vids = checkBoxs[videoName]
        vids['dv'].map((k, i)=>{
            driver_init.push(false)
        })
        vids['env_dyn'].map((k, i)=>{
            dyn.push(false)
        })
        vids['env_static'].map((k, i)=>{
            stat.push(false)
        })
        this.setState({
            driver:driver_init,
            dyn:dyn,
            static:stat,
            driver_c:vids['dv'],
            dyn_c:vids['env_dyn'],
            static_c:vids['env_static'],
            driver_t:"",
            dyn_t:"",
            static_t:""
        })
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
        this.initCheckBoxG(name[arr[0]])
    }

    recordData(){
        var mem = this.state.cc
        var sugg_driver = []
        for (var i=0; i<this.state.driver.length; i++){
            if (this.state.driver[i]===true){
                sugg_driver.push(this.state.driver_c[i])
            }
        }
        if (this.state.driver_t.length>0){
            sugg_driver.push(this.state.driver_t)
        }
        var sugg_dyn = []
        for (var i=0; i<this.state.dyn.length; i++){
            if (this.state.dyn[i]===true){
                sugg_dyn.push(this.state.dyn_c[i])
            }
        }
        if (this.state.dyn_t.length>0){
            sugg_dyn.push(this.state.dyn_t)
        }
        var sugg_static = []
        for (var i=0; i<this.state.static.length; i++){
            if (this.state.static[i]===true){
                sugg_static.push(this.state.static_c[i])
            }
        }
        if (this.state.static_t.length>0){
            sugg_static.push(this.state.static_t)
        }
        mem[this.state.textNames[this.state.shuffledIndex[this.state.textCounter]]] = 
        {'driver':sugg_driver,'dyn':sugg_dyn, 'static':sugg_static}
        this.setState({
            cc:mem
        })
    }

    handleDriverChange = (idx) => (e) =>{
        const newD = this.state.driver.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
          });
        this.setState({ driver: newD });
    }

    handleDynChange = (idx) => (e) =>{
        const newD = this.state.dyn.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
          });
          
          this.setState({ dyn: newD });

    }

    handleStaticChange = (idx) => (e) =>{
        const newD = this.state.static.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
          });
          
          this.setState({ static: newD });
    }

    handleBtClickNext = () =>{
        var cur = this.state.textCounter + 1;
        if (cur<this.state.textTotal){
            this.setState({textCounter:cur})
        } 
        this.recordData()
        this.initCheckBoxG(this.state.textNames[this.state.shuffledIndex[cur]])
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
        this.recordData()
        this.props.getData({'name':this.state.textNames, 'index':this.state.shuffledIndex, 'wl':this.state.wl, 'cc':this.state.cc})
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
        // console.log(this.state.cc)
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
                            </InputGroup>
                            {/* <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer> */}
                            </blockquote>
                            <Form.Group as={Row}>
                            {/* <CheckBoxGroup video={this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]]}/> */}
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <Card style={{flex: 1}}>
                                        <Card.Header as="h5">{"Driver & Vehicle"}</Card.Header>
                                        <Card.Body>
                                            {this.state.driver.map((d, idx) => (
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={d}
                                                            onChange={this.handleDriverChange(idx)}
                                                            defaultChecked={false}
                                                        />
                                                        {this.state.driver_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.driver_t} onChange={(e)=>
                                                    {this.setState({driver_t:e.target.value});
                                                        // this.props.isEmpty(this.isEmpty())
                                                    }}/>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                    <Card style={{flex: 1}}>
                                        <Card.Header as="h5">{"Dynamic Environment"}</Card.Header>
                                        <Card.Body>
                                            {this.state.dyn.map((d, idx) => (
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={d}
                                                            onChange={this.handleDynChange(idx)}
                                                            defaultChecked={false}
                                                        />
                                                        {this.state.dyn_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.dyn_t} onChange={(e)=>
                                                    {this.setState({dyn_t:e.target.value});
                                                        // this.props.isEmpty(this.isEmpty())
                                                    }}/>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                    <Card style={{flex: 1}}>
                                        <Card.Header as="h5">{"Static Environment"}</Card.Header>
                                        <Card.Body>
                                            {this.state.static.map((d, idx) => (
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={d}
                                                            defaultChecked={false}
                                                            onChange={this.handleStaticChange(idx)}
                                                        />
                                                        {this.state.static_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.static_t} onChange={(e)=>
                                                    {this.setState({static_t:e.target.value});
                                                        // this.props.isEmpty(this.isEmpty())
                                                    }}/>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <br/>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col xs="3">
                                    {this.state.textCounter<this.state.textTotal-1?
                                    // {this.state.videoCounter<3?
                                        <Button variant="outline-secondary" onClick={this.handleBtClickNext} disabled={buttonDisable}>
                                            Next
                                        </Button>:
                                        <Button variant="outline-secondary" onClick={this.handleFinish} disabled={buttonDisable}>
                                            Finish
                                        </Button>
                                    }
                                </Col>
                                <Col xs="9">
                                </Col>
                            </Form.Group>
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
