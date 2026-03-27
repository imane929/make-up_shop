import { useEffect, useState } from "react";
import api from "../services/api";
import { Container, Typography, Paper, Grid, Box, Chip, Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = () => {
    api.get("/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/orders/${orderToDelete._id}`);
      setOrders(orders.filter(o => o._id !== orderToDelete._id));
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEditClick = (order) => {
    setOrderToEdit(order);
    setNewStatus(order.status);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = async () => {
    try {
      await api.put(`/orders/${orderToEdit._id}`, { status: newStatus });
      setOrders(orders.map(o => 
        o._id === orderToEdit._id ? { ...o, status: newStatus } : o
      ));
      setEditDialogOpen(false);
      setOrderToEdit(null);
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

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

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No orders yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start shopping to see your orders here
          </Typography>
          <Button variant="contained" component={Link} to="/products">
            Browse Products
          </Button>
        </Paper>
      ) : (
        orders.map(order => (
          <Paper key={order._id} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10} md={5}>
                <Typography variant="h6">
                  Order #{order._id.slice(-8)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                {order.address && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                    Shipping to: {order.address}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" color="primary.main">
                  ${order.total?.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={4} md={2} sx={{ textAlign: "center" }}>
                <Chip 
                  label={order.status || "pending"} 
                  color={getStatusColor(order.status)} 
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={2} sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                <IconButton 
                  color="primary" 
                  onClick={() => handleEditClick(order)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="error" 
                  onClick={() => handleDeleteClick(order)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {order.products?.length || 0} items
              </Typography>
              {order.products?.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.image && (
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 40, height: 40, objectFit: "cover", borderRadius: 1 }}
                    />
                  )}
                  <Typography variant="body2">
                    {item.name || `Product ID: ${item.productId}`} x {item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this order?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Order #{orderToDelete?._id?.slice(-8)} - ${orderToDelete?.total?.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Order #{orderToEdit?._id?.slice(-8)}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

