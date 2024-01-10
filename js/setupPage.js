const popup = document.querySelector('.initial-setup');
const h1 = document.querySelector('h1');

const addOpponentButton = document.querySelector('.add-opponent');
const deleteOpponentButton = document.querySelector('.delete-opponent');
const playButton = document.querySelector('.play');

const opponentsContainer = document.querySelector('.opponents-container');

function toggleInstructionPopup() {
    const instructionPopup = document.getElementById('instructionPopup');
    instructionPopup.classList.toggle('show-instruction');
}

let playersNumber = 4;

document.getElementById('players-2').addEventListener('change', () => {
    playersNumber = 2;
    removeUnneededOpponents();
});
document.getElementById('players-3').addEventListener('change', () => {
    playersNumber = 3;
    removeUnneededOpponents();
});
document.getElementById('players-4').addEventListener('change', () => {
    playersNumber = 4;
    removeUnneededOpponents();
});

addOpponentButton.addEventListener('click', () => {
    const opponentDivs = document.querySelectorAll('.opponent');
    if (opponentDivs.length < playersNumber - 1) {
        const newOpponent = document.createElement('div');
        opponentsContainer.appendChild(newOpponent);
        newOpponent.outerHTML = `
        <div class="opponent">
            <svg class="robot" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                viewBox="0 0 48 48">
                <path
                 d="M42.466,17.023c-0.839,0-1.52,0.685-1.52,1.531c0,2.359-1.108,4.552-2.946,6.034V7.059C38,5.921,36.956,5,35.666,5H12.333 C11.044,5,10,5.921,10,7.059v18.856C6.401,28.048,4,32.256,4,36.5C4,37.329,4.672,38,5.5,38S7,37.329,7,36.5 c0-2.515,1.177-5.079,3-6.826v8.267C10,39.079,11.044,40,12.333,40H16v4.5c0,0.829,0.672,1.5,1.5,1.5s1.5-0.671,1.5-1.5V40h10v4.5 c0,0.829,0.672,1.5,1.5,1.5s1.5-0.671,1.5-1.5V40h3.667C36.956,40,38,39.079,38,37.941v-9.725c3.665-1.905,5.987-5.6,5.987-9.662 C43.987,17.708,43.305,17.023,42.466,17.023z M17.5,12c0.828,0,1.5,0.672,1.5,1.5S18.328,15,17.5,15S16,14.328,16,13.5 S16.672,12,17.5,12z M21,31.5c0,0.276-0.224,0.5-0.5,0.5H19v1.5c0,0.276-0.224,0.5-0.5,0.5h-1c-0.276,0-0.5-0.224-0.5-0.5V32h-1.5 c-0.276,0-0.5-0.224-0.5-0.5v-1c0-0.276,0.224-0.5,0.5-0.5H17v-1.5c0-0.276,0.224-0.5,0.5-0.5h1c0.276,0,0.5,0.224,0.5,0.5V30h1.5 c0.276,0,0.5,0.224,0.5,0.5V31.5z M27.317,20.142c-0.908,0.303-1.863,0.454-2.817,0.454s-1.909-0.151-2.817-0.454l-0.657-0.219 c-0.786-0.262-1.211-1.112-0.948-1.897c0.262-0.786,1.11-1.212,1.897-0.948l0.657,0.219c1.205,0.401,2.531,0.401,3.736,0 l0.657-0.219c0.787-0.263,1.635,0.162,1.897,0.948c0.263,0.786-0.162,1.635-0.948,1.897L27.317,20.142z M30,34 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C32,33.105,31.105,34,30,34z M30.5,15c-0.828,0-1.5-0.672-1.5-1.5 s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S31.328,15,30.5,15z">
                </path>
            </svg>
            <select>
                <option>Easy</option>
                <option>Hard</option>
            </select>
        </div>`;
    }
});

deleteOpponentButton.addEventListener('click', () => {
    const lastChild = opponentsContainer.lastElementChild;
    if (lastChild.classList.contains('opponent')) {
        opponentsContainer.removeChild(lastChild);
    }
});

playButton.addEventListener('click', () => {
    const players = playersNumber === 2
        ? [allPossiblePlayers[0], allPossiblePlayers[2]]
        : playersNumber === 3
            ? allPossiblePlayers.slice(0, 3)
            : allPossiblePlayers;


    const computerLevels = Array.from(document.querySelectorAll('.opponents-container .opponent select')).map(select => select.value);
    setPlayers(players, computerLevels);
});

function removeUnneededOpponents() {
    const opponentDivs = document.querySelectorAll('.opponent');
    for (let i = playersNumber - 1; i < opponentDivs.length; i++) {
        const lastChild = opponentsContainer.lastElementChild;
        if (lastChild.classList.contains('opponent')) {
            opponentsContainer.removeChild(lastChild);
        }
    }
}

function hideSetupPage() {
    popup.style.display = 'none';
    main.style.opacity = 1;

    side.style.translate = '0';

    h1.style.left = '10rem';
    h1.style.fontSize = '2rem';
}

h1.addEventListener('click', () => location.reload());