import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { TEMP_USERS, User } from 'pages/common'


const Login = () => {
  const [user, setUser] = useState<User>({ userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 로그인 검증
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loggedUser = TEMP_USERS.find(u => u.userId === user.userId && u.password === user.password)
    if(loggedUser){
      localStorage.setItem('loginUser', JSON.stringify(loggedUser))
      navigate('/pages/dashboard')
    } else {
      alert('아이디 혹은 비밀번호가 틀렸습니다.');
    }
    console.log(user);
  };

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600}>
        로그인 LogIn
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} mt={4} spacing={2} width={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<IconifyIcon icon="uim:google" />}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="uim:apple" />}
        >
          Login with Apple
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }}>or Login with</Divider>
      <Stack onSubmit={handleSubmit} component="form" direction="column" gap={2}>
        <TextField
          id="userId"
          name="userId"
          type="id"
          value={user.userId}
          onChange={handleInputChange}
          variant="filled"
          placeholder="아이디"
          autoComplete="current-userId"
          fullWidth
          autoFocus
          required
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="비밀번호"
          autoComplete="current-password"
          fullWidth
          autoFocus
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ opacity: user.password ? 1 : 0 }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <IconifyIcon icon={showPassword ? 'ion:eye' : 'ion:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack mt={-1.5} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" color="primary" />}
            label="Remember me!"
          />
          <Link href="#!" fontSize="body2.fontSize" letterSpacing={0.5}>
            Forgot password?
          </Link>
        </Stack>
        <Button type="submit" variant="contained" size="medium" fullWidth>
          나를 눌러봐~
        </Button>
        <Typography
          my={3}
          color="text.secondary"
          variant="body2"
          align="center"
          letterSpacing={0.5}
        >
          계정이 없으신가요? <Link href={paths.signup}>{'Sign up'}</Link>
        </Typography>

      </Stack>
    </>
  );
};

export default Login;
