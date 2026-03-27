import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Alert, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
          Create Account
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Sign up to start shopping
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Account created successfully! Redirecting to login...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            sx={{ mb: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
              Sign In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

