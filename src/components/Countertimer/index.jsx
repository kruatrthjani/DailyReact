import { useEffect, useState } from "react"



export default function CounterTimer() {
    const [timer, setTimer] = useState(0)
    const [stTimer, setStTimer] = useState(false)

    useEffect(() => {
        console.log('timer -=> ', timer);
        let intervalId;
        if (stTimer === true) {
            intervalId = setInterval(() => {
                setTimer((timer) => timer + 1)
                console.log("timer=", stTimer)
            }, 1000);
        }
        else {
            clearInterval(intervalId);
        }


        return () => clearInterval(intervalId);

    }, [stTimer])

    const timerSetter = (type) => {
        switch (type) {
            case 'start': {
                setTimer(timer + 1)
                break;
            }
            case 'stop': {
                setStTimer(false)
                setTimer(timer)
                break;
            }
            case 'reset': {
                setTimer(0)
                setStTimer(false);
                break;
            }
            default: {
                setTimer(0);
                setStTimer(false)
                break;
            }
        }
        // if (type === "start") {
        //     setTimer(timer + 1)
        // }
        // else if (type === "stop") {
        //     setStTimer(false)
        //     setTimer(timer)
        //     console.log(stTimer)
        // }
        // else if (type === "reset") {
        //     setTimer(0)
        //     setStTimer(false);
        // }
        // else {
        //     setTimer(0);
        //     setStTimer(false)
        // }
    }

    const modifyTime = (time) => {
        setStTimer(time)
        console.log("time=,", time)
        if (time === true) {
            timerSetter("start")
        }
        else {
            timerSetter("stop")
        }
    }


    return (
        <>
            <p>{timer}</p>
            <button onClick={() => modifyTime(!stTimer)}>{stTimer ? 'pause' : 'start'}</button>
            <button onClick={() => { timerSetter("reset"); setStTimer(false) }}>reset</button>
        </>
    )
}