import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemHandler = item =>{
    cartCtx.addItem({...item,amount:1});
  };
  const removeItemHandler = id =>{
    console.log(id);
    cartCtx.removeItem(id);
  };
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={classes["cartitems"]}>
      {cartCtx.items.map((item) => (
        <CartItem 
            key={item.id}
            price={item.price} 
            name={item.name} 
            amount={item.amount} 
            onRemove={removeItemHandler.bind(null, item.id)} 
            onAdd={addItemHandler.bind(null, item)} />
            
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
