import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCards: [],
  totalPrice: 0,
  totalCount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const existingCard = state.selectedCards.find(
        (card) => card.id === action.payload.id
      );

      if (!existingCard) {
        state.selectedCards.push({
          ...action.payload,
          count: 1,
          // Use the price from the card data, defaulting to 0 for free events
          price: action.payload.price || 0,
        });
      }

      // Recalculate total price
      state.totalPrice = state.selectedCards.reduce(
        (total, card) => total + card.price * card.count,
        0
      );
        state.totalCount = state.selectedCards.reduce(
            (total, card) => total + card.count,
            0
        );
    },
    removeCard: (state, action) => {
      state.selectedCards = state.selectedCards.filter(
        (card) => card.id !== action.payload
      );

      // Recalculate total price
      state.totalPrice = state.selectedCards.reduce(
        (total, card) => total + card.price * card.count,
        0
      );
      state.totalCount = state.selectedCards.reduce(
        (total, card) => total + card.count,
        0
      );
    },
    incrementCount: (state, action) => {
      const card = state.selectedCards.find(
        (card) => card.id === action.payload
      );
      if (card) {
        card.count += 1;
        // Update total price
        state.totalPrice = state.selectedCards.reduce(
          (total, card) => total + card.price * card.count,
          0
        );
        state.totalCount = state.selectedCards.reduce(
          (total, card) => total + card.count,
          0
        );
      }
    },
    decrementCount: (state, action) => {
      const card = state.selectedCards.find(
        (card) => card.id === action.payload
      );
      if (card && card.count > 0) {
        card.count -= 1;
        // Update total price
        state.totalPrice = state.selectedCards.reduce(
          (total, card) => total + card.price * card.count,
          0
        );
        state.totalCount = state.selectedCards.reduce(
          (total, card) => total + card.count,
          0
        );
      }
    },
  },
});

export const { addCard, removeCard, incrementCount, decrementCount } =
  orderSlice.actions;

export default orderSlice.reducer;
