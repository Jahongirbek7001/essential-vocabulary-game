const scriptType = (options: any, nameUnit: string, linkNameNextUnit: number) => {
    const message = document.getElementById("message") as HTMLDivElement;
    const hintRef = document.getElementById("hint-ref") as HTMLDivElement;
    const controls = document.getElementById("controls-container") as HTMLButtonElement;
    const startBtn = document.getElementById("start") as HTMLButtonElement;
    const nextUnit = document.getElementById("nextUnit") as HTMLButtonElement;
    const letterContainer = document.getElementById("letter-container") as HTMLDivElement;
    const userInpSection = document.getElementById("user-input-section") as HTMLDivElement;
    // const controlsBgBox = document.getElementById("controlsBgBox") as HTMLDivElement;
    const resultText = document.getElementById("result") as HTMLDivElement;
    const word = document.getElementById("word") as HTMLDivElement;
    const words = options;
    let randomWord: string = "", randomHint: string = "";
    let winCount = 0
    let lossCount = 0;
    let lettersBtn = document.getElementsByClassName("lettersBtn");
    // let lettersBtnArray: any[] = Array.from(lettersBtn);
    let lettersBtnArray: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    let unitName = document.getElementById("unitName") as HTMLDivElement;
    let vocabAudio = document.getElementById("vocabAudio") as HTMLDivElement;
    let audioUSa = document.getElementById("audioUsa") as HTMLAudioElement;
    let audioUk = document.getElementById("audioUk") as HTMLAudioElement;
    let linkNextUnit = document.getElementById("linkNextUnit") as HTMLAnchorElement;
    unitName.innerText = nameUnit;

    function firstLatterUpperCase(str: string): string {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const blocker = () => {
        let lettersButtons = document.querySelectorAll(".letters");

        stopGame();
    }

    const startGame = () => {
        controls.classList.add("hide");
        init();
    }

    const stopGame = () => {
        controls.classList.remove("hide");
    }

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

    const generateWord = () => {
        letterContainer.classList.remove("hide");
        userInpSection.innerText = "";
        let generateRandom: any = generateRandomValue(words);
        console.log(generateRandom);

        randomWord = words[generateRandom].word_eng;
        randomHint = words[generateRandom].word_uzb;
        hintRef.innerHTML = `<div id="wordHint">
                <span>Hint: </span>${firstLatterUpperCase(randomHint)}</div>`;
        let displayItem = "";
        randomWord.split("").forEach(() => {
            displayItem += '<span class="inputSpace">_ </span>';
        });
        userInpSection.innerHTML = displayItem;
        userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
        userInpSection.innerHTML += `<div id='chanceCountTrue'>${loopCount + 1}/15</div>`;
    };

    let loopCount: number = 0;

    const init = () => {
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

        // For creating letter buttons
        for (let i = 0; i < lettersBtnArray.length; i++) {
            let button = document.createElement("button");
            button.classList.add("lettersBtn");
            if (i == 19) {
                button.style.marginLeft = "20px";
            }
            button.innerText = lettersBtnArray[i];

            // Character button onclick
            button.addEventListener("click", () => handleLetterClick(button.innerText));

            // Append generated buttons to the letters container
            letterContainer.appendChild(button);
        }

        // Listen for keyboard presses
        document.addEventListener("keydown", handleKeyPress);
    };

    // Handle letter click or key press
    const handleLetterClick = (letter: string) => {
        // Check if the letter button has already been disabled
        let button = Array.from(lettersBtn).find((btn) => (btn as HTMLButtonElement).innerText === letter) as HTMLButtonElement;
        if (button && button.disabled) {
            return; // If the letter has already been guessed, do nothing
        }

        message.innerText = `Correct Letter`;
        message.style.color = "#20B700";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
        let inputSpaceArray: HTMLElement[] = Array.from(inputSpace) as HTMLElement[];

        // If the character is in the array
        if (charArray.includes(letter)) {
            charArray.forEach((char, index) => {
                if (char === letter) {
                    if (button) {
                        console.log("correct");
                        button.classList.add("correct");
                        button.disabled = true;
                    }
                    // Replace dash with letter
                    inputSpaceArray[index].innerText = char;
                    // Increment counter
                    winCount += 1;
                    // Check if the player has won
                    if (winCount == charArray.length) {
                        if (loopCount < 14) {
                            word.innerHTML = `The word was: <span>${randomWord}</span>`;
                            startBtn.innerText = "Continue";
                            loopCount++;
                            unitName.classList.add("hide");
                            vocabAudio.classList.remove("hide");
                            audioUSa.src = `${process.env.NEXT_PUBLIC_BASE_URL}/audio/usa/${randomWord}.mp3`;
                            audioUk.src = `${process.env.NEXT_PUBLIC_BASE_URL}/audio/uk/${randomWord}.mp3`;
                            resultText.innerText = "";
                            controls.classList.remove('gifBg')
                        } else {
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Restart";
                            startBtn.addEventListener("click", () => {
                                nextUnit.classList.add("hide");
                                vocabAudio.classList.remove("hide");
                            });
                            // controls.classList.remove('gifBg')
                            nextUnit.classList.remove("hide");
                            controls.classList.add('gifBg')

                            linkNextUnit.href = `${linkNameNextUnit + 1}`;
                            loopCount = 0;
                        }
                        blocker();
                    }
                }
            });
        } else {
            // Incorrect letter logic
            if (button) {
                console.log("incorrect");
                button.classList.add("incorrect");
                button.disabled = true;
            }
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
                nextUnit.classList.add("hide");
                loopCount = 0;
                blocker();
            }
        }
    };


    // Handle key press
    const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) { // Check if the key pressed is a letter
            handleLetterClick(key);
        }
    };

    startBtn.addEventListener("click", startGame);
}

export default scriptType;
