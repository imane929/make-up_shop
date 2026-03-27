import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import { Grid, Typography, Container } from "@mui/material";

export default function RecommendedProducts({ product }) {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    api.get(`/products?category=${product.category}`)
      .then(res => {
        const filtered = res.data.filter(p => p._id !== product._id);
        setRecommended(filtered.slice(0, 4));
      })
      .catch(err => console.error("Error fetching recommended products:", err));
  }, [product]);

  if (recommended.length === 0) return null;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        You May Also Like
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {recommended.map(p => (
          <Grid item md={3} sm={6} xs={6} key={p._id} sx={{ display: "flex", justifyContent: "center" }}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
