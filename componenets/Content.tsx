"use client"

import { useRef } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Content = () => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioRefUk = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePlayUk = () => {
        if (audioRefUk.current) {
            audioRefUk.current.play();
        }
    };

    return (
        <>
            <Card className="wrapper">
                <div className="hint-ref" id="hint-ref"></div>
                <div id="user-input-section"></div>
                <div id="message"></div>
                <div id="letter-container"></div>
                <div className="source">The idea was taken from the Youtube channel <br /> <span>Coding Artist</span></div>
            </Card>

            <div className="controls-container" id="controls-container">
                <div id="result"></div>
                <div id="word"></div>
                <div id="unitName" className="unitName"></div>
                {/* VOICE */}
                <div className=' p-5 flex justify-center gap-5 flex-col hide' id='vocabAudio'>
                    {/* USA */}
                    <div className=' flex justify-center gap-5'>
                        <audio ref={audioRef} src={''} id='audioUsa' />
                        <img width="30" height="30" src="https://img.icons8.com/color/48/usa.png" alt="usa" />
                        <img width="30" height="30" src="/gif/voice.gif" alt="Cool Animation" className=' soundIcon'
                            onClick={handlePlay}
                            title="Play Sound" />
                    </div>
                    {/* UK */}
                    <div className=' flex justify-center gap-5'>
                        <audio ref={audioRefUk} src={''} id='audioUk' />
                        <img width="30" height="30" src="https://img.icons8.com/color/48/great-britain.png" alt="great-britain" />
                        <img width="30" height="30" src="/gif/voice.gif" alt="Cool Animation" className=' soundIcon'
                            onClick={handlePlayUk}
                            title="Play Sound" />
                    </div>
                </div>
                <div className="box flex justify-center">
                    <Button id="start">Start</Button>
                    <a href={""} id="linkNextUnit">
                        <Button className="hide" id="nextUnit">Next Unit</Button>
                        {/* <button className="hide" id="nextUnit">Next Unit</button> */}
                    </a>
                    <img src="/gif/Animation.gif" className='hide' width={'100%'} alt="sx" />
                </div>
            </div>
        </>
    )
}
export default Content;