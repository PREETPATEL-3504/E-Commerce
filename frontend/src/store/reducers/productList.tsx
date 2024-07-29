import { createSlice } from "@reduxjs/toolkit";

interface Product {
  data: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    description: string;
  };
}

const initialState: Product = {
  data: {
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    image_url: "",
    description: "",
  },
};

const ProductListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setProductList } = ProductListSlice.actions;
export default ProductListSlice.reducer;
