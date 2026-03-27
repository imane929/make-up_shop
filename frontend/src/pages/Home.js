import { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import Hero from "../components/Hero";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HistoryIcon from "@mui/icons-material/History";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { useAuth } from "../context/AuthContext";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useRecentlyViewed();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 5);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 5);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Hero />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              letterSpacing: "-0.02em",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
            }}
          >
            Featured Products
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 500, mx: "auto", fontSize: { xs: "0.95rem", md: "1.1rem" } }}
          >
            Hand-picked favorites from our premium collection
          </Typography>
        </Box>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} justifyContent="center">
          {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 5)).map(p => (
            <Grid 
              item 
              xs={6} 
              sm={4} 
              md={2.4} 
              key={p._id || p.id} 
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: "center", mt: { xs: 3, md: 5 } }}>
          <Button 
            component={Link} 
            to="/products" 
            variant="outlined" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => window.scrollTo(0, 0)}
            sx={{ 
              borderRadius: 30, 
              px: { xs: 4, md: 5 }, 
              py: { xs: 1.5, md: 2 },
              fontWeight: 600,
              fontSize: { xs: "0.9rem", md: "1rem" },
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
                transform: "translateX(5px)"
              }
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {user && recentlyViewed.length > 0 && (
        <Box sx={{ backgroundColor: "#fafafa", py: { xs: 4, md: 6 } }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 3, md: 4 } }}>
              <HistoryIcon sx={{ color: "#E91E63", fontSize: { xs: 28, md: 32 } }} />
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                Recently Viewed
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} justifyContent="center">
              {recentlyViewed.slice(0, 6).map(p => (
                <Grid 
                  item 
                  xs={6} 
                  sm={4} 
                  md={2.4} 
                  key={p._id || p.id} 
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              letterSpacing: "-0.02em",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
            }}
          >
            Trending Now
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 500, mx: "auto", fontSize: { xs: "0.95rem", md: "1.1rem" } }}
          >
            See what's popular this season
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} justifyContent="center">
          {(trendingProducts.length > 0 ? trendingProducts : products.slice(5, 10)).map(p => (
            <Grid 
              item 
              xs={6} 
              sm={4} 
              md={2.4} 
              key={p._id || p.id} 
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Newsletter />
    </div>
  );
}
