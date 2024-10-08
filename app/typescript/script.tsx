import generateRandomValue from '@/app/typescript/generateRandomValue'
import firstLatterUpperCase from '@/app/typescript/firstLatterUpperCase'

const scriptType = (options: any, nameUnit: string, linkNameNextUnit: number, bookId: number) => {
    const message = document.getElementById("message") as HTMLDivElement;
    const hintRef = document.getElementById("hint-ref") as HTMLDivElement;
    const controls = document.getElementById("controls-container") as HTMLButtonElement;
    const startBtn = document.getElementById("start") as HTMLButtonElement;
    const nextUnit = document.getElementById("nextUnit") as HTMLButtonElement;
    const letterContainer = document.getElementById("letter-container") as HTMLDivElement;
    const userInpSection = document.getElementById("user-input-section") as HTMLDivElement;
    const resultText = document.getElementById("result") as HTMLDivElement;
    const word = document.getElementById("word") as HTMLDivElement;
    const words = options;
    let randomWord: string = "", randomHint: string = "";
    let winCount = 0
    let lossCount = 0;
    let lettersBtnArray: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    let unitName = document.getElementById("unitName") as HTMLDivElement;
    let vocabAudio = document.getElementById("vocabAudio") as HTMLDivElement;
    let audioUSa = document.getElementById("audioUsa") as HTMLAudioElement;
    let audioUk = document.getElementById("audioUk") as HTMLAudioElement;
    let linkNextUnit = document.getElementById("linkNextUnit") as HTMLAnchorElement;
    let buttonMap: Record<string, HTMLButtonElement> = {};
    unitName.innerText = nameUnit;

    const blocker = () => {
        let lettersButtons = document.querySelectorAll(".letters");
        stopGame();
    }

    const startGame = () => {
        controls.classList.add("hidden");
        console.log(1);
        init();
    }

    const stopGame = () => {
        controls.classList.remove("hidden");
    }

    const generateWord = () => {
        letterContainer.classList.remove("hidden");
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
            if (index == 10) {
                letterContainer.appendChild(br);
            }
            else if (index == 19) {
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

        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
        let inputSpaceArray: HTMLElement[] = Array.from(inputSpace) as HTMLElement[];

        // If the character is in the word
        if (charArray.includes(letter)) {
            // Correct guess logic
            message.innerText = `Correct Letter`;
            message.style.color = "#20B700";
            charArray.forEach((char, index) => {
                if (char === letter) {
                    // Add correct guess styles
                    button.classList.remove('bg-white', 'text-gray-800');
                    button.classList.add('bg-[#20B700]', 'text-white', 'border-2', 'border-[#20B700]');
                    button.disabled = true;

                    // Replace dash with letter
                    inputSpaceArray[index].innerText = char;
                    // Increment win counter
                    winCount++;

                    // Check if player has won
                    if (winCount == charArray.length) {
                        handleWin();
                    }
                }
            });
        } else {
            // Incorrect guess logic
            message.innerText = `Incorrect Letter`;
            message.style.color = "#FD2030";
            button.classList.remove('bg-white', 'text-gray-800');
            button.classList.add('bg-[#FD2030]', 'text-white', 'border-2', 'border-[#FD2030]');
            button.disabled = true;
            lossCount--;

            let chance = document.getElementById("chanceCount") as HTMLDivElement;
            chance.innerText = `Chances Left: ${lossCount}`;

            if (lossCount === 0) {
                handleLoss();
            }
        }
    };

    // Handle win condition
    const handleWin = () => {
        if (loopCount < 14) {
            word.innerHTML = `The word was: <span>${firstLatterUpperCase(randomWord)}</span>`;
            startBtn.innerText = "Continue";
            loopCount++;
            unitName.classList.add("hidden");
            vocabAudio.classList.remove("hidden");
            audioUSa.src = `${process.env.NEXT_PUBLIC_BASE_URL}/essential-${bookId}/audio/usa/${randomWord}.mp3`;
            audioUk.src = `${process.env.NEXT_PUBLIC_BASE_URL}/essential-${bookId}/audio/uk/${randomWord}.mp3`;
            resultText.innerText = "";
            controls.classList.remove('gifBg')
        } else {
            resultText.innerHTML = "You Won";
            startBtn.innerText = "Restart";
            startBtn.addEventListener("click", () => {
                nextUnit.classList.add("hidden");
                vocabAudio.classList.remove("hidden");
            });
            nextUnit.classList.remove("hidden");
            controls.classList.add('gifBg')

            linkNextUnit.href = `${linkNameNextUnit + 1}`;
            loopCount = 0;
        }
        blocker();
    };

    // Handle loss condition
    const handleLoss = () => {
        word.innerHTML = `The word was: <span>${firstLatterUpperCase(randomWord)}</span>`;
        resultText.innerText = "Game Over";
        startBtn.innerText = "Restart";
        vocabAudio.classList.add("hidden");
        nextUnit.classList.add("hidden");
        loopCount = 0;
        blocker();
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