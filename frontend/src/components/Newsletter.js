import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    
    setSubmitted(true);
    setEmail("");
    setError("");
  };

  return (
    <Paper 
      sx={{ 
        py: { xs: 4, sm: 6 }, 
        px: { xs: 2, sm: 3 },
        background: "linear-gradient(135deg, #1A1A1A 0%, #2d1f2d 100%)",
        borderTop: "3px solid #E91E63",
        borderBottom: "3px solid #E91E63"
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          <EmailIcon sx={{ fontSize: 40, color: "#E91E63", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
            Join Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
            Subscribe to get special offers, free giveaways, and new product announcements
          </Typography>
          
          {submitted && (
            <Alert severity="success" sx={{ mb: 3, mx: "auto", maxWidth: 400 }}>
              Thank you for subscribing! You'll receive our latest updates soon.
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, mx: "auto", maxWidth: 400 }}>
              {error}
            </Alert>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              display: "flex", 
              gap: 1, 
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: 400,
              mx: "auto"
            }}
          >
            <TextField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              sx={{ 
                flex: 1,
                minWidth: 180,
                maxWidth: 250,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "transparent"
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#E91E63"
                  }
                }
              }}
            />
            <Button 
              type="submit"
              variant="contained"
              size="small"
              endIcon={<SendIcon />}
              sx={{ 
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                px: { xs: 2, sm: 3 },
                py: { xs: 0.8, sm: 1 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)"
                }
              }}
            >
              Subscribe
            </Button>
          </Box>
          
          <Typography variant="caption" sx={{ display: "block", mt: 2, color: "rgba(255,255,255,0.5)", fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
            By subscribing, you agree to receive marketing emails.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
