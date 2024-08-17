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
    let linkNextUnit = document.getElementById("linkNextUnit") as HTMLAnchorElement;
    unitName.innerText = nameUnit

    const generateRandomValue = (array: any): number => Math.floor(Math.random() * array.length);

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
        let generateRandom = generateRandomValue(words)
        randomWord = words[generateRandom].word_eng;
        randomHint = words[generateRandom].word_uzb;
        hintRef.innerHTML = `<div id="wordHint">
                <span>Hint: </span>${randomHint}</div>`;
        let displayItem = "";
        randomWord.split("").forEach(() => {
            displayItem += '<span class="inputSpace">_ </span>';
        })
        userInpSection.innerHTML = displayItem;
        userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
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
                                if (loopCount < 2) {
                                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                                    startBtn.innerText = "Continue";
                                    loopCount++;
                                    unitName.classList.add("hide");
                                    resultText.innerText = "";

                                } else {
                                    resultText.innerHTML = "You Won";
                                    startBtn.innerText = "Restart";
                                    startBtn.addEventListener("click", () => {
                                        nextUnit.classList.add("hide");
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