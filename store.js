import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  isCartOpened: false,
  items: [],
  price: 0,
  shipping: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "EMPTY_CART":
      return {
        ...state,
        price: 0,
        items: [],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpened: !state.isCartOpened,
      };
    case "ADD":
      return {
        ...state,
        price: state.price + payload.price,
        isCartOpened: true,
        items: [...state.items, payload],
      };
    case "REMOVE":
      return {
        ...state,
        price: state.price - payload.price,
        items: state.items.filter(
          (item) => item.name !== payload.name || item.size !== payload.size
        ),
      };
    case "SET_SHIPPING":
      return {
        ...state,
        shipping: payload,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
