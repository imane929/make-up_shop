import { Card, CardContent, Typography, Button, Box, IconButton, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import QuickView from "./QuickView";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isInWishlist(product._id || product.id);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/products/${product._id || product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasShades = (product.colors && product.colors.length > 0) || (product.shadeVariants && product.shadeVariants.length > 0);
    
    if (hasSizes || hasShades) {
      navigate(`/products/${product._id || product.id}`);
      return;
    }
    
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card 
        onClick={handleCardClick}
        sx={{ 
          width: 280,
          height: 400,
          display: "flex", 
          flexDirection: "column", 
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(233, 30, 99, 0.15)",
            border: "1px solid rgba(233, 30, 99, 0.2)"
          }
        }}>
        {(product.isFeatured || product.isTrending) && (
          <Chip 
            label={product.isFeatured ? "Featured" : "Trending"}
            size="small"
            color={product.isFeatured ? "primary" : "secondary"}
            sx={{ 
              position: "absolute", 
              top: 8, 
              left: 8, 
              zIndex: 1,
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 22
            }}
          />
        )}

        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <IconButton 
            size="small"
            onClick={(e) => { e.stopPropagation(); setQuickViewOpen(true); }}
            sx={{ 
              backgroundColor: "white", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: 32,
              height: 32,
              "&:hover": { 
                backgroundColor: "#E91E63", 
                color: "white"
              }
            }}
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton 
            size="small"
            onClick={handleToggleWishlist}
            sx={{ 
              backgroundColor: "white", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: 32,
              height: 32,
              "&:hover": { 
                backgroundColor: "#E91E63", 
                color: "white"
              }
            }}
          >
            {wishlisted ? <FavoriteIcon sx={{ fontSize: 18, color: "#E91E63" }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>

        <Box 
          sx={{ 
            height: 200, 
            width: "100%",
            flexShrink: 0,
            backgroundColor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {product.image ? (
            <Box 
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover"
              }}
            />
          ) : (
            <Box sx={{ fontSize: "3rem", color: "#ccc", fontWeight: 300 }}>
              {product.category?.charAt(0).toUpperCase() || "P"}
            </Box>
          )}
        </Box>

        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 1.5, minHeight: 160 }}>
          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#E91E63" }}>
            {product.brand}
          </Typography>
          
          <Typography variant="subtitle2" sx={{ 
            mb: 0.5, 
            fontWeight: 600,
            fontSize: "0.85rem",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <StarIcon sx={{ color: "#FFB800", fontSize: 14 }} />
            <Typography variant="body2" fontWeight={600} fontSize="0.75rem">
              {product.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="0.7rem">
              ({product.reviewCount || 0})
            </Typography>
          </Box>

          <Box sx={{ mb: 1, display: "flex", gap: 0.5 }}>
            <Chip 
              label={product.category} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: 18, borderRadius: 1 }}
            />
            {product.stock > 0 && product.stock <= 5 && (
              <Chip 
                label={`${product.stock} left`}
                size="small" 
                color="warning"
                sx={{ fontSize: "0.6rem", height: 18, borderRadius: 1 }}
              />
            )}
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", mb: 1 }}>
              ${product.price}
            </Typography>
            
            {product.stock > 0 ? (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${product._id || product.id}`);
                  }}
                  sx={{ 
                    borderRadius: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    py: 0.5,
                    borderColor: "#E91E63",
                    color: "#E91E63",
                    "&:hover": {
                      backgroundColor: "rgba(233, 30, 99, 0.08)"
                    }
                  }}
                >
                  Details
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={handleAddToCart}
                  sx={{ 
                    borderRadius: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    py: 0.5,
                    backgroundColor: "#E91E63",
                    "&:hover": {
                      backgroundColor: "#C2185B"
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            ) : (
              <Typography variant="body2" color="error" fontWeight={600} fontSize="0.7rem">
                Out of Stock
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      <QuickView product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </motion.div>
  );
}
