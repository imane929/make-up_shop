import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Slider, Typography, Box, TextField, MenuItem, Paper, InputAdornment, Chip, Breadcrumbs, Link as MuiLink } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [price, setPrice] = useState([0, 100]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

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

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearch(searchFromUrl);
    }
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl.toLowerCase() !== "new") {
      setCategory(categoryFromUrl.toLowerCase());
    }
  }, [searchParams]);

  const categories = ["all", "lipstick", "foundation", "eyeshadow", "skincare", "mascara", "blush", "highlighter", "makeup", "other"];

  const filtered = products
    .filter(p => p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price >= price[0] && p.price <= price[1])
    .filter(p => category === "all" || p.category?.toLowerCase() === category)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 5 }, textAlign: "center" }}>
        <Typography>Loading products...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 5 } }}>
      <Breadcrumbs sx={{ mb: { xs: 2, md: 3 } }}>
        <MuiLink component={RouterLink} to="/" underline="hover" color="inherit" sx={{ fontSize: "0.9rem", cursor: "pointer" }}>
          Home
        </MuiLink>
        <Typography color="text.primary" sx={{ fontSize: "0.9rem" }}>
          Products
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            color: "text.primary", 
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" }
          }}
        >
          Shop All Products
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
          Discover our premium collection of beauty products
        </Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 3, md: 4 }, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 2, 
              border: "1px solid", 
              borderColor: "divider", 
              borderRadius: 2,
              backgroundColor: "background.default"
            }}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: "text.secondary" }}>
                CATEGORY
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categories.map(cat => (
                  <Chip
                    key={cat}
                    label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                    onClick={() => setCategory(cat)}
                    color={category === cat ? "primary" : "default"}
                    variant={category === cat ? "filled" : "outlined"}
                    sx={{ fontWeight: 500, px: 1 }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Sort By"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Top Rated</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 2, 
                  border: "1px solid", 
                  borderColor: "divider", 
                  borderRadius: 2
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: "text.secondary" }}>
                    PRICE RANGE
                  </Typography>
                  <Box sx={{ mx: { xs: 1, sm: 3 } }}>
                    <Slider
                      value={price}
                      onChange={(e, val) => setPrice(val)}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(v) => `$${v}`}
                      min={0}
                      max={100}
                      color="primary"
                      size="medium"
                      sx={{
                        width: "100%",
                        "& .MuiSlider-root": {
                          padding: "20px 0"
                        },
                        "& .MuiSlider-track": {
                          border: "none",
                          height: 6
                        },
                        "& .MuiSlider-rail": {
                          height: 6,
                          opacity: 0.3
                        },
                        "& .MuiSlider-thumb": {
                          width: 22,
                          height: 22,
                          "&:before": {
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                          }
                        }
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Typography variant="body2" fontWeight={700}>${price[0]}</Typography>
                      <Typography variant="body2" fontWeight={700}>${price[1]}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3, gap: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Showing <strong>{filtered.length}</strong> products
        </Typography>
        {(search || category !== "all" || price[0] !== 0 || price[1] !== 100) && (
          <Chip 
            label="Clear filters" 
            onClick={() => { setSearch(""); setCategory("all"); setPrice([0, 100]); }}
            sx={{ cursor: "pointer", fontWeight: 600 }}
            color="secondary"
          />
        )}
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
        {filtered.map(p => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={3} 
            lg={2.4} 
            key={p._id} 
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      )}
    </Container>
  );
}
