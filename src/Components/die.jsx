import React from "react";
import "./die.scss";

export default function Die(prop) {
    const style = {
        backgroundColor: prop.value.isHeld ? "#59E391" : "#FFFFFF"
    }
    return(
        <div className="die" style={style} onClick={()=>prop.onHold(prop.value.id)}>
            <h3>{prop.value.number}</h3>
        </div>
    )
}