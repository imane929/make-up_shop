import { Container, Grid, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasShades = (product.colors && product.colors.length > 0) || (product.shadeVariants && product.shadeVariants.length > 0);
    
    if (hasSizes || hasShades) {
      navigate(`/products/${product._id || product.id}`);
      return;
    }
    
    addToCart(product);
    removeWishlist(product._id || product.id);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        My Wishlist ❤️
      </Typography>

      {wishlist.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Your wishlist is empty
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 3 }}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="body1" color="text.secondary">
              You have {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={clearWishlist}
              sx={{ 
                borderRadius: 3,
                textTransform: "none",
                fontSize: "0.8rem"
              }}
            >
              Clear Wishlist
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {wishlist.map((product) => (
              <Grid item md={3} sm={6} xs={12} key={product._id || product.id}>
                <Box sx={{ position: "relative" }}>
                  <ProductCard product={product} />
                  <Box sx={{ 
                    display: "flex", 
                    gap: 1, 
                    justifyContent: "center", 
                    mt: -1, 
                    pb: 2,
                    position: "relative",
                    zIndex: 1
                  }}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                      sx={{ 
                        borderRadius: 3,
                        textTransform: "none",
                        fontSize: "0.8rem"
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeWishlist(product._id || product.id)}
                      sx={{ 
                        borderRadius: 3,
                        textTransform: "none",
                        fontSize: "0.8rem"
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

