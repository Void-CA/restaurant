import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { Product } from "../../types/products";

type Props = {
  onAddToCart: (product: Product) => void;
};

const ProductSearch: React.FC<Props> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/search/?query=${searchQuery}&page=${currentPage}`
        );
        const { results, count } = response.data;
        setProducts(results);
        setTotalPages(Math.ceil(count / 10));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchQuery, currentPage]);

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar productos"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        sx={{ mb: 3 }}
      />

      <Grid
        container
        columns={{ xs: 12, sm: 6, md: 4 }}
        spacing={2}
        justifyContent="space-around"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Grid key={product.id} sx={{ textAlign: "center" }}>
              <Card
                sx={{
                  width: {
                    xs: 150, // Tamaño para pantallas pequeñas (extra-small)
                    sm: 200, // Tamaño para pantallas medianas (small)
                    md: 220, // Tamaño para pantallas grandes (medium)
                    lg: 280, // Tamaño para pantallas extra grandes (large)
                  },
                  mb: 1,
                  height: {
                    xs: 160, // Altura para pantallas pequeñas
                    sm: 180, // Altura para pantallas medianas
                    md: 200, // Altura para pantallas grandes
                    lg: 220, // Altura para pantallas extra grandes
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "space-between",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                      height: 45,
                      fontSize: "1rem",
                    }}
                    onClick={() => onAddToCart(product)}
                  >
                    Agregar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography variant="body1">No se encontraron productos</Typography>
          </Grid>
        )}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductSearch;
