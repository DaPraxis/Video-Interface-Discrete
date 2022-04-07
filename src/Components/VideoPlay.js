import React, {Component} from "react";
import ReactPlayer from "react-player";
import axios from 'axios'
import { Button, Form, Row, Col, Container, FormControl, InputGroup, DropdownButton, Dropdown, Offcanvas, FloatingLabel} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import FormRange from "react-bootstrap/esm/FormRange";


class VideoPlay extends Component{

    state = {
        playList:[],
        playListId:"PLHdq35Wa7ob8T3tlhIDr3o1dtuKFnuJwV",
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
        canvasShow:false
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
        console.log('end')
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


    buttonSelect = (e) =>{
        var mem = this.state.wl
        mem[this.state.videoCounter] = e
        this.setState({wl:mem})
    }

    handleClose = () => this.setState({canvasShow:false});
    handleShow = () => this.setState({canvasShow:true});


    render(){
        if (this.state.videoTotal>0){
            return(
                <div>
                    <div style={{ width: "100%", height: "85vh" }}>
                        <ReactPlayer
                            controls
                            width="100%"
                            height="100%"
                            muted = "true"
                            ref = {player => {
                                this.player = player
                            }}
                            playing={this.state.playing}
                            // onStart = {this.setState({videoEnd:false})}
                            onEnded = {this.handleEnd}
                            url={"https://youtu.be/"+this.state.videoLinks[this.state.shuffledIndex[this.state.videoCounter]]}
                            config={{
                            youtube: {
                                playerVars: {
                                // listType: "playlist",
                                // list: "PLHdq35Wa7ob8T3tlhIDr3o1dtuKFnuJwV",
                                iv_load_policy: 3,
                                modestbranding: 1,
                                rel: 0,
                                showinfo: 0,
                                controls: 0,
                                autoplay:1
                                // enablejsapi: 0
                                }
                            }
                            }}
                        />
                    </div> 
                    <Offcanvas show={this.state.canvasShow} onHide={this.handleClose} 
                                placement="bottom" backdrop={false} 
                                style={{justifyContent: 'center',alignItems: "center",height: "45%"}}>
                        <Offcanvas.Header>
                            <Offcanvas.Title>Video Driving Mental Workload Rating</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{justifyContent: 'center',alignItems: "center"}}>
                            <InputGroup className="sm">
                                <DropdownButton title="Workload Level" onSelect={this.buttonSelect}>
                                    <Dropdown.Item eventKey="Extreme Workload">Extreme Workload</Dropdown.Item>
                                    <Dropdown.Item eventKey="High Workload">High Workload</Dropdown.Item>
                                    <Dropdown.Item eventKey="Medium Workload">Medium Workload</Dropdown.Item>
                                    <Dropdown.Item eventKey="Low Workload">Low Workload</Dropdown.Item>
                                </DropdownButton>
                                <FloatingLabel label="Video Driving Workload Level">
                                    <FormControl value={this.state.wl[this.state.videoCounter]} style={{width:"300px"}} readOnly/>
                                </FloatingLabel>
                                {this.state.videoCounter>0?
                                <Button variant="outline-secondary" onClick={this.handleBtClickPre}>
                                    Back
                                </Button>:null}
                                <Button variant="outline-secondary" onClick={this.handleBtClickNext}>
                                    Next
                                </Button>
                            </InputGroup>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            )
        }
    }
}

export default VideoPlay;
