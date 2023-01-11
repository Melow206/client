import { v4 as uuidv4 } from "uuid";
import { compareProperties } from '../../lib/product'
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (product.properties === undefined) {
      const cartItem = cartItems.filter((item) => item.id === product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            cartQuantity: product.cartQuantity ? product.cartQuantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                cartQuantity: product.cartQuantity
                  ? item.cartQuantity + product.cartQuantity
                  : item.cartQuantity + 1
              }
            : item
        );
      }
      // for variant products
    } else {
      const cartItem = cartItems.filter(
        (item) =>
          item.id === product.id &&
          compareProperties(item.selectedProperties, product.selectedProperties) &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            cartQuantity: product.cartQuantity ? product.cartQuantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else if (
        cartItem !== undefined &&
        !compareProperties(cartItem.selectedProperties, product.selectedProperties)
      ) {
        return [
          ...cartItems,
          {
            ...product,
            cartQuantity: product.cartQuantity ? product.cartQuantity : 1,
            cartItemId: uuidv4()
          }
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                cartQuantity: product.cartQuantity
                  ? item.cartQuantity + product.cartQuantity
                  : item.cartQuantity + 1,
                  selectedProperties: product.selectedProperties,
              }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.cartQuantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false;
    });
  }

  return state;
};

export default cartReducer;
