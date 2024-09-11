"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
            <Card className=" absolute w-[90%] max-w-[40em] bg-gradient-to-br from-[#DDE4FF] to-[#8DA2EE] p-[5em_1em] sm:p-[5em_2em] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center rounded-3xl">
                <div className=" mb-4 text-black" id="hint-ref"></div>
                <div id="user-input-section"></div>
                <div id="message" className=" text-[#FE6873]"></div>
                <div id="letter-container" className="mt-8 space-y-2">
                </div>

                <div className=" text-center text-xl font-semibold translate-y-12">
                    The idea was taken from the Youtube channel <br />{" "}
                    <span className=" text-primaryColor">Coding Artist</span>
                </div>
            </Card>

            <div
                className=" bg-white absolute w-full h-full flex items-center justify-center flex-col gap-5 top-0 z-10"
                id="controls-container"
            >
                <div id="result" className=" text-[#282828]"></div>
                <div id="word" className=" text-primaryColor font-semibold my-4"></div>
                <div id="unitName" className=" my-2 text-primaryColor text-[24px] font-semibold"></div>

                {/* VOICE */}
                <div className=" p-5 flex justify-center gap-5 flex-col hidden" id="vocabAudio">
                    {/* USA */}
                    <div className=" flex justify-center gap-5">
                        <audio ref={audioRef} src={""} id="audioUsa" />
                        <img
                            width="30"
                            height="30"
                            src="https://img.icons8.com/color/48/usa.png"
                            alt="usa"
                        />
                        <img
                            width="30"
                            height="30"
                            src="/gif/voice.gif"
                            alt="Cool Animation"
                            className=" cursor-pointer"
                            onClick={handlePlay}
                            title="Play Sound"
                        />
                    </div>
                    {/* UK */}
                    <div className=" flex justify-center gap-5">
                        <audio ref={audioRefUk} src={""} id="audioUk" />
                        <img
                            width="30"
                            height="30"
                            src="https://img.icons8.com/color/48/great-britain.png"
                            alt="great-britain"
                        />
                        <img
                            width="30"
                            height="30"
                            src="/gif/voice.gif"
                            alt="Cool Animation"
                            className=" cursor-pointer"
                            onClick={handlePlayUk}
                            title="Play Sound"
                        />
                    </div>
                </div>

                <div className="box flex justify-center">
                    <Button
                        id="start"
                        className=" hover:bg-primaryColor h-full text-[1.2em] py-6 px-12 bg-primaryColor text-white border-none outline-none rounded-[2em] cursor-pointer"
                    >
                        Start
                    </Button>
                    <a href={""} id="linkNextUnit">
                        <Button
                            className=" hover:bg-primaryColor h-full text-[1.2em] py-6 px-12 bg-primaryColor text-white border-none outline-none rounded-[2em] cursor-pointer hidden"
                            id="nextUnit"
                        >
                            Next Unit
                        </Button>
                    </a>
                    <img src="/gif/Animation.gif" className="hidden" width={"100%"} alt="sx" />
                </div>
            </div>
        </>
    );
};

export default Content;
