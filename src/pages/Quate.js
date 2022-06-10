import React from 'react'

import { Redirect } from 'react-router-dom'
import QuateContent from '../Components/QuateContent'
import QuateInstruction from '../Components/QuateInstruction'

class Quate extends React.Component{

    constructor(props) {
        super(props);
    }
  
    state = {
        page:1,
    }

    nextPage = () => {
        const { page } = this.state
        this.setState({
            page : page + 1
        })
    }

    render(){
        var content;
        switch(this.state.page){
            case 1:
                content=<QuateInstruction nextPage={this.nextPage}/>
                break
            case 2:
                content=<QuateContent nextPage={this.nextPage} getData={this.props.getData}/>
                break
            case 3:
                content=<Redirect to='instruction' push />
        }
        return(
            <div>
                {content}
            </div>
        )
        }
}

export default Quate;