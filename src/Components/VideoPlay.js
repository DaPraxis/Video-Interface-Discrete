import React, {Component} from "react";
import ReactPlayer from "react-player";
import axios from 'axios'


class VideoPlay extends Component{

    state = {
        playList:[],
        playListId:"PLHdq35Wa7ob8T3tlhIDr3o1dtuKFnuJwV",
        key:"AIzaSyDXNcHG8aLsd2AcsaKouG_tJWZQo5YVGm8",
        videoNames:[],
        videoLinks:[],
        videoCounter:0,
        videoTotal:0
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.state.playListId}&part=id,snippet&key=${this.state.key}&maxResults=50`)
          .then(res => {
            const playList = res.data;
            this.setState({playList: playList});
            var name=[]
            var link=[]
            for (let i=0; i<playList.items.length;i++){
                name.push(playList.items[i].snippet.title)
                link.push(playList.items[i].snippet.resourceId.videoId)
            }
            this.setState({videoNames:name, videoLinks:link, videoTotal:playList.items.length})
          })
      }


    render(){
        if (this.state.videoNames.length>0){
            console.log(this.state.videoLinks)
            console.log(this.state.videoNames)
        }
       
        return(
            <div>
                {/* <h1>Hello React Player</h1> */}
                <div style={{ width: "100%", height: "90vh" }}>
                    <ReactPlayer
                        controls
                        width="100%"
                        height="100%"
                        url={"https://youtu.be/"+this.state.videoLinks[this.state.videoCounter]}
                        config={{
                        youtube: {
                            playerVars: {
                            // listType: "playlist",
                            // list: "PLHdq35Wa7ob8T3tlhIDr3o1dtuKFnuJwV",
                            iv_load_policy: 3,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            muted: true
                            }
                        }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default VideoPlay;
