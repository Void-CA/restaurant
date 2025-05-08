import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Product } from "../../types/products";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductItem: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ minWidth: 200, p: 2, m: 1, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
