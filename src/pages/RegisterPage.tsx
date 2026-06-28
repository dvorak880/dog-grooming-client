import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, TextField, Typography, Stack } from "@mui/material";
import { authService } from "../services/authService";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");
      await authService.register({ firstName, username, password });
      navigate("/");
    } catch {
      setError("אירעה שגיאה בהרשמה. ייתכן ששם המשתמש כבר קיים");
    }
  };

  return (
    <AuthLayout
      title="פתיחת חשבון"
      subtitle="הצטרפות מהירה למערכת התורים"
    >
      <Stack spacing={2.5}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="שם פרטי"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

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
          onClick={handleRegister}
          sx={{
            py: 1.3,
            borderRadius: 3,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6d4c41, #8d6e63)",
          }}
        >
          יצירת חשבון
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          כבר יש לך משתמש? <Link to="/">כניסה</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}