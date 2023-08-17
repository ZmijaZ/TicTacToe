let tiles = [];

const result = document.querySelector("#result");

const Game = () => {
  //init
  let board = [[], [], []];
  let currentPlayer = "X";
  let moveCount = 0;
  let lastMove = null;

  const playMove = (i, j) => {
    board[i][j] = currentPlayer;
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    moveCount++;
    lastMove = (i, j);
  };

  const getMoveCount = () => moveCount;
  const getCurrentPlayer = () => currentPlayer;
  //   const getBoard = () => board;

  return { playMove, board, getCurrentPlayer, getMoveCount };
};

const getWinner = (board) => {
  //rows
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] != "" &&
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i]
    ) {
      return board[0][i];
    }
  }
  //columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] != "" &&
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2]
    ) {
      return board[i][0];
    }
  }

  //diagonals
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    return board[1][1];
  }
  if (
    board[0][2] != "" &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    return board[1][1];
  }
};

const end = (game) => {
  let winner = getWinner(game.board);
  return winner || game.getMoveCount() == 9;
};

let game = Game();

for (let i = 0; i < 9; i++) {
  tiles[i] = document.querySelector(`#tile${i}`);
}

for (let i = 0; i < 9; i++) {
  tiles[i].addEventListener("click", () => {
    // move begin
    let j = Math.floor(i / 3);
    let k = i % 3;

    tiles[i].textContent = game.getCurrentPlayer();
    game.playMove(j, k);

    //move end
    console.log(game.board);
    // getWinner(game.board);
    if (getWinner(game.board)) {
      result.textContent = `${getWinner(game.board)} won !`;
    } else if (end(game)) {
      result.textContent = "It's a tie";
    }
  });
}
