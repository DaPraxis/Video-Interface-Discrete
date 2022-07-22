import React, {Component} from "react";
import ReactPlayer from "react-player";
import axios from 'axios'
import { Card, Button, Form, Row, Col, Container, FormControl, InputGroup, DropdownButton, Dropdown, Offcanvas, FloatingLabel, ProgressBar} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import { Redirect } from "react-router-dom";
import {randomState, checkBoxs} from '../drivingText'
import CheckBoxGroup from "./CheckBoxGroup";
class VideoPlay extends Component{

    state = {
        playList:[],
        playListId:"PLHdq35Wa7ob9uRaqjq_hONEpV-acIwrTy",
        key:"AIzaSyDXNcHG8aLsd2AcsaKouG_tJWZQo5YVGm8",
        videoNames:[],
        videoLinks:[],
        videoCounter:0,
        videoTotal:0,
        shuffledIndex:[],
        videoEnd:false,
        playing:true,
        rangeMax:10,
        rangeMin:1,
        rangeValue:5,
        wl:{},
        wlValue:40,
        canvasShow:false,
        done:false,
        isEmpty:true,
        isBuffer:false,
        // canvasShow:true

        //video CheckBoxs
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

    componentDidMount() {
        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.state.playListId}&part=id,snippet&key=${this.state.key}&maxResults=50`)
            .then(res => {
                const playList = res.data;
                var len = playList.items.length;
                this.setState({playList: playList});
                var name=[]
                var link=[]
                var mem={}
                for (let i=0; i<len;i++){
                    name.push(playList.items[i].snippet.title)
                    link.push(playList.items[i].snippet.resourceId.videoId)
                    mem[i] = "";
                }
                this.setState({videoNames:name, videoLinks:link, videoTotal:len})
                var arr = shuffle([...Array(len).keys()])
                this.setState({shuffledIndex:arr})
                this.setState({wl:mem})
                this.initCheckBoxG(name[arr[0]])
        })
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

    handleEnd = () =>{
        this.setState({videoEnd:true})
        this.setState({canvasShow:true})
        // this.setState({videoEnd:true, videoCounter:this.state.videoCounter+1})
    }

    handleBtClickPre = () =>{
        var cur = this.state.videoCounter - 1;
        this.setState({videoCounter:cur})
        this.setState({videoEnd:false})
        this.setState({playing:true})
        this.handleClose()
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
        mem[this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]]] = 
        {'driver':sugg_driver,'dyn':sugg_dyn, 'static':sugg_static}
        this.setState({
            cc:mem
        })
    }

    handleBtClickNext = () =>{
        var cur = this.state.videoCounter + 1;
        if (cur<this.state.videoTotal){
            this.setState({videoCounter:cur})
        } 
        this.setState({videoEnd:false})
        this.setState({playing:true})
        this.handleClose()
        this.setState({isEmpty:true})
        this.recordData()
        this.initCheckBoxG(this.state.videoNames[this.state.shuffledIndex[cur]])
    }

    handleBtClickRep = () =>{
        this.setState({videoEnd:false})
        this.setState({playing:true})
        this.player.seekTo(0,true)
        this.handleClose()
    }


    buttonSelect = (e) =>{
        var mem = this.state.wl
        mem[this.state.videoCounter] = e
        this.setState({wl:mem})
    }

    rangeSelect = (e) =>{
        var mem = this.state.wl
        mem[this.state.videoCounter] = e.target.value
        this.setState({wl:mem, wlValue:e.target.value})
    }

    handleClose = () => this.setState({canvasShow:false});
    handleShow = () => this.setState({canvasShow:true});

    handleFinish = () => {
        // this.props.nextPage() 
        this.recordData()
        this.props.getData(this.state.videoNames, this.state.shuffledIndex, this.state.wl, this.state.cc, Date.now())
        this.setState({done:true})
    }

    setIsEmpty = (empty) =>{
        this.setState({isEmpty:empty})
    }

    mentalEffort(wl){
        if(wl>112){
            return "Extreme Effort: "+wl
        }
        else if (wl>102){
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

    render(){
        if (this.state.videoTotal>0){
            var progress = Math.round(((this.state.videoCounter+1)/this.state.videoTotal)*100)
            // var buttonDisable = (this.state.wl[this.state.videoCounter]=="") || (this.state.isEmpty)
            var buttonDisable = (this.state.wl[this.state.videoCounter]=="")
            console.log(this.state.isBuffer)

            // console.log(this.state.cc)

            return(
                <div>
                    <div style={{
                        backgroundColor:'black',
                        width:'100%',
                        height:'100%',
                        position: 'absolute',
                        zIndex:'10',
                        pointerEvents:'none'}}>
                        <div style={{ width: "100%", height: "85vh" }}>
                            <ProgressBar now={progress} label={`Rating Jobs: ${progress}%`} animated/>
                            <React
                                onBuffer={() => this.setState({ isBuffer: true })}
                                onPlay={() => this.setState({ isBuffer: false })}
                                width="100%"
                                height="100%"
                                muted = "true"
                                ref = {player => {
                                    this.player = player
                                }}
                                playing={this.state.playing}
                                onEnded = {this.handleEnd}
                                url={"https://youtu.be/"+this.state.videoLinks[this.state.shuffledIndex[this.state.videoCounter]]}
                                config={{
                                youtube: {
                                    playerVars: {
                                    iv_load_policy: 3,
                                    modestbranding: 1,
                                    rel: 0,
                                    showinfo: 0,
                                    controls: 0,
                                    autoplay:1,
                                    enablejsapi: 1
                                    }
                                }
                                }}
                            />
                        </div> 
                    </div>
                    {this.state.done?<Redirect to={randomState?'/texts':'/done'} push /> : <></>}
                    <Offcanvas show={this.state.canvasShow} onHide={this.handleClose} 
                                placement="bottom" backdrop={false} 
                                style={{justifyContent: 'center',alignItems: "center",height: "75%",zIndex:'20'}}>
                        <Offcanvas.Header>
                            <Offcanvas.Title>Video Driving Mental Workload Rating</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{justifyContent: 'center',alignItems: "center", fontFamily:'Calibri, sans-serif', fontSize:"20px"}}>
                            <InputGroup>
                                <FloatingLabel label="Video Driving Workload Level">
                                    <FormControl value={this.mentalEffort(this.state.wl[this.state.videoCounter])} style={{width:"300px", fontSize:"20px"}} readOnly/>
                                </FloatingLabel>
                                <div style={{minWidth:"700px", marginLeft:"30px"}}>
                                    <RangeSlider min={1} max={150} value={this.state.wlValue} onChange={this.rangeSelect} tooltip='on' size="lg"/>
                                </div>
                                
                            </InputGroup>
                            <br/>
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
                                                        value={d}
                                                        onChange={this.handleDriverChange(idx)}
                                                        defaultChecked={d}
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
                                    <Card.Header as="h5">{"Other Road Users"}</Card.Header>
                                    <Card.Body>
                                        {this.state.dyn.map((d, idx) => (
                                            <div>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={d}
                                                        onChange={this.handleDynChange(idx)}
                                                        defaultChecked={d}
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
                                    <Card.Header as="h5">{"Road Condition"}</Card.Header>
                                    <Card.Body>
                                        {this.state.static.map((d, idx) => (
                                            <div>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={d}
                                                        defaultChecked={d}
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
                                    <Button variant="outline-secondary" onClick={this.handleBtClickRep}>
                                        🔁Replay
                                    </Button>
                                    {this.state.videoCounter<this.state.videoTotal-1?
                                    // {this.state.videoCounter<1?
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
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            )
        }
        else{
            return ("error; video not found")
        }
    }
}

export default VideoPlay;
