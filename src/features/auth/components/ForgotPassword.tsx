import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import validateEmail from '@/utils/validateEmail';
import { Alert, AlertTitle } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { forgotPassword } from '../api/forgotPassword';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { toast } from 'react-toastify';

type Inputs = {
  email: string;
};

export default function Register() {
  const [warning, setWarning] = useState('');
  const [alert, setAlert] = useState('');
  const [info, setInfo] = useState('');
  const [link, setLink] = useState('');
  const [allowedTocontinue, setAllowedToContinue] = useState(true);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const res = await forgotPassword(data.email);
    console.log(res);
    setAllowedToContinue(false);
    console.log(res.status);
    if (res.status == 200) {
      toast.success(
        'If your email matches one in our database, you will receive an email with instructions on how to reset your password.',
        {
          position: 'bottom-center',
        }
      );
      //PLACEHOLDER LINK WITHOUT SENDING URL TO EMAIL
      const link = '/auth/forgotPassword/reset/' + res.data.callback_URL;
      setLink(link);
      setAllowedToContinue(true);
    } else {
      toast.error('There was a problem with your request. Please try again later.', {
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
          minWidth: '100%',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <QuestionMarkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
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
          {warning && (
            <>
              <br />
              <Alert severity="error">
                <AlertTitle>
                  <strong>Error</strong>
                </AlertTitle>
                {warning}
              </Alert>
            </>
          )}

          {alert && (
            <>
              <br />
              <Alert severity="success">
                <AlertTitle>
                  <strong>Success</strong>
                </AlertTitle>
                {alert}
              </Alert>
            </>
          )}

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

          {link && (
            <>
              <br />
              <Alert severity="info">
                <AlertTitle>
                  <strong>Hang tight</strong>
                </AlertTitle>
                <Link component={RouterLink} to={link}>
                  Click here to reset your password
                </Link>
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
              setWarning('');
              setAlert('');
              setInfo('');
              setLink('');
            }}
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
