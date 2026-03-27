import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function StickyAddToCart() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const productMatch = location.pathname.match(/\/products\/([a-f0-9]+)/i);
    if (productMatch) {
      fetchProduct(productMatch[1]);
    } else {
      setVisible(false);
      setProduct(null);
    }
  }, [location.pathname]);

  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setVisible(true);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const hasSizes = product?.sizes && product.sizes.length > 0;
    const hasShades = (product?.colors && product.colors.length > 0) || (product?.shadeVariants && product.shadeVariants.length > 0);
    
    if (hasSizes || hasShades) {
      navigate(`/products/${product._id}`);
      return;
    }
    
    addToCart(product);
  };

  if (!visible || !product) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        p: 2,
        zIndex: 1200,
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{ width: 50, height: 50, objectFit: "contain" }}
        />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#E91E63" }}>
            ${product.price}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)"
            }
          }}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          onClick={() => setVisible(false)}
          sx={{ minWidth: "auto", p: 1 }}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  );
}
