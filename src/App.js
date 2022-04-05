import './App.css';
import React from 'react'
import MultiStepForm from './pages/MultiStepForm';
import InstructionPage from './pages/InstructionPage';
import VideoPlay from './Components/VideoPlay'
class App extends React.Component {
  constructor(props) {
      super(props);
  }

  state = {
      page: 2,
  }

  nextPage = () => {
      const { page } = this.state
      this.setState({
          page : page + 1
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
          content = <VideoPlay nextPage={this.nextPage}/>
          break
      case 3:
          // content = <VideoPlayPage/>
          // content = <VideoPlayUserPage/>
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
