import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login  from "./components/Login";

import ShoppingItemList from "./components/ShoppingItemList";

const queryClient = new QueryClient();

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('jwt');
      setIsAuthenticated(!!token);
    };
    checkAuth();  // 위에서 정의한거 바로 호출함.
    window.addEventListener('storage', checkAuth);  // 다른 탭에서의 변경을 감지하기 위해 추가함.
    return () => {
      window.removeEventListener('storage', checkAuth);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setIsAuthenticated(false);
    queryClient.clear();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <AppBar position="static" sx={{mt: 4}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow : 1}}>
                Shopping List | 쇼핑 리스트 👜
              </Typography>
              {isAuthenticated && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Box>
            <Routes>
              <Route path="/"
                element={isAuthenticated ? <ShoppingItemList /> : <Navigate to="/login" replace />}/>
              <Route path="/login" 
                element={isAuthenticated ? <Navigate to="/" replace /> : <Login loginSuccess={handleLoginSuccess}/>}/>
              <Route path="*"
                element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}/>              
            </Routes>

          </Box>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App