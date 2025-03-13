import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";

const HomePage = () => {
  const [discordId, setDiscordId] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkDiscordJoinStatus();
  }, []);

  const checkDiscordJoinStatus = async () => {
    try {
      const response = await AxiosInstance.get("auth/check-discord-status");
      setIsLoggedIn(response.data.isMember);
    } catch (error) {
      console.error("Error checking Discord join status:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("auth/update-discord", {
        discordId,
      });
      console.log(response.data);
      setInviteLink(response.data.inviteLink);
    } catch (error) {
      console.error("Error updating Discord ID:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Eventify-App
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          width: "400px",
        }}
      >
        <TextField
          fullWidth
          label="Enter Your Discord ID"
          variant="outlined"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        {inviteLink && (
          <Typography variant="body1" sx={{ mt: 3 }}>
            Your invite link:{" "}
            <Link href={inviteLink} target="_blank" rel="noopener noreferrer">
              {inviteLink}
            </Link>
          </Typography>
        )}

        {isLoggedIn ? (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/calendar")}
          >
            Go to Calendar
          </Button>
        ) : (
          inviteLink && (
            <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
              Please join the Discord server first to access the calendar.
            </Typography>
          )
        )}
      </Paper>
    </Box>
  );
};

export default HomePage;
