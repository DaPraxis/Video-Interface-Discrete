import ReactSlider from "react-slider"
import React from "react"
import "./slider.css";


class RSMESlider extends React.Component{
    render(){
        return (
        <ReactSlider
                className="vertical-slider"
                markClassName="example-mark"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[30]}
                marks={10}
                // ariaLabel={['Lowest thumb', 'Middle thumb', 'Top thumb']}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                orientation="vertical"
                // invert
                pearling
                minDistance={10}
            />)
    }
}

export default RSMESlider