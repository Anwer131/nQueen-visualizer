export const solveNQueens = async (n) => {
  let iterations = [];
  let finalSolution = [];
  let board = Array.from({ length: n }, () => Array(n).fill(false));

  const isSafe = (board, row, col) => {
    // Check the row for any queen
    for (let j = 0; j < col; j++) if (board[row][j]) return false;

    // Check the upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;

    // Check the lower left diagonal
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j]) return false;

    return true;
  };

  const solve = async (board, col, iterations) => {
    if (col === n) {
      finalSolution = board.map(row => [...row]);
      iterations.push(finalSolution);
      return true;
    }

    for (let row = 0; row < n; row++) {
      if (isSafe(board, row, col)) {
        board[row][col] = true;
        iterations.push(board.map(row => [...row]));
        if (await solve(board, col + 1, iterations)) return true;
        board[row][col] = false; // Backtrack
        iterations.push(board.map(row => [...row]));
      }
    }
    return false;
  };

  await solve(board, 0, iterations);
  return { iterations, finalSolution };
};
