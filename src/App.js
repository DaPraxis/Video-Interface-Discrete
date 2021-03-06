import './App.css';
import React from 'react'
import MultiStepForm from './pages/MultiStepForm';
// import InstructionPage from './pages/InstructionPage';
import VideoPlay from './Components/VideoPlay'
import FinalPage from './pages/FinalPage';
import RSMESlider from './Components/RSME_Slider';
import Instruction from './pages/Instruction';
import Protocal from './pages/Protocal';
// import Route from './Centivizer/routes'
import Quate from './pages/Quate'
import GameRoutes from './GameRoutes'
import ResearchBlock from './pages/ResearchBlock';
class App extends React.Component {
  constructor(props) {
      super(props);
  }

  state = {
    page: 1,
    videoNames:[],
    shuffledIndex:[],
    wl:{},
    basicInfo:{}
  }

//   nextPage = () => {
//       const { page } = this.state
//       this.setState({
//           page : page + 1
//       })
//   }

//   getData = (videoNames, shuffledIndex, wl) => {
//     this.setState({
//         videoNames: videoNames,
//         shuffledIndex: shuffledIndex,
//         wl:wl
//     })
//   }

//   getData2 = (inputValues) =>{
//     this.setState({
//         basicInfo:inputValues
//     })
//   }

  render() {
      const {page} = this.state;
      const inputValues = {page};
      var content
      // console.log(isEmpty)
      switch(page) {
            case 1:
            //     content = <Protocal nextPage={this.nextPage}/>
            //     break
            // case 2:
            //     // content = <MultiStepForm nextPage={this.nextPage} getData={this.getData2}/>
                // content = <Instruction nextPage={this.nextPage}/>

                content = <GameRoutes/>
                // content = <ResearchBlock/>
                // content = <Quate/>
                // content = <CheckBoxGroup video="3-10"/>
                break
            // case 3:
            //     content = <Instruction nextPage={this.nextPage}/>
            //     break
            // case 4:
            //     content = <VideoPlay nextPage={this.nextPage} getData={this.getData}/>
            //     break
            // case 5:
            //     content = <FinalPage names = {this.state.videoNames} index={this.state.shuffledIndex} wl={this.state.wl} basicInfo={this.state.basicInfo}/>
            //     break
            // case 6:
            //     content = <GameRoutes nextPage={this.nextPage}/>
            //     break
        }
    return(
        <div className="App">
            {content}
        </div>
    )
  }
}

export default App;
