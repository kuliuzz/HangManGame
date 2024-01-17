
onload = () => {
    let theWord;
    let livesLeft = 6;
    const firstLvl = document.getElementById("lvl-1");
    const secondLvl = document.getElementById("lvl-2");
    const tryLetter = document.getElementById("tryLetter");
    const inputElement = document.getElementById("tryWord");
    const theGameContainer = document.getElementById("game-word");
    const theGame = document.getElementById("game");
    const lives = document.getElementById("lives");
    const letters = document.getElementById("letters");
    const resetGame = document.getElementById("resetGame");

    firstLvl.addEventListener("click", (e)=>handleLevelOne(e));
    secondLvl.addEventListener("click", (e)=>handleLevelTwo(e));
    tryLetter.addEventListener("click", (e)=>handleLetter(e));
    resetGame.addEventListener("click", ()=>reset())
    
    let curLvl;
    function handleLevelOne(e){
        console.log(e.target)
        const lvl = e.target.value;
        if(lvl == 1 || lvl == 2 || lvl == 3){
            curLvl = lvl;
            firstLvl.classList.remove('show');
            firstLvl.classList.add('hide');
            secondLvl.classList.remove('hide');
            secondLvl.classList.add('show');
        }
    }

    function handleLevelTwo(e){
        const lang = e.target.value;
        if(lang == "bg" || lang == "en"){
            secondLvl.classList.remove('show');
            secondLvl.classList.add('hide');
            startGame(curLvl, lang);
        }
    }

    let words = [];
    function startGame(lvl, lang){
        switch (+lvl) {
            case 1:
                words = (lang === "bg") ? ["кос", "кекс", "куче", "пън"] : ["dog", "jam", "luck", "door"];
                break;
            case 2:
                words = (lang === "bg") ? ["смола", "стомна", "обувка", "щанга"] : ["marker", "laptop", "umbrella", "drummer"];
                break;
            case 3:
                words = (lang ==="bg") ? ["плибесцит", "запеканка", "гренадин", "шмекерлък"] : ["aeroplane", "presentation", "government"];
                break;
            default:
                break;
        }

        let idx = Math.floor(Math.random() * words.length) + 1;

        theWord = words[idx - 1];
        console.log(theWord)
    
        function createField(){
            let input = document.createElement("input");
            input.type = "text";
            input.readOnly = true;
            input.disabled = true;
            return input;
        }
        theGame.classList.remove("hide");
    
        theWord.split('').forEach(itm => {
            theGameContainer.appendChild(createField());
        });
        lives.innerText = livesLeft;
    }

    function handleLetter(e){
        console.log(inputElement.value);
        const testLetter = inputElement.value.toLowerCase();

        if(!theWord.includes(testLetter)){
            livesLeft--;
            lives.innerText = livesLeft;
            if(livesLeft > 0){
                letters.innerHTML += ` ${testLetter.toUpperCase()},`;
            }else{
                //game over
                reset();
            }
        }else{
            let idxs = [];
            for (let i = 0; i < theWord.length; i++) {
                theWord[i] === testLetter ? idxs.push(i) : null; 
            }
            populateInputs(idxs, testLetter.toUpperCase());
        }
        inputElement.value = "";
    }

    function populateInputs(arrayOfIdxs, letter){   
        const allInputs = Array.from(document.querySelectorAll("#game-word input"));
        arrayOfIdxs.forEach(el => {
            allInputs[el].value = letter;
        });
        let counter = 0;
        for (let index = 0; index < allInputs.length; index++) {
            allInputs[index].value ? counter++ : null;
        }
        counter == allInputs.length ? win() : null;

    }

    function reset(){
        theWord = '';
        livesLeft = 6;
        lang = '';
        curLvl = '';
        lives.innerHTML = '';
        letters.innerHTML = '';
        firstLvl.classList.add('show');
        firstLvl.classList.remove('hide');
        theGame.classList.add('hide');
        theGameContainer.innerHTML = '';
    }

    function win (){
        let modalWin = new bootstrap.Modal(document.getElementById("exampleModal"), {});
        modalWin.show();
    }
};

