import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button, Divider, Grid } from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import api from "../services/api";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
      return;
    }
    
    if (orderData.orderId) {
      api.get(`/orders/${orderData.orderId}`)
        .then(res => setOrder(res.data))
        .catch(err => console.error("Error fetching order:", err));
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">No order found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Box sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: "50%", 
          backgroundColor: "success.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3
        }}>
          <CheckCircleIcon sx={{ fontSize: 50, color: "white" }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "success.main" }}>
          Order Confirmed!
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 1 }}>
          Thank you for your order!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Order Number: <strong>{orderData.orderNumber}</strong>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: "left" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingBagIcon sx={{ color: "#E91E63" }} />
            Order Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Items</Typography>
              <Typography variant="body1">{orderData.products?.length || 0} products</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Total</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, color: "#E91E63" }}>
                ${orderData.total?.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Shipping Address</Typography>
              <Typography variant="body1">{orderData.address}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ 
          backgroundColor: "info.light", 
          p: 2, 
          borderRadius: 2, 
          mb: 3 
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Cash on Delivery
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You will pay when you pick up your order in store.
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          A confirmation email has been sent to {orderData.email}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)"
              }
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/orders"
            sx={{ borderColor: "#E91E63", color: "#E91E63" }}
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
