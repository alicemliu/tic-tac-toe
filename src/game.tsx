import { CircularProgress, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { checkEmpty, checkWinner, checkTie, generateMove } from './utils';
import Square from './square';

const emptyBoard = Array(3).fill(Array(3).fill(''));

enum Player {
  X = 'X',
  O = 'O'
}

const Game = () => {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);
  const [winner, setWinner] = useState<Player|undefined>(undefined);

  const [inProgress, setInProgress] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const disableClick = !inProgress || isLoading || error;

  const handleClick = async (row: number, col: number) => {
    const nextBoard = board.map(row => row.slice());

    if (board[row][col] === '') {
      nextBoard[row][col] = currentPlayer;
      setBoard(nextBoard);
    }
  }

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer(Player.X);
    setWinner(undefined);

    setInProgress(true);
    setIsLoading(false);
    setError(false);
  }

  useEffect(() => {
    const isEmpty = checkEmpty(board);
    
    if (!isEmpty) {
      const isWinner = checkWinner(board);
      const isTie = checkTie(board);

      if (isWinner) {
        setWinner(currentPlayer);
        setInProgress(false);
      } else if (isTie) {
        setInProgress(false);
      } else {
        setCurrentPlayer(currentPlayer === Player.X
          ? Player.O
          : Player.X
        );
      }
    }
  }, [board]);

  useEffect(() => {
    if (currentPlayer === Player.O) {
      (async () => {
        try {
          setIsLoading(true);
          const nextBoard = await generateMove(board);
          if (nextBoard) {
            setBoard(nextBoard);
          }
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [currentPlayer, board]);
  
  return (
    <>
      <div className='board'>
        { board.map((row, rowIndex: number) => (
          <Grid container key={rowIndex} className='board-row'>
            { row.map((value: Square, colIndex: number) => (
              <Grid item xs={4} key={colIndex} className='board-square'>
                <Square 
                  value={value}
                  key={colIndex}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={ disableClick || !!value }
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
      <div className='status'>
        { error ? <p>An error occured, please try again later.</p> 
          : inProgress
            ? currentPlayer === Player.X
              ? <p>Your turn...</p>
              : <>
                  <p>Computer's turn...</p>
                  { isLoading && <CircularProgress size='1em'/> }
                </>
            : <>
                <p>
                  { winner
                    ? `${winner} is the winner!`
                    : `It's a tie!`
                  }
                </p>
                <Button onClick={resetGame} variant='outlined'>Start New Game</Button>
            </>
        }
      </div>
    </>
  );
}

export default Game;