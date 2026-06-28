import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, TextField, Typography, Stack } from "@mui/material";
import { authService } from "../services/authService";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      await authService.login({ username, password });
      navigate("/appointments");
    } catch {
      setError("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <AuthLayout
      title="מספרת כלבים"
      subtitle="ניהול תורים חכם  "
    >
      <Stack spacing={2.5}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleLogin}
          sx={{
            py: 1.3,
            borderRadius: 3,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6d4c41, #8d6e63)",
          }}
        >
          כניסה למערכת
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          אין לך משתמש? <Link to="/register">להרשמה</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}