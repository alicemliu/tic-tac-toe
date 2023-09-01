import { Button } from '@mui/material';

interface SquareProps {
  value: Square,
  onClick: () => void,
  disabled: boolean,
}

const Square = ({ value, onClick, disabled }: SquareProps) => {
  return (
    <Button
      className="square"
      onClick={onClick}
      disabled={disabled}
      variant='outlined'
      sx={{'fontSize': '3em'}}
    >
      {value}
    </Button>
  );
}

export default Square;