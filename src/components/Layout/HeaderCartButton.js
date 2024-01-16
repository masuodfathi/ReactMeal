import { useContext , useEffect , useState} from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props =>{
    const cartCtx = useContext(CartContext);
    const[btnToggleClass, setBtnToggleClass] = useState(false);
    const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    }, 0);

    const butClass = `${classes.button} ${btnToggleClass? classes.bump : ''}`;
    const itemLenght = cartCtx.items;
    useEffect(()=>{
        if(itemLenght.length === 0){
            return;
        }
        setBtnToggleClass(true);
        console.log('add bump!');
        const timer = setTimeout(()=>{
            setBtnToggleClass(false);
            console.log('Clear bump!');
        },300);

        return()=>{
            clearTimeout(timer);
            console.log('cleanup function');
        }
    },[itemLenght]);

    return(
        <button className={butClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}
export default HeaderCartButton;