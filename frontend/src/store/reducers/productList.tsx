import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  product: [],
  cart: [],
  wishList: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
  },
});

export const { setProduct, setCart, setWishList } = productListSlice.actions;
export default productListSlice.reducer;
