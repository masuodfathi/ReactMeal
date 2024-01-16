import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if(action.type === "ADD"){
      const newItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[newItemIndex];

      let NewListOfItems;

      if (existingItem) {
        let shouldImportItem;
        shouldImportItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        NewListOfItems = [...state.items];
        NewListOfItems[newItemIndex] = shouldImportItem;
      } else {
        NewListOfItems = state.items.concat(action.item);
      }

      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: NewListOfItems,
        totalAmount: updatedTotalAmount,
      };
    }
    if(action.type === "REMOVE"){
      const wantToRemoveItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const shouldRemoveItem = state.items[wantToRemoveItemIndex];
      let NewListOfItems;

      if (shouldRemoveItem.amount === 1) {
        NewListOfItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        const updatedItem = {...shouldRemoveItem, amount:shouldRemoveItem.amount -1}
        NewListOfItems = [...state.items];
        NewListOfItems[wantToRemoveItemIndex] = updatedItem;
      }
      const updatedTotalAmount = state.totalAmount - shouldRemoveItem.price;
      return {
        items: NewListOfItems,
        totalAmount: updatedTotalAmount
      };
    }
  
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

  const addItemtoCartHandler = (item) => {
    dispatchAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemfromCartHandler = (id) => {
    dispatchAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    removeItem: removeItemfromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
