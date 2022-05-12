import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validateEmail from '@/utils/validateEmail';
import { Alert, AlertTitle, IconButton, InputAdornment } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../api/register';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../api/login';
import storage from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/stores/reducer/authReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import delay from '@/utils/delay';
import { toast } from 'react-toastify';

type Inputs = {
  username: string;
  email: string;
  confirmEmail: string;
  password: string;
};

export default function Register() {
  const dispatch = useDispatch();
  const [allowedTocontinue, setAllowedToContinue] = useState(true);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setAllowedToContinue(false);
    let res = await registerWithEmailAndPassword(data.username, data.email, data.password);
    console.log(res);
    if (res.status == 200) {
      res = await loginWithEmailAndPassword(data.username, data.password);
      console.log(res);
      toast.success('Registration successful. Redirecting you to home page in 3 seconds', {
        position: 'bottom-center',
        autoClose: 2000,
      });
      await delay(3000);
      storage.setToken(res.data.token);
      dispatch(loginUser());
      navigate('/');
    } else {
      toast.error(res.data.message, {
        position: 'bottom-center',
        autoClose: 2000,
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
          <HowToRegRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create your account
        </Typography>

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
            label="Email Address"
            type="email"
            id="email"
            disabled={!allowedTocontinue}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              validate: {
                emailPattern: (email: string) =>
                  validateEmail(email) || 'Please enter a valid email address',
              },
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Email Address"
            type="confirmEmail"
            id="confirmEmail"
            disabled={!allowedTocontinue}
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
            {...register('confirmEmail', {
              required: 'Please confirm your email address',
              validate: {
                emailMatches: (confirmEmail: string) =>
                  confirmEmail === watch('email') || 'Confirmation email does not match',
              },
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            // removed id from this field in this form in order to not allow autocomplete
            //autoComplete="new-password"
            disabled={!allowedTocontinue}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Please enter a password',
              minLength: {
                value: 3,
                message:
                  'Your password must be at least 6 characters being: 1 uppercase, 1 lowercase, 1 number and 1 special character',
              },
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', color: 'white' }}
            disabled={!allowedTocontinue}
            value="Submit"
            onClick={() => {
              clearErrors();
            }}
          >
            Register
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/auth/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/auth/login" variant="body2">
                {'Already have an account? Sign In'}
              </Link>{' '}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
