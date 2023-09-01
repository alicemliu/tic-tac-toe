import { CircularProgress, Grid, Button } from '@mui/material';
import { useState, useReducer } from 'react';
import { checkWinner, checkFull, generateMove } from './utils';
import Square from './square';

enum Player {
  X = 'X',
  O = 'O'
}

const boardSquareStyle = {
  'width': '7rem',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center'
}

type Action = {
  type: string,
  payload?: {
    nextBoard?: Board
  } | undefined,
}

const emptyBoard = Array(3).fill(Array(3).fill(''));
const initialState = {
  board: emptyBoard,
  currentPlayer: Player.X,
  winner: undefined,
  inProgress: true
}

const gameReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'MOVE': {
      const nextBoard = action?.payload?.nextBoard;

      const isWinner = checkWinner(nextBoard!);
      const isTie = !isWinner && checkFull(nextBoard!);

      return {
        ...state,
        board: nextBoard,
        currentPlayer:
          state.currentPlayer === Player.X
            ? Player.O
            : Player.X,
        winner: isWinner,
        inProgress: !isWinner && !isTie,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [hoverRow, setHoverRow] = useState<number|undefined>(undefined);
  const [hoverCol, setHoverCol] = useState<number|undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const disableClick = !state.inProgress || isLoading || error;

  const handleClick = async (row: number, col: number) => {
    const nextBoardX = state.board.map((row: Row) => row.slice());
  
    if (nextBoardX[row][col] === '') {
      nextBoardX[row][col] = state.currentPlayer;
      unhoverSquare();
    }

    dispatch({ type: 'MOVE', payload: { nextBoard: nextBoardX } });

    if (!checkFull(nextBoardX) && !checkWinner(nextBoardX)) {
      try {
        setIsLoading(true);
        const nextBoardO = await generateMove(nextBoardX);
        dispatch({ type: 'MOVE', payload: { nextBoard: nextBoardO } });
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  }

  const hoverSquare = (row: number, col: number) => {
    setHoverRow(row);
    setHoverCol(col);
  };

  const unhoverSquare = () => {
    setHoverRow(undefined);
    setHoverCol(undefined);
  };
  
  return (
    <>
      <div className='board'>
        { state?.board.map((row: Row, rowIndex: number) => (
          <Grid container key={rowIndex} sx={{'height': '7rem'}}>
            { row.map((value: Square, colIndex: number) => (
              <Grid item xs={4} key={colIndex} sx={boardSquareStyle}>
                <Square 
                  value={value}
                  key={colIndex}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={ disableClick || !!value }
                  onMouseOver={() => hoverSquare(rowIndex, colIndex)}
                  onMouseOut={unhoverSquare}
                  highlight={rowIndex === hoverRow || colIndex === hoverCol}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
      <div className='status'>
        { error ? <p>An error occured.</p> 
          : state.inProgress
            ? state.currentPlayer === Player.X
              ? <p>Your turn...</p>
              : <>
                  <p>Bot's turn...</p>
                  { isLoading && <CircularProgress size='1em'/> }
                </>
            : <>
                <p>
                  { state.winner === Player.X && `You win!` }
                  { state.winner === Player.O && `Bot wins!` }
                  { state.winner === undefined && `It's a draw!` }
                </p>
                <Button onClick={handleReset} variant='outlined'>Start New Game</Button>
            </>
        }
      </div>
    </>
  );
}

export default Game;