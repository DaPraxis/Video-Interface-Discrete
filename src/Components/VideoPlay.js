import React, {Component} from "react";
import ReactPlayer from "react-player";
import axios from 'axios'
import { Button, Form, Row, Col, Container, FormControl, InputGroup, DropdownButton, Dropdown, Offcanvas, FloatingLabel, ProgressBar} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import { Redirect } from "react-router-dom";
import {randomState} from '../drivingText'
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
        done:false
        // canvasShow:true
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

    handleBtClickNext = () =>{
        var cur = this.state.videoCounter + 1;
        if (cur<this.state.videoTotal){
            this.setState({videoCounter:cur})
        } 
        this.setState({videoEnd:false})
        this.setState({playing:true})
        this.handleClose()
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
        this.props.getData(this.state.videoNames, this.state.shuffledIndex, this.state.wl)
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
        if (this.state.videoTotal>0){
            var progress = Math.round(((this.state.videoCounter+1)/this.state.videoTotal)*100)
            var buttonDisable = this.state.wl[this.state.videoCounter]==""
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
                            <ReactPlayer
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
                                style={{justifyContent: 'center',alignItems: "center",height: "65%",zIndex:'20'}}>
                        <Offcanvas.Header>
                            <Offcanvas.Title>Video Driving Mental Workload Rating</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{justifyContent: 'center',alignItems: "center"}}>
                            <InputGroup>
                                <FloatingLabel label="Video Driving Workload Level">
                                    <FormControl value={this.mentalEffort(this.state.wl[this.state.videoCounter])} style={{width:"300px"}} readOnly/>
                                </FloatingLabel>
                                <div style={{width: 'inherit'}}>
                                    <RangeSlider min={1} max={150} value={this.state.wlValue} onChange={this.rangeSelect} tooltip='on' size="lg"/>
                                </div>
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
                            </InputGroup>
                            <Form.Group as={Row}>
                                <Col xs="9">
                                </Col>
                                <Col xs="3">
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
