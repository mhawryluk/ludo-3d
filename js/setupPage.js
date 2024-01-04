document.getElementById('2-players-button').addEventListener('click', () => setPlayers([allPossiblePlayers[0], allPossiblePlayers[2]]));
document.getElementById('3-players-button').addEventListener('click', () => setPlayers(allPossiblePlayers.slice(0, 3)));
document.getElementById('4-players-button').addEventListener('click', () => setPlayers(allPossiblePlayers));

document.getElementById('easy-mode').addEventListener('click', () => setPlayers([allPossiblePlayers[0], allPossiblePlayers[2]], [1]));
document.getElementById('hard-mode').addEventListener('click', () => setPlayers([allPossiblePlayers[0], allPossiblePlayers[2]], [1], 'hard'));

h1.addEventListener('click', () => location.reload());