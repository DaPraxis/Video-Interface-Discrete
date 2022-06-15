import React from 'react'
import {Table, Container, Row, Col, Button, Toast, ToastContainer} from "react-bootstrap"
import axios from 'axios'
import Footer from "../Components/Footer"
import {randomState} from "../drivingText"
import {db} from '../Service/Firestore'
import { collection, addDoc } from "firebase/firestore"; 


class FinalPage extends React.Component{

    state = {
        checked : false,
        key:"AIzaSyBOkz_2Xy7eULTirTSMQnwYaKUF5ienzW8",
        text:"Almost there! Please tick the agreement checkbox and submit your response!"
    }

    submitOnClick = () => {
        const test = {
            
        }
        // axios.post(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media&key=${this.state.key}`, JSON.stringify(this.props.wl), {
        //     "name":"test.json"
        // })
        axios.post(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media&key=${this.state.key}`, JSON.stringify(test), {
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer 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"
                // "kind": "drive#file",
                // "id": "1mLDVuX-BwkRjVjpr12qThHzDMlQdqBtA",
                // "name": "ppp.txt",
                // "mimeType": "text/plain"
            }
        }).then((response) => {
            console.log(response.data)
        });
    }

    downloadFile = async () => {
        this.setState({
            text:"Congratulations, the study is done 🎉🎉🎉"
        })
        var newWl = {}
        for(var i=0;i<this.props.index.length;i++){
            var ind = this.props.index[i]
            var name = this.props.names[ind]
            var wl = this.props.wl[i] || null
            var sug = this.props.sug[name] || null
            newWl[name+'_video'] = {"workload":wl,"suggestions":sug}
        }
        for(var i=0;i<this.props.twl['name'].length;i++){
            var ind = this.props.twl['index'][i]
            var name = this.props.twl['name'][ind]
            var wl = this.props.twl['wl'][i] || null
            var cc = this.props.twl['cc'][name] || null
            newWl[name+'_text'] = {'workload':wl, 'suggestions':cc}
        }
        let num_keys_ls = localStorage.length - 2
        for (var i=0; i<num_keys_ls; i++){
            let game = JSON.parse(localStorage.getItem("__LOCALGAMEDATA"+i.toString()))
            game.holeLayout = null
            newWl["Game_"+game['name']] = game
        }
        newWl["ExpRandomState"] = randomState
        const fileName = "file";
        console.log(this.props.basicInfo)
        var v = {...newWl, ...this.props.basicInfo}
        const json = JSON.stringify(v);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        try {
            const docRef = await addDoc(collection(db, "tests"), v);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            this.setState({
                text:"There is a database connection error, please contact IML lab"
            })
          }
    }

    constructTable(){
        var table = []
        for(var i=0;i<this.props.index.length;i++){
            var ind = this.props.index[i]
            var name = this.props.names[ind]
            var wl = this.props.wl[i]
            if (wl==""){
                wl = <b><i><p style={{backgroundColor:"Tomato"}}>{"Empty"}</p></i></b>
            }
            table.push(
                <tr>
                    {/* <td>{name}</td> */}
                    <td>{i+1}</td>
                    <td>{wl}</td>
                </tr>
            )
        }
        return(
            <div style={{justifyContent: 'center',alignItems: "center",width: "65%", margin:"0 auto", padding: '50px'}}>
                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Video Index</th>
                            <th>Rated Workload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>

                </Table> */}
                {/* <h1>
                    {"Congratulations, the study is done 🎉"}
                </h1> */}
                <ToastContainer className="p-3" position='middle-center'>
                    <Toast>
                        <Toast.Header closeButton={false}>
                        {/* <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        /> */}
                        <strong className="me-auto">IML Lab</strong>
                        <small>1 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>{this.state.text}</Toast.Body>
                    </Toast>
                    </ToastContainer>
                <Footer>
                    <Container>
                        <Row>
                            <Col md={9}>
                            <input type="checkbox" checked={this.state.checked} 
                                onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                            </input> I certify that all the information entered is correct and I am willing to share my data to the IML Lab
                            </Col>
                            <Col>
                                {this.state.checked?<Button variant="primary" onClick={this.downloadFile}>Submit</Button>:null}
                            </Col>
                        </Row>
                    </Container>
                </Footer>
            </div>
        )
    }


    render(){
        return (this.constructTable())
    }
}

export default FinalPage;