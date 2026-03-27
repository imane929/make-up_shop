import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Button, Paper, Grid, TextField, Box, Divider, Alert } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Checkout() {
  const { totalPrice, cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BT-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newOrderNumber = generateOrderNumber();
    
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      products: cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
        color: item.selectedColor || null,
        size: item.selectedSize || null
      })),
      total: totalPrice,
      orderNumber: newOrderNumber
    };

    try {
      await api.post("/email/send-order", orderData);
    } catch (emailErr) {
      console.log("Email failed:", emailErr);
    }

    let orderSaved = false;
    let savedOrderId = null;
    const userId = user?._id || user?.id;
    try {
      const orderRes = await api.post("/orders", {
        userId: userId,
        products: cart.map(item => ({
          productId: item._id || item.id,
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
          image: item.image
        })),
        total: totalPrice,
        address: `${formData.address}, ${formData.city} ${formData.zip}`
      });
      console.log("Order saved:", orderRes.data);
      savedOrderId = orderRes.data?._id;
      orderSaved = true;
    } catch (orderErr) {
      console.error("Order save failed:", orderErr);
      console.error("Error details:", orderErr.response?.data);
    }

    setOrderNumber(newOrderNumber);
    clearCart();
    setLoading(false);
    
    navigate("/order-confirmation", {
      state: {
        orderData: {
          orderNumber: newOrderNumber,
          products: orderData.products,
          total: totalPrice,
          address: `${formData.address}, ${formData.city} ${formData.zip}`,
          email: formData.email,
          orderId: savedOrderId
        }
      }
    });
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <LocalShippingIcon color="primary" />
              <Typography variant="h6">
                Shipping Information
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  Cash on Delivery
                </Typography>
                <Typography variant="body2">
                  You will pay when you pick up your order in store.
                </Typography>
              </Alert>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={<EmailIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? "Processing..." : "Confirm Order"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, position: "sticky", top: 100 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            
            {cart.map((item) => {
              const cartKey = `${item._id || item.id}-${item.selectedColor || ""}-${item.selectedSize || ""}`;
              return (
                <Box key={cartKey} sx={{ mb: 2, pb: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  {item.selectedColor && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Color: {item.selectedColor}
                    </Typography>
                  )}
                  {item.selectedSize && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Size: {item.selectedSize}
                    </Typography>
                  )}
                </Box>
              );
            })}

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary.main">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2">
                You will receive a confirmation email after your order.
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
