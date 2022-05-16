import React from 'react'
import {Table, Container, Row, Col, Button} from "react-bootstrap"
import axios from 'axios'

class FinalPage extends React.Component{

    state = {
        checked : false,
        key:"AIzaSyBOkz_2Xy7eULTirTSMQnwYaKUF5ienzW8",

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Video Index</th>
                            <th>Rated Workload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>

                </Table>
                <Container>
                    <Row>
                        <Col md={9}>
                        <input type="checkbox" checked={this.state.checked} 
                            onChange={(e)=>{this.setState({checked:e.target.checked})}}>
                        </input> I certify that I agree to attend this experiment and willing to share my data to the IML Lab
                        </Col>
                        <Col>
                            {this.state.checked?<Button variant="primary" onClick={this.submitOnClick}>Submit</Button>:null}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


    render(){
        return (this.constructTable())
    }
}

export default FinalPage;