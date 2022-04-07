import './App.css';
import React from 'react'
import MultiStepForm from './pages/MultiStepForm';
import InstructionPage from './pages/InstructionPage';
import VideoPlay from './Components/VideoPlay'
import FinalPage from './pages/FinalPage';
class App extends React.Component {
  constructor(props) {
      super(props);
  }

  state = {
      page: 1,
      videoNames:[],
      shuffledIndex:[],
      wl:{}
  }

  nextPage = () => {
      const { page } = this.state
      this.setState({
          page : page + 1
      })
  }

  getData = (videoNames, shuffledIndex, wl) => {
    this.setState({
      videoNames: videoNames,
      shuffledIndex: shuffledIndex,
      wl:wl
    })
  }

  render() {
      const {page} = this.state;
      const inputValues = {page};
      var content
      switch(page) {
      case 1:
          content = <MultiStepForm nextPage={this.nextPage}/>
          break
      case 2:
          content = <VideoPlay nextPage={this.nextPage} getData={this.getData}/>
          break
      case 3:
          content = <FinalPage names = {this.state.videoNames} index={this.state.shuffledIndex} wl={this.state.wl}/>
          break
      case 4:
          break
      }
      return(
          <div className="App">
              {content}
          </div>
      )
  }
}

export default App;
