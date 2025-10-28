export type AccountCredentials = {
  username: string;
  password: string;
}

export type ShoppingItem = {
  id: number;
  product: string;
  amount: string;
  purchased: boolean;
}
export type ShoppingItemEntity = {
  product: string;
  amount: string;
  purchased: boolean;
}