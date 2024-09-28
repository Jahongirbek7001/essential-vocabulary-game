interface Verb {
    id: number;
    verb1: string;
    verb2: string;
    verb3: string;
    verbUzb: string;
}
const IrregularScript = (options: any, id: number) => {
    const message = document.getElementById("message") as HTMLDivElement;
    const hintRef = document.getElementById("hint-ref") as HTMLDivElement;
    const wordVerbOne = document.getElementById("wordVerbOne") as HTMLDivElement;
    const controls = document.getElementById("controls-container") as HTMLButtonElement;
    const startBtn = document.getElementById("start") as HTMLButtonElement;
    // const nextUnit = document.getElementById("nextUnit") as HTMLButtonElement;
    const letterContainer = document.getElementById("letter-container") as HTMLDivElement;
    const userInpSection = document.getElementById("user-input-section") as HTMLDivElement;
    const resultText = document.getElementById("result") as HTMLDivElement;
    const word = document.getElementById("word") as HTMLDivElement;
    // const unitName = document.getElementById("unitName") as HTMLDivElement;

    const words = Array.isArray(options) ? options : [];
    const idParams: number = id
    console.log(words);
    let randomWordVerbOne: string = "", randomHint: string = "", randomWordVerb: string = "";
    let winCount = 0;
    let lossCount = 5;
    let lettersBtnArray: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    let buttonMap: Record<string, HTMLButtonElement> = {};
    let loopCount: number = 0;

    const blocker = () => {
        let lettersButtons = document.querySelectorAll(".letters");
        stopGame();
    };

    const startGame = () => {
        controls.classList.add("hidden");
        init();
    };

    const stopGame = () => {
        controls.classList.remove("hidden");
    };

    function getRandomVerb(verbs: Verb[]): Verb | null {
        if (verbs.length === 0) {
            console.error("No verbs available to pick from.");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * verbs.length);
        return verbs[randomIndex];
    }

    const generateWord = () => {
        letterContainer.classList.remove("hidden");
        userInpSection.innerText = "";
        const randomVerb = getRandomVerb(words);
        if (!randomVerb) {
            console.error("Failed to get a random verb.");
            return;
        }

        randomWordVerbOne = randomVerb.verb1;
        console.log(idParams);
        if (idParams == 1) {
            randomWordVerb = randomVerb.verb2;
        }
        if (idParams == 2) {
            randomWordVerb = randomVerb.verb3;
        }
        randomHint = randomVerb.verbUzb;
        console.log(randomWordVerbOne);
        console.log(randomWordVerb);
        console.log(randomHint);

        hintRef.innerHTML = `<div id="wordHint">
                <span>Hint: </span>${randomHint}</div>`;
        wordVerbOne.innerHTML = `<div id="wordVerbOne">
        <span>Verb One: </span>${randomWordVerbOne}</div>`;
        let displayItem = "";
        randomWordVerb.split("").forEach(() => {
            displayItem += '<span class="inputSpace">_ </span>';
        });
        userInpSection.innerHTML = displayItem;
        userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
        userInpSection.innerHTML += `<div id='chanceCountTrue'>${loopCount + 1}/15</div>`;
    };
    const init = () => {
        winCount = 0;
        lossCount = 5;
        randomWordVerbOne = "";
        randomWordVerb = "";
        word.innerText = "";
        randomHint = "";
        message.innerText = "";
        userInpSection.innerHTML = "";
        letterContainer.classList.add("hidden");
        letterContainer.innerHTML = "";
        buttonMap = {};
        generateWord();
        const br = document.createElement('br');
        const br2 = document.createElement('br');
        // For creating letter buttons
        lettersBtnArray.forEach((letter, index) => {
            let button = document.createElement("button");
            button.classList.add('bg-white', 'text-gray-800', 'outline-none', 'rounded-md', 'cursor-pointer', 'h-[28px]', 'w-[28px]', 'border-2', 'mx-[2px]', 'sm:mx-1', 'sm:w-[2em]', 'sm:h-[2em]', 'md:w-[3em]', 'md:h-[3em]');
            button.innerText = letter;
            if (index === 10) {
                letterContainer.appendChild(br);
            } else if (index === 19) {
                letterContainer.appendChild(br2);
            }
            // Store the button reference in the map
            buttonMap[letter] = button;

            // Add click event listener
            button.addEventListener("click", () => handleLetterClick(letter));

            // Append generated buttons to the letter container
            letterContainer.appendChild(button);
        });

        // Listen for keyboard presses
        document.addEventListener("keydown", handleKeyPress);
    };

    const handleLetterClick = (letter: string) => {
        let button = buttonMap[letter]; // Get the button from the map

        if (!button || button.disabled) {
            return; // If the letter has already been guessed, do nothing
        }

        let charArray = randomWordVerb.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
        let inputSpaceArray: HTMLElement[] = Array.from(inputSpace) as HTMLElement[];

        // If the character is in the word
        if (charArray.includes(letter)) {
            message.innerText = `Correct Letter`;
            message.style.color = "#20B700";
            charArray.forEach((char, index) => {
                if (char === letter) {
                    // Ensure inputSpaceArray has enough elements
                    if (inputSpaceArray[index]) {
                        // Add correct guess styles
                        button.classList.remove('bg-white', 'text-gray-800');
                        button.classList.add('bg-[#20B700]', 'text-white', 'border-2', 'border-[#20B700]');
                        button.disabled = true;

                        // Replace dash with letter
                        inputSpaceArray[index].innerText = char;
                        // Increment win counter
                        winCount++;

                        // Check if player has won
                        if (winCount === charArray.length) {
                            handleWin();
                        }
                    } else {
                        console.error(`No matching input space for index ${index}`);
                    }
                }
            });
        }
        else {
            // Incorrect guess logic
            message.innerText = `Incorrect Letter`;
            message.style.color = "#FD2030";
            button.classList.remove('bg-white', 'text-gray-800');
            button.classList.add('bg-[#FD2030]', 'text-white', 'border-2', 'border-[#FD2030]');
            button.disabled = true;
            lossCount--;

            let chance = document.getElementById("chanceCount") as HTMLDivElement;
            if (chance) {
                chance.innerText = `Chances Left: ${lossCount}`;
            }

            if (lossCount === 0) {
                handleLoss();
            }
        }
    };

    // Handle win condition
    const handleWin = () => {
        word.innerHTML = `The word was: <span>${randomWordVerb}</span>`;
        resultText.innerHTML = "You Won";
        startBtn.innerText = "Start";
        // if (loopCount < 14) {
        //     word.innerHTML = `The word was: <span>${randomWordVerb}</span>`;
        //     startBtn.innerText = "Continue";
        //     loopCount++;
        //     // unitName.classList.add("hidden");
        //     // vocabAudio.classList.remove("hidden");
        //     // audioUSa.src = `${process.env.NEXT_PUBLIC_BASE_URL}/audio/usa/${randomWordVerbOne}.mp3`;
        //     // audioUk.src = `${process.env.NEXT_PUBLIC_BASE_URL}/audio/uk/${randomWordVerbOne}.mp3`;
        //     resultText.innerText = "";
        //     controls.classList.remove('gifBg');
        // } else {
        //     resultText.innerHTML = "You Won";
        //     startBtn.innerText = "Restart";
        //     // startBtn.addEventListener("click", () => {
        //     //     // nextUnit.classList.add("hidden");
        //     // });
        //     // nextUnit.classList.remove("hidden");
        //     controls.classList.add('gifBg');
        //     loopCount = 0;
        // }
        blocker();
    };

    // Handle loss condition
    const handleLoss = () => {
        word.innerHTML = `The word was: <span>${randomWordVerb}</span>`;
        resultText.innerText = "Game Over";
        startBtn.innerText = "Restart";
        loopCount = 0;
        blocker();
    };


    // Handle key press
    const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            handleLetterClick(key);
        }
    };

    startBtn.addEventListener("click", startGame);
};

export default IrregularScript;
