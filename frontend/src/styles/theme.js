
import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "#1A1A1A",
      light: "#404040",
      dark: "#000000"
    },
    secondary: {
      main: "#E91E63",
      light: "#F48FB1",
      dark: "#C2185B"
    },
    background: {
      default: mode === "dark" ? "#0A0A0A" : "#FFFFFF",
      paper: mode === "dark" ? "#1A1A1A" : "#FFFFFF"
    },
    text: {
      primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
      secondary: mode === "dark" ? "#B0B0B0" : "#666666"
    }
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: "0.03em", textTransform: "none" }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 30,
          padding: "12px 28px",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 25px rgba(233, 30, 99, 0.35)",
            transform: "translateY(-2px)"
          }
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1A1A1A 0%, #404040 100%)"
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: mode === "dark" ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
          border: "1px solid rgba(233, 30, 99, 0.05)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: mode === "dark" ? "0 20px 50px rgba(0,0,0,0.6)" : "0 20px 50px rgba(233, 30, 99, 0.12)",
            border: "1px solid rgba(233, 30, 99, 0.2)"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === "dark" ? "0 2px 16px rgba(0,0,0,0.3)" : "0 2px 16px rgba(0,0,0,0.04)"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === "dark" ? "rgba(26, 26, 26, 0.98)" : "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: mode === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(233, 30, 99, 0.08)"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          letterSpacing: "0.3px"
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s ease",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E91E63"
              }
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(233, 30, 99, 0.1)"
            }
          }
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "& .MuiSlider-thumb": {
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(233, 30, 99, 0.16)"
            }
          }
        }
      }
    }
  }
});

export default getTheme;
