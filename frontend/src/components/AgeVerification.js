import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Paper } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function AgeVerification() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasVerified = localStorage.getItem("ageVerified");
    if (!hasVerified) {
      setOpen(true);
      document.body.style.overflow = "hidden";
    }
    setReady(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleVerify = (isAdult) => {
    document.body.style.overflow = "auto";
    if (isAdult) {
      localStorage.setItem("ageVerified", "true");
      setOpen(false);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (!ready) return null;

  return (
    <Modal
      open={open}
      onClose={() => {}}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      slots={{ backdrop: Box }}
      slotProps={{
        backdrop: {
          sx: { 
            backgroundColor: "rgba(0,0,0,0.85)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200
          }
        }
      }}
    >
      <Paper 
        elevation={24}
        sx={{ 
          maxWidth: 450,
          width: "90%",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          position: "relative",
          zIndex: 1201
        }}
      >
        <Box sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: "50%", 
          backgroundColor: "warning.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3
        }}>
          <WarningIcon sx={{ fontSize: 45, color: "warning.main" }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Age Verification
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          This website sells cosmetic products. You must be 18 years of age or older to enter.
        </Typography>

        <Typography variant="body2" sx={{ mb: 4, fontWeight: 500 }}>
          Are you 18 or older?
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => handleVerify(true)}
            sx={{ 
              px: 5,
              py: 1.5,
              background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)"
              }
            }}
          >
            Yes, I am 18+
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleVerify(false)}
            sx={{ 
              px: 5,
              py: 1.5,
              borderColor: "#E91E63",
              color: "#E91E63"
            }}
          >
            No, I'm not
          </Button>
        </Box>

        <Typography variant="caption" sx={{ display: "block", mt: 4, color: "text.secondary" }}>
          By entering this website, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Paper>
    </Modal>
  );
}
