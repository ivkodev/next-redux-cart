import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const isCartOpened = useSelector((state) => state.isCartOpened);
  const items = useSelector((state) => state.items);
  const price = useSelector((state) => state.price);
  const shipping = useSelector((state) => state.shipping);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
    });
  };

  const addToCart = (item) =>
    dispatch({
      type: "ADD",
      payload: item,
    });

  const removeFromCart = (item) =>
    dispatch({
      type: "REMOVE",
      payload: item,
    });

  const setShipping = (shipping) => {
    dispatch({
      type: "SET_SHIPPING",
      payload: shipping,
    });
  };

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return {
    items,
    price,
    shipping,
    isCartOpened,
    setShipping,
    toggleCart,
    addToCart,
    emptyCart,
    removeFromCart,
  };
};

export default useCart;
