import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    // This is a reducer function with name addItem and it is mapped to an action
    // We are mutating the state
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0; // []
      //state.items = [];
      //return { items: [] }; // this new  [] will replace the originalState
      // Why we didnt do like state = [] there is a reason for this in Immer js as behind the scene redux using immer to check the immutable object difference
    }
  }
});

// createSlice function return an object
/**
{
    actions: {addItem , removeItem, cartSlice},
    reducer
}
 */

// Now you have to export to things from the slice
// 1 - export the actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;
// 2 - export the reducers
export default cartSlice.reducer;
