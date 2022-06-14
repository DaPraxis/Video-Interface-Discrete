import React from "react"
import { checkBoxs } from "../drivingText";
import Card from 'react-bootstrap/Card';

class CheckBoxGroup extends React.Component{
    constructor(props){
        super(props)
        var driver_init = []
        var dyn = []
        var stat = []
        var vids = checkBoxs[this.props.video]
        vids['dv'].map((k, i)=>{
            driver_init.push(false)
        })
        vids['env_dyn'].map((k, i)=>{
            dyn.push(false)
        })
        vids['env_static'].map((k, i)=>{
            stat.push(false)
        })
        this.state={
            driver:driver_init,
            dyn:dyn,
            static:stat,
            driver_c:vids['dv'],
            dyn_c:vids['env_dyn'],
            static_c:vids['env_static'],
            driver_t:"",
            dyn_t:"",
            static_t:""
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

    // isEmpty(){
    //     return this.state.driver.every((c)=>c==false) && this.state.dyn.every((c)=>c==false) && this.state.static.every((c)=>c==false)
    //     && this.state.driver_t.length==0 && this.state.dyn_t.length==0 && this.state.static_t.length==0
    // }

    render(){
        // this.props.isEmpty(this.isEmpty())
        return (
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
                    <Card.Header as="h5">{"Dynamic Environment"}</Card.Header>
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
                    <Card.Header as="h5">{"Static Environment"}</Card.Header>
                    <Card.Body>
                        {this.state.static.map((d, idx) => (
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={d}
                                        onChange={this.handleStaticChange(idx)}
                                        defaultChecked={d}
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
        )
    }
}

export default CheckBoxGroup;
