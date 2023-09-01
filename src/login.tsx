import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateToken, setToken } from './utils';

interface LoginProps {
  onLogin: () => void,
}

const Login = ({
  onLogin
}: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      const token = await generateToken(email);
      setToken(token);
      onLogin();
      navigate('/game');
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
    >
      <TextField
        type='email'
        value={email}
        onChange={event => setEmail(event.target.value)}
        error={error}
        helperText={error && 'There was an issue logging in, please try again later.'}
        data-testid='email-input'
      />
      <LoadingButton 
        loading={isLoading}
        type='submit'
        variant='outlined'
        data-testid='login-button'
        disabled={!email}
      >
        Log In
      </LoadingButton>
    </form>
  );
}

export default Login;