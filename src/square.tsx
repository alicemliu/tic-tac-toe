import { Button } from '@mui/material';
import { blue } from '@mui/material/colors';

interface SquareProps {
  value: Square,
  onClick: () => void,
  disabled: boolean,
  onMouseOver: React.MouseEventHandler,
  onMouseOut: React.MouseEventHandler,
  highlight: boolean,
}

const highlightColor = blue[100];

const Square = ({
  value,
  onClick,
  disabled,
  onMouseOver,
  onMouseOut,
  highlight
}: SquareProps) => {
  return (
    <Button
      className="square"
      onClick={onClick}
      disabled={disabled}
      variant={'outlined'}
      sx={{
        'fontSize': '3em',
        'backgroundColor': highlight ? highlightColor : 'white',
        ':hover': {
          bgcolor: 'primary.light',
        },
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}      
    >
      {value}
    </Button>
  );
}

export default Square;