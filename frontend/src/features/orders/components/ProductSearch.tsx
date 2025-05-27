import React, { useState } from "react";
import { Product } from "../types/products";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface ProductSearchProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  products,
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Buscar productos..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Stack spacing={2}>
        {filteredProducts.map((product) => (
          <Card key={product.id} variant="outlined">
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              {/* Puedes mostrar más información aquí */}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToCart(product)}
              >
                Agregar
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default ProductSearch;
