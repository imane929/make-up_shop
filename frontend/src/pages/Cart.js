import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { Container, Typography, Button, Box, Paper, Grid, IconButton, Divider, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ClearIcon from "@mui/icons-material/Clear";

export default function Cart() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCartKey = (item) => {
    return `${item._id || item.id}-${item.selectedColor || ""}-${item.selectedSize || ""}`;
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Paper sx={{ p: 6, borderRadius: 3 }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't added any products yet
          </Typography>
          <Button variant="contained" component={Link} to="/products">
            View Products
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Cart ({cart.length} products)
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ClearIcon />}
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => {
            const cartKey = getCartKey(item);
            return (
              <Paper key={cartKey} sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: 70,
                        borderRadius: 1.5,
                        objectFit: "cover"
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} sm={7}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.brand}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                      {item.selectedColor && (
                        <Chip 
                          label={item.selectedColor} 
                          size="small" 
                          sx={{ fontSize: "0.7rem", height: 22 }}
                        />
                      )}
                      {item.selectedSize && (
                        <Chip 
                          label={item.selectedSize} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: "0.7rem", height: 22 }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(cartKey, item.quantity - 1)}
                        sx={{ border: "1px solid", borderColor: "grey.300", width: 28, height: 28 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 1.5, fontWeight: 700, minWidth: 25, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(cartKey, item.quantity + 1)}
                        sx={{ border: "1px solid", borderColor: "grey.300", width: 28, height: 28 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#E91E63" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => removeFromCart(cartKey)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, position: "sticky", top: 100 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography fontWeight={600}>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography color="success.main" fontWeight={600}>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>Total</Typography>
              <Typography variant="h6" fontWeight={800} color="#E91E63">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{ 
                py: 1.5,
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                boxShadow: "0 4px 15px rgba(233, 30, 99, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(233, 30, 99, 0.4)"
                }
              }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
