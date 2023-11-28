import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  error: null,
  addProduct:null,
  addtoCartResponse:null
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    setProduct(state,action){
      state.status=action.type,
      state.addProduct=action.payload
    },
    addToCart(state,action){
      state.status=action.type,
      state.addtoCartResponse=action.payload
    }
  },
});

export const {
  setRoleType,
  setProduct,
  addToCart
} = AuthSlice.actions;
export default AuthSlice.reducer;
