import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, TextField, Stack} from "@mui/material";

type User = {
  username: string;
  password: string;
}

function Login() {
  const [ user, setUser ] = useState<User>({
    username: '',
    password: ''
  });
  const [ isAuthenticated, setAuth ] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setUser({...user, [event.target.name]: event.target.value});
    }

    const handleLogin = () => {
      // 일부러 템플릿 리터럴로 안썼습니다.
      axios.post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: {
          'Content-Type' : 'application/json'
        },
      })
      .then(res => {
        const jwtToken = res.headers.authorization;
        if(jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch(err => {
        console.log(err)
      });
    
    }

  return(
    <Stack spaing={2} alignItems="center" mt={2} >
      <TextField
        name="usename"
        label="Username"
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Stack>
  );
}

export default Login