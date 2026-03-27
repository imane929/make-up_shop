
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #1A1A1A 0%, #2d1f2d 100%)",
        borderTop: "3px solid #E91E63",
        pb: { xs: 3, sm: 4 }
      }}
    >
      {/* Features Row */}
      <Box sx={{ backgroundColor: "#000", py: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 2, sm: 0 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, color: "white", textAlign: "center" }}>
                <AttachMoneyIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>Cash on Delivery</Typography>
              </Box>
              <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
                Pay when you pick up
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, color: "white", textAlign: "center" }}>
                <VerifiedUserIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>Premium Quality</Typography>
              </Box>
              <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
                Curated products
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, color: "white", textAlign: "center" }}>
                <SupportAgentIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>24/7 Support</Typography>
              </Box>
              <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
                Dedicated support
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4 }} alignItems="flex-start">
          {/* Brand Column */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                component="img"
                src="/black-logo.png"
                alt="BeauTen"
                sx={{ height: { xs: 40, sm: 50 }, display: { xs: "none", sm: "block" } }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              Your destination for premium makeup and beauty products.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ color: "white", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 4, height: 20, backgroundColor: "#E91E63", borderRadius: 1 }} />
                Shop
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link component={RouterLink} to="/products" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  All Products
                </Link>
                <Link component={RouterLink} to="/products?category=lipstick" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Lipstick
                </Link>
                <Link component={RouterLink} to="/products?category=foundation" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Foundation
                </Link>
                <Link component={RouterLink} to="/products?category=eyeshadow" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Eyeshadow
                </Link>
                <Link component={RouterLink} to="/products?category=skincare" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Skincare
                </Link>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link component={RouterLink} to="/products?category=mascara" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Mascara
                </Link>
                <Link component={RouterLink} to="/products?category=blush" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Blush
                </Link>
                <Link component={RouterLink} to="/products?category=highlighter" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Highlighter
                </Link>
                <Link component={RouterLink} to="/products?category=makeup" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Makeup
                </Link>
                <Link component={RouterLink} to="/products?category=other" onClick={() => window.scrollTo(0, 0)} sx={{ 
                  color: "rgba(255,255,255,0.7)", 
                  fontSize: "0.85rem", 
                  textDecoration: "none", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    color: "#fff",
                    backgroundColor: "rgba(233, 30, 99, 0.15)",
                    transform: "translateX(5px)"
                  } 
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E91E63" }} />
                  Other
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, color: "white", fontSize: "0.9rem" }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>📍 123 Avenue, Mohammedia, Morocco</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>📞 +212 6 75 81 44 40</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>✉️support.beauten@gmail.com</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>🕐 Mon - Fri: 9AM - 6PM</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, sm: 4 }, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
            © {new Date().getFullYear()} BeauTen Beauty. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


