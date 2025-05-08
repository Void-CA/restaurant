export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  note?: string;
};

export type CartProps = {
  items: CartItem[];
  onRemove: (id: number) => void;
};
