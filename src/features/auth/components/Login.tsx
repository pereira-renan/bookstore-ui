import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import delay from '@/utils/delay';
import { Alert, AlertTitle, IconButton, InputAdornment } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../api/login';
import storage from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/stores/reducer/authReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

type Inputs = {
  username: string;
  password: string;
};

export default function Register() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const [allowedTocontinue, setAllowedToContinue] = useState(true);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setAllowedToContinue(false);
    const res = await loginWithEmailAndPassword(data.username, data.password);
    console.log(res);
    console.log(res.status);
    if (res.status == 200) {
      toast.success('Login Successful. Redirecting you to home page in 3 seconds', {
        position: 'bottom-center',
        autoClose: 2000,
      });
      await delay(3000);
      storage.setToken(res.data.token);
      dispatch(loginUser());
      navigate('/');
    } else if (res.status == 401) {
      toast.error('Invalid username or password', {
        position: 'bottom-center',
      });
      setAllowedToContinue(true);
    } else {
      toast.error('Something went wrong. Please try again later', {
        position: 'bottom-center',
      });
      setAllowedToContinue(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <Typography component="p">Use these as mock values</Typography>
        <Typography component="p">developer</Typography>
        <Typography component="p">DEVb00tc@mp</Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            type="username"
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            disabled={!allowedTocontinue}
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username', {
              required: 'Please enter a username',
              minLength: {
                value: 3,
                message: 'Your username must be at least 3 characters long and 20 maximum',
              },
              maxLength: {
                value: 20,
                message: 'Your username must have a maximum of 20 characters',
              },
            })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            disabled={!allowedTocontinue}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Please enter a password',
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {info && (
            <>
              <br />
              <Alert severity="info">
                <AlertTitle>
                  <strong>Hang tight</strong>
                </AlertTitle>
                {info}
              </Alert>
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', color: 'white' }}
            disabled={!allowedTocontinue}
            value="Submit"
            onClick={() => {
              clearErrors();
              setInfo('');
            }}
          >
            Login
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/auth/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/auth/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>{' '}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
