import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import Button from './HeaderCartButton';

const Header = props =>{
    return(
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <Button onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']} >
                <img src={mealsImage} alt="a table full of meals"/>
            </div>
        </>
    )
};

export default Header;