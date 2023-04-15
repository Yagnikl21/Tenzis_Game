import React from "react";
import Die from "./Components/die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import "./app.scss"

export default function App() {
    const [dies, setDies] = React.useState(allNewDies)
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        var x = dies[0].number;
        var isOk = true;
        for (var i = 0; i < 10; i++) {
            if (dies[i].number !== x || dies[i].isHeld !== true) {
                isOk = false;
            }
        }
        if (isOk) {
            setTenzies(true)
            console.log("You Won !!!");
        }
    }, [dies])

    function allNewDies() {
        const DiesNumber = [];
        var i = 0;
        while (i < 10) {
            DiesNumber.push({
                number: Math.floor(((Math.random()) * 6) + 1),
                isHeld: false,
                id: nanoid()
            });
            i++;
        }
        return DiesNumber;
    }

    function createnewDie() {
        const newDie = {
            number: Math.floor(((Math.random()) * 6) + 1),
            isHeld: false,
            id: nanoid()
        }
        return newDie;
    }

    function newDies() {
        if(tenzies){
            setTenzies(false)
            setDies(allNewDies());
        }
        else{
        setDies(oldDies => oldDies.map((die) => {
            return die.isHeld ? die :
                createnewDie();
        }))
        }   
    }

    const value = dies.map((prop) =>
        <Die value={prop} onHold={HoldDie} key={prop.id} />
    )

    function HoldDie(id) {
        setDies(oldDies => oldDies.map((die) => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        })
        )
    }
    var button_val = "";
    if (tenzies) {
        button_val = "New Game";
    }
    else
        button_val = "Roll"
    return (
        <div className="main">
            {tenzies &&<Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {value}
            </div>
            <button className="roll" onClick={newDies}>{button_val}</button>
            
        </div>
    )
}