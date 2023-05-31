/*-------------------------------- Constants --------------------------------*/
const winningCombos: (number[])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board: (number)[]
let turn: number
let winner: boolean | null
let tie: boolean | null

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll<HTMLDivElement>('.sqr')
const messageEl = document.querySelector<HTMLHeadingElement>('#message')!
const resetBtnEl = document.querySelector<HTMLButtonElement>('button')!

/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.board')?.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = 1
  winner = false
  tie = false
  render()
}

function render() {
  updateBoard()
  updateMessage()
}

function handleClick(evt: Event) {
  const target = evt.target as HTMLDivElement
  const sqIdx = parseInt(target.id.replace('sq', ''))

  if (isNaN(sqIdx) || board[sqIdx] || winner) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx: number) {
  board[idx] = turn
}

function checkForTie() {
  if (!board.includes(0)) {
    tie = true
  }
}

function checkForWinner() {
  if (!board) return
  winningCombos.forEach((combo: number[]) => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winner = true
    }
  })
}

function switchPlayerTurn() {
  if (winner || tie) return
  turn *= -1
}

function updateBoard() {
  board.forEach((boardVal, idx) => {
    if (boardVal === 1) {
      squareEls[idx].textContent = 'X'
    } else if (boardVal === -1) {
      squareEls[idx].textContent = 'O'
    } else {
      squareEls[idx].textContent = ''
    }
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "Cat's game! Meow!!!"
  } else {
    messageEl.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `
  }
}