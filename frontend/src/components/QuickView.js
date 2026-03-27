import { Modal, Box, Typography, Button, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function QuickView({ product, open, onClose }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!user) {
      onClose();
      navigate("/login");
      return;
    }
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasShades = (product.colors && product.colors.length > 0) || (product.shadeVariants && product.shadeVariants.length > 0);
    
    if (hasSizes || hasShades) {
      onClose();
      navigate(`/products/${product._id || product.id}`);
      return;
    }
    
    addToCart(product);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box sx={{
        backgroundColor: "white",
        borderRadius: 3,
        maxWidth: 600,
        width: "90%",
        maxHeight: "90vh",
        overflow: "auto",
        position: "relative"
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
          <Box sx={{ 
            width: { xs: "100%", sm: "50%" }, 
            height: 300,
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ 
                maxWidth: "100%", 
                maxHeight: "100%", 
                objectFit: "contain" 
              }}
            />
          </Box>

          <Box sx={{ p: 3, width: { xs: "100%", sm: "50%" } }}>
            <Chip 
              label={product.category} 
              size="small" 
              variant="outlined"
              sx={{ mb: 1 }}
            />
            
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {product.brand}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ display: "flex" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} sx={{ color: star <= product.rating ? "#ffc107" : "#e0e0e0", fontSize: 18 }} />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: "#E91E63", mb: 2 }}>
              ${product.price}
            </Typography>

            {product.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                {product.description.length > 150 
                  ? product.description.substring(0, 150) + "..." 
                  : product.description}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                py: 1.5,
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)"
                }
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                onClose();
                navigate(`/products/${product._id || product.id}`);
              }}
              sx={{ mt: 1, borderColor: "#E91E63", color: "#E91E63" }}
            >
              View Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
