import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AxiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [url, setUrl] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.post(`auth/login`).then((fetchedUrl) => {
      setUrl(fetchedUrl.data.url);
    });
  }, []);

  const handleGoogleLogin = () => {
    window.open(url, "oauth-popup", "width=600,height=600");

    window.addEventListener("message", (event) => {
      
      if (event.origin !== "http://localhost:3000") return;
      const { token, redirectTo } = event.data;

      AxiosInstance.post('auth/set-token', { token }).then((res) => {
        navigate(redirectTo);
        console.log(res.data);
      })
        .catch((err) => console.log(err));
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
        Eventify-App
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: "40px",
          textAlign: "center",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome!
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Sign in to continue using your account.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            backgroundColor: "#DB4437",
            "&:hover": { backgroundColor: "#c1351d" },
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
