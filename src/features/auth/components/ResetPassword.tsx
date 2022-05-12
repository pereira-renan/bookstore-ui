import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import delay from '@/utils/delay';
import { Alert, AlertTitle, IconButton, InputAdornment } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import storage from '@/utils/storage';
import { resetPassword } from '../api/resetPassword';
import { useDispatch } from 'react-redux';
import { loggoutUser } from '@/stores/reducer/authReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { toast } from 'react-toastify';

type Inputs = {
  userId: string;
  code: string;
  password: string;
  confirmNewPassword: string;
};

export default function Register() {
  const { user, code } = useParams();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [allowedTocontinue, setAllowedToContinue] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user, code);
    if (user && code) {
      setUserId(user);
      setCodeValue(code);
    } else {
      navigate('/404');
    }
  }, []);

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const res = await resetPassword(data.userId, data.code, data.password);
    console.log(res);
    setAllowedToContinue(false);
    await delay(3000);
    if (res.status == 200) {
      toast.success('Your password has been reset. Redirecting to login page in 3 seconds', {
        position: 'bottom-center',
        autoClose: 2000,
      });
      await delay(3000);
      storage.clearToken();
      dispatch(loggoutUser());
      navigate('/auth/login');
    } else if (res.status == 401) {
      toast.warn('Your password reset token has expired. Please request a new one', {
        position: 'bottom-center',
      });
      setAllowedToContinue(true);
    } else {
      toast.error('There was a problem with your request. Please try again later', {
        position: 'bottom-center',
      });
      setAllowedToContinue(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              fullWidth
              label="New Password"
              autoFocus
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              disabled={!allowedTocontinue}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Please enter a new password',
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

            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              disabled={!allowedTocontinue}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
              {...register('confirmNewPassword', {
                required: 'Please confirm your new password',
                validate: {
                  passwordMatches: (confirmNewPassword: string) =>
                    confirmNewPassword === watch('password') ||
                    'Confirmation password does not match',
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                setValue('userId', userId);
                setValue('code', codeValue);
                clearErrors();
              }}
            >
              Reset password
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
