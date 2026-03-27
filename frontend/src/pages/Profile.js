import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Grid, Divider, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      api.get("/orders")
        .then(res => setOrders(res.data.slice(0, 3)))
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Please login to view your profile</Typography>
      </Container>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <PersonIcon sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Customer
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon sx={{ color: "#E91E63" }} />
                <Typography variant="body2">{user.email}</Typography>
              </Box>
              {user.phone && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PhoneIcon sx={{ color: "#E91E63" }} />
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ShoppingBagIcon sx={{ color: "#E91E63" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Orders
                </Typography>
              </Box>
              <Button component={Link} to="/orders" variant="text" sx={{ color: "#E91E63" }}>
                View All
              </Button>
            </Box>

            {orders.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {orders.map(order => (
                  <Box key={order._id} sx={{ 
                    p: 2, 
                    border: "1px solid", 
                    borderColor: "divider", 
                    borderRadius: 2 
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Order #{order._id.slice(-8)}
                      </Typography>
                      <Chip 
                        label={order.status || "pending"} 
                        color={getStatusColor(order.status)} 
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        {order.products?.length || 0} items
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#E91E63" }}>
                        ${order.total?.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                No orders yet
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
