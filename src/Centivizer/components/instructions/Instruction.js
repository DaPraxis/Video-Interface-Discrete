import React from 'react'
import Heros from './Heros'

export default function Instruction(props) {
    const img = localStorage.getItem('img');
    const ins = localStorage.getItem('ins');
    console.log(img);
    return (
        <Heros imgs={img} ins={ins}/>
    )
}