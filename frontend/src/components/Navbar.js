import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box, InputBase, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/wishlist");
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Products", path: "/products" },
    ...(user ? [{ text: "Orders", path: "/orders" }, { text: "Profile", path: "/profile" }] : []),
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1} sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ py: 1.5, px: { xs: 2, sm: 4 }, minHeight: "64px !important" }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2, color: "#333" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 0,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              mr: { xs: 1, sm: 4 }
            }}
          >
            <Box
              component="img"
              src="/black-logo.png"
              alt="BeauTen"
              sx={{ height: { xs: 32, sm: 40 }, width: "auto" }}
            />
          </Typography>

          {!isMobile ? (
            <>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 3,
                px: 2,
                py: 0.8,
                width: 280,
                border: "1px solid #e0e0e0",
              }}>
                <SearchIcon sx={{ color: "#999", fontSize: 20, mr: 1 }} />
                <InputBase 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  sx={{ flex: 1, fontSize: "0.85rem" }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mx: "auto" }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.text}
                    component={Link} 
                    to={item.path}
                    sx={{ 
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      color: isActive(item.path) ? "#fff" : "#333",
                      backgroundColor: isActive(item.path) ? "#E91E63" : "transparent",
                      "&:hover": { 
                        color: "#fff",
                        backgroundColor: "#E91E63"
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, ml: 2 }}>
                {user && (
                  <IconButton 
                    onClick={handleWishlistClick} 
                    sx={{ color: "#333", "&:hover": { color: "#E91E63" } }}
                  >
                    <Badge badgeContent={wishlist.length} color="error">
                      <FavoriteIcon sx={{ fontSize: 22 }} />
                    </Badge>
                  </IconButton>
                )}
                {user ? (
                  <>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666", 
                        fontWeight: 500, 
                        fontSize: "0.85rem",
                        display: { xs: "none", lg: "block" }
                      }}
                    >
                      {user.name?.split(" ")[0]}
                    </Typography>
                    <IconButton onClick={handleLogout} sx={{ color: "#333", "&:hover": { color: "#E91E63" } }}>
                      <LogoutIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                  </>
                ) : (
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="contained"
                    sx={{ 
                      borderRadius: 2, 
                      px: 3, 
                      fontWeight: 600, 
                      fontSize: "0.85rem",
                      textTransform: "none",
                      backgroundColor: "#E91E63",
                      "&:hover": { backgroundColor: "#C2185B" }
                    }}
                  >
                    Login
                  </Button>
                )}
                <IconButton onClick={handleCartClick} sx={{ color: "#333", "&:hover": { color: "#E91E63" } }}>
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon sx={{ fontSize: 22 }} />
                  </Badge>
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
              {user && (
                <IconButton onClick={handleWishlistClick} sx={{ color: "#333" }}>
                  <Badge badgeContent={wishlist.length} color="error">
                    <FavoriteIcon sx={{ fontSize: 20 }} />
                  </Badge>
                </IconButton>
              )}
              <IconButton onClick={handleCartClick} sx={{ color: "#333" }}>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>

        {isMobile && (
          <Box sx={{ px: 2, pb: 1.5 }}>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
              px: 2,
              py: 0.8,
              border: "1px solid #e0e0e0",
            }}>
              <SearchIcon sx={{ color: "#999", fontSize: 18, mr: 1 }} />
              <InputBase 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                sx={{ flex: 1, fontSize: "0.85rem" }}
              />
            </Box>
          </Box>
        )}
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" fontWeight={700} color="#E91E63">
            BeauTen
          </Typography>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ 
                textDecoration: "none", 
                color: isActive(item.path) ? "#E91E63" : "#333",
                backgroundColor: isActive(item.path) ? "rgba(233, 30, 99, 0.08)" : "transparent",
                fontWeight: isActive(item.path) ? 600 : 400,
                "&:hover": { backgroundColor: "rgba(233, 30, 99, 0.08)" }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ borderTop: "1px solid #e0e0e0", mt: "auto", p: 2 }}>
          {user ? (
            <>
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                {user.name}
              </Typography>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ borderRadius: 2, borderColor: "#E91E63", color: "#E91E63", "&:hover": { borderColor: "#C2185B", backgroundColor: "rgba(233, 30, 99, 0.08)" } }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              component={Link} 
              to="/login" 
              fullWidth 
              variant="contained" 
              onClick={() => setMobileMenuOpen(false)}
              sx={{ borderRadius: 2, backgroundColor: "#E91E63", "&:hover": { backgroundColor: "#C2185B" } }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
