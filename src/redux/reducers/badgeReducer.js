import {createSlice} from '@reduxjs/toolkit';

const badgeSlice = createSlice({
  name: 'badge',
  initialState: {
    badge: 0
  },
  reducers: {
    setBadge(state, action) {
      state.badge = action.payload;
    },
  },
});

export const {setBadge} = badgeSlice.actions;
export default badgeSlice.reducer;
