import React, {Component} from "react";
import ReactPlayer from "react-player";
import axios from 'axios'
import { Card, Button, Form, Row, Col, Container, FormControl, InputGroup, Alert, Dropdown, Offcanvas, FloatingLabel, ProgressBar, Toast, ToastContainer} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import { Redirect } from "react-router-dom";
import {randomState, checkBoxs, trials, drivingText} from '../drivingText'
import StoryBoard from "../Components/StoryBoard";
import CheckBoxGroup from "../Components/CheckBoxGroup";
class ResearchBlock extends Component{

    state = {
        playList:[],
        playListId:"PLHdq35Wa7ob_n4uMmIJ1bA221rjV_Q85j",
        key:"AIzaSyDXNcHG8aLsd2AcsaKouG_tJWZQo5YVGm8",
        videoNames:[],
        videoLinks:[],
        videoCounter:0,
        videoName:'',
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
        stage:JSON.parse(localStorage.getItem('stage')),
        videoReq:0, // number of replay clicked
        isBuffer:false, // if video is buffered
        keys:0, // rerender the videos
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
        cc:{},
        cBDisable:false,

        // combinator with texts
        isVideoNow:true,
        textContent:{}
    }

    componentDidMount() {
        console.log("Current Stage: "+this.state.stage)
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
                    var n = playList.items[i].snippet.title
                    if (n.split(' ').length==2){
                        var t = n.split(' ')[0]+'-'+n.split(' ')[1]
                        n = t
                    }
                    else if (n.split(' ').length==3){
                        var t = n.split(' ')[0]+'-'+n.split(' ')[1]+'-'+n.split(' ')[2]
                        n = t
                    }
                    name.push(n)
                    link.push(playList.items[i].snippet.resourceId.videoId)
                    mem[n+'_video'] = "";
                    mem[n+'_text'] = "";
                }
                // var arr = shuffle([...Array(len).keys()])
                var arr = trials[localStorage.getItem('stage')]
                this.setState({videoNames:name, videoLinks:link, videoTotal:arr.length})

                this.setState({shuffledIndex:arr})
                this.setState({wl:mem})
                this.initCheckBoxG(name[arr[0]])

                // text
                var d = {}
                drivingText.map((data, keyi)=>{
                    for (var k in data){
                        d[k] = data[k]
                    }
                })
                this.setState({textContent:d})
        })
    }

    initCheckBoxG(videoName){
        console.log(videoName)
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
            static_t:"",
            cBDisable:false
        })
    }

    handleEnd = () =>{
        this.setState({videoEnd:true})
        this.setState({canvasShow:true})
        // this.setState({videoEnd:true, videoCounter:this.state.videoCounter+1})
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
        mem[this.getName()] = 
        {'driver':sugg_driver,'dyn':sugg_dyn, 'static':sugg_static, 'time':Date.now(), 'wl':this.state.wlValue}
        if (this.state.isVideoNow){
            mem[this.getName()]['rep'] = this.state.videoReq
        }
        
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
        // console.log(this.state.wl)
        this.setState({isVideoNow:!this.state.isVideoNow})
        this.setState({videoReq:0})
    }

    handleBtClickRep = () =>{
        this.setState({videoEnd:false})
        this.setState({playing:true})
        this.player.seekTo(0,true)
        this.handleClose()
        this.setState({videoReq:this.state.videoReq+1})
        this.setState({keys:this.state.keys+1})
    }

    getName(){
        var name = this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]]
        if (this.state.isVideoNow){
            name = name + '_video'
        }
        else{
            name = name + '_text'
        }
        return name
    }


    buttonSelect = (e) =>{
        var mem = this.state.wl
        mem[this.getName()] = e
        this.setState({wl:mem})
    }

    rangeSelect = (e) =>{
        var mem = this.state.wl
        mem[this.getName()] = e.target.value
        this.setState({wl:mem, wlValue:e.target.value})
    }

    handleClose = () => this.setState({canvasShow:false});
    handleShow = () => this.setState({canvasShow:true});

    handleFinish = () => {
        // this.props.nextPage() 
        this.recordData()
        this.props.getData(this.state.videoNames, this.state.cc)
        this.setState({done:true})
        localStorage.setItem('gameReady', JSON.stringify(true))
        localStorage.setItem('gameGameReady', JSON.stringify(false))
        console.log('gamedata',this.state.cc)

    }

    setIsEmpty = (empty) =>{
        this.setState({isEmpty:empty})
    }

    mentalEffort(wl){
        if(wl>101){
            return "Extreme Effort: "+wl
        }
        else if (wl>84){
            return "Very High Effort: "+wl
        }
        else if (wl>70){
            return "Great Effort: "+wl
        }
        else if (wl>55){
            return "Considerable Effort: "+wl
        }
        else if (wl>37){
            return "Rather Much Effort: "+wl
        }
        else if (wl>25){
            return "Some Effort: "+wl
        }
        else if (wl>11){
            return "A Little Effort: "+wl
        }
        else if (wl>2){
            return "Almost No Effort: "+wl
        }
        else if (typeof wl===undefined | typeof wl===null | wl==0){
            return "Select Workload from Slider"
        }
        else if (wl>0){
            return "Absolute No Effort: "+wl
        }
    }

    getThreshold (){
        var c = this.state.driver_c.length + this.state.dyn_c.length + this.state.static_c.length + 3
        return Math.max(3, Math.ceil(c/2))  
    }

    handleDriverChange = (idx) => (e) =>{
        const newD = this.state.driver.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
          });
        this.setState({ driver: newD });
        if(this.countCB2(newD, this.state.dyn, this.state.static)>=this.getThreshold()){
            this.setState({cBDisable:true})
        }
        else{
            this.setState({cBDisable:false})
        }
    }

    handleDynChange = (idx) => (e) =>{
        const newD = this.state.dyn.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
          });
          
          this.setState({ dyn: newD });
        if(this.countCB2(this.state.driver,newD, this.state.static)>=this.getThreshold()){
            this.setState({cBDisable:true})
        }
        else{
            this.setState({cBDisable:false})
        }
    }

    handleStaticChange = (idx) => (e) =>{
        const newD = this.state.static.map((d, sidx) => {
            if (idx == sidx) return !d;
            return d
        });
        
        this.setState({ static: newD });

        if(this.countCB2(this.state.driver, this.state.dyn, newD)>=this.getThreshold()){
            this.setState({cBDisable:true})
        }
        else{
            this.setState({cBDisable:false})
        }
    }

    countCB(){
        var count = 0
        count = this.state.driver.reduce((partialSum, a) => partialSum + a, count)
        count = this.state.static.reduce((partialSum, a) => partialSum + a, count)
        count = this.state.dyn.reduce((partialSum, a) => partialSum + a, count)
        count = count + (this.state.driver_t.length>0) + (this.state.dyn_t.length>0) + (this.state.static_t.length>0)
        return count
    }

    countCB2(driver, dyn, stat){
        var count = 0
        count = driver.reduce((partialSum, a) => partialSum + a, count)
        count = stat.reduce((partialSum, a) => partialSum + a, count)
        count = dyn.reduce((partialSum, a) => partialSum + a, count)
        count = count + (this.state.driver_t.length>0) + (this.state.dyn_t.length>0) + (this.state.static_t.length>0)
        return count
    }

    countCB3(driver_t, dyn_t, static_t){
        var count = 0
        count = this.state.driver.reduce((partialSum, a) => partialSum + a, count)
        count = this.state.static.reduce((partialSum, a) => partialSum + a, count)
        count = this.state.dyn.reduce((partialSum, a) => partialSum + a, count)
        count = count + (driver_t.length>0) + (dyn_t.length>0) + (static_t.length>0)
        return count
    }

    render(){
        if (this.state.videoTotal>0){
            var progress = Math.round(((this.state.videoCounter+1)/this.state.videoTotal)*100)
            // var buttonDisable = (this.state.wl[this.state.videoCounter]=="") || (this.state.isEmpty)
            var buttonDisable = ((this.state.wl[this.getName()]=="")||(this.countCB()<=0))
            console.log(this.state.isBuffer)

            // VIDEO!
            if (this.state.isVideoNow){
                return(
                    <div>
                        <ToastContainer className="p-3" position='middle-center' style={{zIndex:'30'}}>
                        <Toast show={this.state.isBuffer} style={{zIndex:'30'}}>
                            <Toast.Header closeButton={false}>
                            {/* <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            /> */}
                            <strong className="me-auto">📶 Experiencing Poor Wifi?</strong>
                            {/* <small>11 mins ago</small> */}
                            </Toast.Header>
                            <Toast.Body>DON'T Refresh now, try   <Button variant="outline-secondary" onClick={this.handleBtClickRep}>Reload Video</Button></Toast.Body>
                        </Toast>
                        </ToastContainer>
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
                                    onBuffer={() => this.setState({ isBuffer: true })}
                                    onPlay={() => this.setState({ isBuffer: false })}
                                    ref = {player => {
                                        this.player = player
                                    }}
                                    key={this.state.keys}
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
                        {this.state.done?<Redirect to={this.state.stage>=3?'/done':'/interTrial'} push /> : <></>}
                        <Offcanvas show={this.state.canvasShow} onHide={this.handleClose} 
                                    placement="bottom" backdrop={false} 
                                    style={{justifyContent: 'center',alignItems: "center",height: "75%",zIndex:'20'}}>
                            <Offcanvas.Header>
                                <Offcanvas.Title>Video Driving Mental Workload Rating</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body style={{justifyContent: 'center',alignItems: "center", fontFamily:'Calibri, sans-serif', fontSize:"20px"}}>
                                <InputGroup>
                                    <FloatingLabel label="Video Driving Workload Level">
                                        <FormControl value={this.mentalEffort(this.state.wlValue)} style={{width:"300px", fontSize:"20px"}} readOnly/>
                                    </FloatingLabel>
                                    <div style={{minWidth:"700px", marginLeft:"30px"}}>
                                        <RangeSlider min={1} max={100} value={this.state.wlValue} onChange={this.rangeSelect} tooltip='on' size="lg"/>
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
                                                            disabled={this.state.cBDisable&&!d}
                                                            // defaultChecked={d}
                                                        />
                                                        {this.state.driver_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.driver_t} onChange={(e)=>
                                                    {this.setState({driver_t:e.target.value});
                                                    if(this.countCB3(e.target.value, this.state.dyn_t, this.state.static_t)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.driver_t.length>0)}/>
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
                                                            // defaultChecked={d}
                                                            disabled={this.state.cBDisable&&!d}
                                                        />
                                                        {this.state.dyn_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.dyn_t} onChange={(e)=>
                                                    {this.setState({dyn_t:e.target.value});
                                                    if(this.countCB3(this.state.driver_t, e.target.value, this.state.static_t)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.dyn_t.length>0)}/>
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
                                                            // defaultChecked={d}
                                                            onChange={this.handleStaticChange(idx)}
                                                            disabled={this.state.cBDisable&&!d}
                                                        />
                                                        {this.state.static_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.static_t} onChange={(e)=>
                                                    {this.setState({static_t:e.target.value});
                                                    if(this.countCB3(this.state.driver_t, this.state.dyn_t, e.target.value)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.static_t.length>0)}/>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                </div>
                                </Form.Group>
                                <Alert show={this.state.cBDisable}>Select up to <span style={{color:'red'}}>{this.getThreshold()}</span> most important source of the mental workload from the options.</Alert>
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
            // texts
            else{
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
                                {/* <p style={{fontFamily:'Calibri, sans-serif', fontSize:"22px"}}>
                                    {' '}
                                    {this.state.textContent[this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]]]}
                                    {' '}
                                </p> */}
                                {/* <br/> */}
                                {console.log(this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]])}
                                <StoryBoard video={this.state.videoNames[this.state.shuffledIndex[this.state.videoCounter]]} width={1}/>
                                <InputGroup>
                                    <FloatingLabel label="Driving Workload Level">
                                        <FormControl value={this.mentalEffort(this.state.wlValue)} style={{width:"300px", fontSize:"20px"}} readOnly/>
                                    </FloatingLabel>
                                    {/* <br/> */}
                                    <div style={{minWidth:"700px", marginLeft:"30px"}}>
                                        <RangeSlider min={1} max={100} value={this.state.wlValue} onChange={this.rangeSelect} tooltip='on' size="lg"/>
                                    </div>
                                </InputGroup>
                                {/* <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer> */}
                                </blockquote>
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
                                                            disabled={this.state.cBDisable&&!d}
                                                            // defaultChecked={d}
                                                        />
                                                        {this.state.driver_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.driver_t} onChange={(e)=>
                                                    {this.setState({driver_t:e.target.value});
                                                    if(this.countCB3(e.target.value, this.state.dyn_t, this.state.static_t)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.driver_t.length>0)}/>
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
                                                            // defaultChecked={d}
                                                            disabled={this.state.cBDisable&&!d}
                                                        />
                                                        {this.state.dyn_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.dyn_t} onChange={(e)=>
                                                    {this.setState({dyn_t:e.target.value});
                                                    if(this.countCB3(this.state.driver_t, e.target.value, this.state.static_t)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.dyn_t.length>0)}/>
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
                                                            // defaultChecked={d}
                                                            onChange={this.handleStaticChange(idx)}
                                                            disabled={this.state.cBDisable&&!d}
                                                        />
                                                        {this.state.static_c[idx]}
                                                    </label>
                                                </div>
                                            ))}
                                            <label> {"Others: "}
                                                <input style={{whiteSpace:'nowarp'}}type="text" value={this.state.static_t} onChange={(e)=>
                                                    {this.setState({static_t:e.target.value});
                                                    if(this.countCB3(this.state.driver_t, this.state.dyn_t, e.target.value)>=this.getThreshold()){
                                                        this.setState({cBDisable:true})
                                                    }
                                                    else{
                                                        this.setState({cBDisable:false})
                                                    }
                                                    }} disabled={this.state.cBDisable&&!(this.state.static_t.length>0)}/>
                                            </label>
                                        </Card.Body>
                                    </Card>
                                </div>
                                </Form.Group>
                                <Alert show={this.state.cBDisable}>Select up to <span style={{color:'red'}}>{this.getThreshold()}</span> most important source of the mental workload from the options.</Alert>
                                <Form.Group as={Row}>
                                    <br/>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col xs="3">
                                        {/* <Button variant="outline-secondary" onClick={this.handleBtClickRep}>
                                            🔁Replay
                                        </Button> */}
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
                            </Card.Body>
                        </Card>
                        {this.state.done?<Redirect to={this.state.stage>=3?'/done':'/interTrial'} push /> : <></>}
                    </Container>
                )
            }
        }
        else{
            return ("error; video not found")
        }
    }
}

export default ResearchBlock;
