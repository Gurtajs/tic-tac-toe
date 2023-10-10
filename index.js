const cells = document.querySelectorAll('.cell')
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const text = document.querySelector('.text')
const button = document.createElement('button')
button.textContent = 'Restart'
let circleTurn

startGame()

button.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cells.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once : true})
});
text.innerText = ''
}

function handleClick(e) {
    const cell = e.target 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMarker(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
    swapTurns()
    }
}

function endGame(draw) {
    if (draw) {
        text.innerText = 'Draw!'
        text.appendChild(button)
    } else {
        text.innerText = `${circleTurn ? "O'S" : "X's"} Wins!`
        text.appendChild(button)
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

