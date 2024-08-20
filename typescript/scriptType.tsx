const scriptType = (options: any, nameUnit: string, linkNameNextUnit: number) => {
    const message = document.getElementById("message") as HTMLDivElement;
    const hintRef = document.getElementById("hint-ref") as HTMLDivElement;
    const controls = document.getElementById("controls-container") as HTMLButtonElement;
    const startBtn = document.getElementById("start") as HTMLButtonElement;
    const nextUnit = document.getElementById("nextUnit") as HTMLButtonElement;
    const letterContainer = document.getElementById("letter-container") as HTMLDivElement;
    const userInpSection = document.getElementById("user-input-section") as HTMLDivElement;
    const resultText = document.getElementById("result") as HTMLDivElement;
    const word = document.getElementById("word") as HTMLDivElement;
    const words = options
    let randomWord: string = "", randomHint: string = "";
    let winCount = 0, lossCount = 0;
    let lettersBtn = document.getElementsByClassName("lettersBtn");
    let lettersBtnArray: any[] = Array.from(lettersBtn);
    let unitName = document.getElementById("unitName") as HTMLDivElement;
    let vocabAudio = document.getElementById("vocabAudio") as HTMLDivElement;
    let audioUSa = document.getElementById("audioUsa") as HTMLAudioElement
    let audioUk = document.getElementById("audioUk") as HTMLAudioElement
    let linkNextUnit = document.getElementById("linkNextUnit") as HTMLAnchorElement;
    unitName.innerText = nameUnit

    function firstLatterUpperCase(str: string): string {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // massivdagi indexlarni randomniy tanlab berish
    const generateRandomValue = (() => {
        let availableIndices: number[] = [];

        return (array: any[]): number | undefined => {
            if (availableIndices.length === 0) {
                availableIndices = Array.from(array.keys());
            }

            const randomIndex = Math.floor(Math.random() * availableIndices.length);

            return availableIndices.splice(randomIndex, 1)[0];
        };
    })();

    const blocker = () => {
        let lettersButtons = document.querySelectorAll(".letters");
        stopGame();
    }

    const startGame = () => {
        controls.classList.add("hide");
        initial();
    }

    const stopGame = () => {
        controls.classList.remove("hide");
    }

    const generateWord = () => {
        letterContainer.classList.remove("hide");
        userInpSection.innerText = "";
        let generateRandom: any = generateRandomValue(words)
        randomWord = words[generateRandom].word_eng;
        randomHint = words[generateRandom].word_uzb;
        hintRef.innerHTML = `<div id="wordHint">
                <span>Hint: </span>${firstLatterUpperCase(randomHint)}</div>`;
        let displayItem = "";
        randomWord.split("").forEach(() => {
            displayItem += '<span class="inputSpace">_ </span>';
        })
        userInpSection.innerHTML = displayItem;
        userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
        userInpSection.innerHTML += `<div id='chanceCountTrue'>${loopCount + 1}/15</div>`;
    };

    let loopCount: number = 0;

    const initial = () => {
        winCount = 0;
        lossCount = 5;
        randomWord = "";
        word.innerText = "";
        randomHint = "";
        message.innerText = "";
        userInpSection.innerHTML = "";
        letterContainer.classList.add("hide");
        letterContainer.innerHTML = "";
        generateWord();

        for (let i = 0; i < lettersBtnArray.length; i++) {
            let button = document.createElement("button");
            button.classList.add("letters");
            if (i === 19) {
                button.style.marginLeft = "20px";
            }
            button.innerText = lettersBtnArray[i].innerText;

            button.addEventListener("click", () => {
                message.innerText = `Correct Letter`;
                message.style.color = "#20B700";
                let charArray = randomWord.toUpperCase().split("");
                let inputSpace = document.getElementsByClassName("inputSpace");
                let inputSpaceArray: any[] = Array.from(inputSpace);
                if (charArray.includes(button.innerText)) {
                    charArray.forEach((char, index) => {
                        if (char === button.innerText) {
                            button.classList.add("correct");
                            inputSpaceArray[index].innerText = char;
                            winCount += 1;

                            if (winCount === charArray.length) {
                                if (loopCount < 14) {
                                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                                    startBtn.innerText = "Continue";
                                    loopCount++;
                                    unitName.classList.add("hide");
                                    vocabAudio.classList.remove("hide");
                                    audioUSa.src = `/audio/usa/${randomWord}.mp3`
                                    audioUk.src = `/audio/uk/${randomWord}.mp3`
                                    resultText.innerText = "";

                                } else {
                                    resultText.innerHTML = "You Won";
                                    startBtn.innerText = "Restart";
                                    startBtn.addEventListener("click", () => {
                                        nextUnit.classList.add("hide");
                                        vocabAudio.classList.remove("hide");
                                    })
                                    nextUnit.classList.remove("hide");
                                    
                                    linkNextUnit.href = `${linkNameNextUnit + 1}`;
                                    loopCount = 0
                                }
                                blocker();
                            }
                        }
                    });
                } else {
                    button.classList.add("incorrect");
                    lossCount -= 1;
                    let chance = document.getElementById("chanceCount") as HTMLDivElement;
                    chance.innerText = `Chance Left: ${lossCount}`;
                    message.innerText = `Incorrect Letter`;
                    message.style.color = "#FD2030";
                    if (lossCount === 0) {
                        word.innerHTML = `The word was: <span>${randomWord}</span>`;
                        resultText.innerText = "Game Over";
                        startBtn.innerText = "Restart";
                        vocabAudio.classList.add("hide");
                        loopCount = 0;
                        blocker();
                    }
                }
                button.disabled = true;
            });
            letterContainer.appendChild(button);
        }
    };

    startBtn.addEventListener("click", startGame);
}

export default scriptType