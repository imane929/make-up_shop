import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Alert, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
          Welcome Back
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue shopping
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button component={Link} to="/register" sx={{ textTransform: "none" }}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

