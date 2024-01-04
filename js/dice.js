
rotations = [
    [0, 0],
    [-90, 0],
    [0, -90],
    [0, 90],
    [90, 0],
    [180, 0],
];

function rollDiceAnimate(number) {
    dice.style.animation = `roll ${diceAnimationLength}ms ease-in-out`;

    setTimeout(() => {
        const [angleX, angleY] = rotations[number - 1];
        dice.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        dice.style.animation = 'none';
    }, diceAnimationLength + 50);
}
