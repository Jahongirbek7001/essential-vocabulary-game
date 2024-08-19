const Content = () => {
    return (
        <>
            <div className="wrapper">
                <div className="hint-ref" id="hint-ref"></div>
                <div id="user-input-section"></div>
                <div id="message"></div>
                <div id="letter-container"></div>
                <div className=" hide flex justify-center flex-col">
                    <div className=" flex">
                        <button className=" lettersBtn border-2  w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">Q</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">W</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">E</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">R</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">T</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">Y</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">U</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">I</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">O</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">P</button>
                    </div>
                    <div>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">A</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">S</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">D</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">F</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">G</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">H</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">J</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">K</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">L</button>
                    </div>
                    <div>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">Z</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">X</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">C</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">V</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">B</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">N</button>
                        <button className="lettersBtn border-2 w-[48px] h-[48px] text-lg font-semibold text-gray-800 bg-white border-gray-200 rounded-lg dark:text-indigo-400  dark:border-indigo-400">M</button>
                    </div>
                </div>
                <div className="source">Source: "Coding Artist" Youtube chanel</div>
            </div>

            <div className="controls-container" id="controls-container">
                <div id="result"></div>
                <div id="word"></div>
                <div id="unitName" className="unitName"></div>
                <div className=" flex justify-center">

                    <button id="start">Start</button>
                    <a href={""} id="linkNextUnit">
                        <button className="hide" id="nextUnit">Next Unit</button>
                    </a>
                </div>
            </div>
        </>
    )
}
export default Content;