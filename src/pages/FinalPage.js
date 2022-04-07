import React from 'react'
import {Table} from "react-bootstrap"

class FinalPage extends React.Component{


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
                    <td>{name}</td>
                    <td>{wl}</td>
                </tr>
            )
        }
        return(
            <div style={{justifyContent: 'center',alignItems: "center",width: "65%", margin:"0 auto", padding: '50px'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Video Name</th>
                            <th>Workload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>

                </Table>
            </div>
        )
    }


    render(){
        return (this.constructTable())
    }
}

export default FinalPage;