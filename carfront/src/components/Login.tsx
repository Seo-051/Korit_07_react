import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";

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
  const [ open, setOpen ] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setUser({...user, [event.target.name]: event.target.value});
      console.log(user);
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
        console.log(jwtToken);
        if(jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch(err => {
        console.log(err)
        setOpen(true)
      });
    }

    if(isAuthenticated){
      return <Carlist />
    }


    else{
      return(
        <Stack spacing={2} alignItems="center" mt={2} >
          <TextField
            name="username"
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
            <Snackbar 
              open = {open}
              autoHideDuration = {3000}
              onClose = {() => setOpen(false)}
              message = 'ID 혹은 비밀번호가 틀렸습니다.'
            />
        </Stack>
      );
    }

}

export default Login