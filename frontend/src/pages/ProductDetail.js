import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import RecommendedProducts from "../components/RecommendedProducts";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  IconButton,
  Divider,
  Modal,
  TextField,
  Rating,
  Avatar,
  Alert,
  Breadcrumbs,
  Link as MuiLink
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setSelectedColor("");
    setSelectedSize("");
    setNewReview({ rating: 5, comment: "" });
    setReviewError("");
    setReviewSuccess("");
    
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const found = res.data;
        if (found) {
          setProduct(found);
          addToRecentlyViewed(found);
          if (found.shadeVariants && found.shadeVariants.length > 0) {
            setSelectedColor(found.shadeVariants[0].name);
          } else if (found.colors && found.colors.length > 0) {
            setSelectedColor(found.colors[0].name);
          }
          if (found.sizes && found.sizes.length > 0) {
            setSelectedSize(found.sizes[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/product/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!newReview.comment.trim()) {
      setReviewError("Please write a comment");
      return;
    }
    
    setReviewSubmitting(true);
    setReviewError("");
    try {
      const res = await api.post("/reviews", {
        userId: user._id || user.id,
        productId: id,
        rating: newReview.rating,
        comment: newReview.comment
      });
      setReviews([res.data, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      setReviewSuccess("Review submitted successfully!");
      
      const productRes = await api.get(`/products/${id}`);
      setProduct(productRes.data);
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter(r => r._id !== reviewId));
      
      const productRes = await api.get(`/products/${id}`);
      setProduct(productRes.data);
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const userHasReviewed = reviews.some(r => r.user?._id === user?._id || r.user === user?._id);

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  const isWished = isInWishlist(product._id || product.id);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
  };

  const handleToggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toggleWishlist(product);
  };

  return (
    <Container sx={{ py: { xs: 2, sm: 4 } }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={RouterLink} to="/" underline="hover" color="inherit" sx={{ fontSize: "0.9rem", cursor: "pointer" }}>
          Home
        </MuiLink>
        <MuiLink component={RouterLink} to="/products" underline="hover" color="inherit" sx={{ fontSize: "0.9rem", cursor: "pointer" }}>
          Products
        </MuiLink>
        <MuiLink component={RouterLink} to={`/products?category=${product?.category}`} underline="hover" color="inherit" sx={{ fontSize: "0.9rem", cursor: "pointer" }}>
          {product?.category}
        </MuiLink>
        <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>
          {product?.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2, 
              overflow: "hidden", 
              border: "1px solid", 
              borderColor: "divider",
              position: "relative",
              backgroundColor: "#f8f8f8",
              height: { xs: 280, sm: 350, md: 450 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
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
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": { backgroundColor: "white" }
              }}
              onClick={() => setZoomOpen(true)}
            >
              <ZoomInIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          {product.category && (
            <Chip
              label={product.category}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: 1.5, fontSize: "0.7rem" }}
            />
          )}

          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: "-0.02em", fontSize: { xs: "1.25rem", md: "1.75rem" } }}>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
            {product.brand}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} sx={{ color: star <= product.rating ? "#ffc107" : "#e0e0e0", fontSize: 20 }} />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: "#E91E63", mb: 1 }}>
            ${product.price}
          </Typography>
          
          {product.stock > 0 && product.stock <= 5 && (
            <Typography variant="body2" color="warning.main" sx={{ mb: 2, fontWeight: 600 }}>
              ⚠️ Only {product.stock} left in stock!
            </Typography>
          )}

          {product.description && (
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
              {product.description}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {product.colors && product.colors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Color{selectedColor && `: ${selectedColor}`}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {product.colors.map((color) => (
                  <Box
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: selectedColor === color.name ? "2px solid #E91E63" : "2px solid #e0e0e0",
                      backgroundColor: selectedColor === color.name ? "rgba(233, 30, 99, 0.1)" : "#f5f5f5",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#E91E63",
                        backgroundColor: "rgba(233, 30, 99, 0.05)"
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 18, 
                        height: 18, 
                        borderRadius: "50%", 
                        backgroundColor: color.hex, 
                        border: "1px solid rgba(0,0,0,0.2)",
                        boxShadow: selectedColor === color.name ? "0 0 0 2px #fff, 0 0 0 3px #E91E63" : "none"
                      }} 
                    />
                    <Typography variant="body2" sx={{ fontWeight: selectedColor === color.name ? 700 : 500 }}>
                      {color.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {product.shadeVariants && product.shadeVariants.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Palette{selectedColor && `: ${selectedColor}`}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {product.shadeVariants.map((variant) => (
                  <Box
                    key={variant.name}
                    onClick={() => setSelectedColor(variant.name)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: selectedColor === variant.name ? "2px solid #E91E63" : "2px solid #e0e0e0",
                      backgroundColor: selectedColor === variant.name ? "rgba(233, 30, 99, 0.1)" : "#f5f5f5",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#E91E63",
                        backgroundColor: "rgba(233, 30, 99, 0.05)"
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: selectedColor === variant.name ? 700 : 500 }}>
                      {variant.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {selectedColor && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Shades:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {product.shadeVariants.find(v => v.name === selectedColor)?.shades.map((shade, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 35,
                          height: 35,
                          borderRadius: 1,
                          backgroundColor: shade,
                          border: "1px solid rgba(0,0,0,0.2)"
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Size{selectedSize && `: ${selectedSize}`}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {product.sizes.map((size) => (
                  <Box
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      border: selectedSize === size ? "2px solid #E91E63" : "2px solid #e0e0e0",
                      backgroundColor: selectedSize === size ? "rgba(233, 30, 99, 0.1)" : "#f5f5f5",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#E91E63",
                        backgroundColor: "rgba(233, 30, 99, 0.05)"
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: selectedSize === size ? 700 : 500 }}>
                      {size}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Quantity
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
              >
                -
              </IconButton>
              <Typography sx={{ px: 2, fontWeight: 600, minWidth: 30, textAlign: "center" }}>{quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => setQuantity(quantity + 1)}
                sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
              >
                +
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth
              sx={{ 
                py: 1.5,
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                boxShadow: "0 4px 15px rgba(233, 30, 99, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(233, 30, 99, 0.4)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              Add to Cart
            </Button>
            <IconButton
              onClick={handleToggleWishlist}
              sx={{
                border: "1px solid",
                borderColor: isWished ? "error.main" : "divider",
                borderRadius: 2,
                p: 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#E91E63",
                  color: "#E91E63"
                }
              }}
            >
              {isWished ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>


        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <RecommendedProducts product={product} />
      </Box>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Customer Reviews
        </Typography>
        
        {/* Add Review Form */}
        {user && !userHasReviewed && (
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Write a Review
            </Typography>
            {reviewError && <Alert severity="error" sx={{ mb: 2 }}>{reviewError}</Alert>}
            {reviewSuccess && <Alert severity="success" sx={{ mb: 2 }}>{reviewSuccess}</Alert>}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography>Your Rating:</Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, val) => setNewReview({ ...newReview, rating: val })}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your experience with this product..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmitReview}
              disabled={reviewSubmitting}
              sx={{
                background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
                "&:hover": { background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)" }
              }}
            >
              {reviewSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Paper>
        )}
        
        {/* Reviews List */}
        {reviews.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {reviews.map((review) => (
              <Paper key={review._id} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#E91E63" }}>
                      {review.user?.name?.charAt(0) || "U"}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.user?.name || "Anonymous"}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    {(user?._id === review.user?._id || user?._id === review.user) && (
                      <IconButton size="small" color="error" onClick={() => handleDeleteReview(review._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                  {review.comment}
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary">No reviews yet. Be the first to review this product!</Typography>
        )}
      </Box>

      <Modal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none"
          }}
        >
          <IconButton
            onClick={() => setZoomOpen(false)}
            sx={{
              position: "absolute",
              top: -40,
              right: 0,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              maxWidth: "100%",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 2
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
}
