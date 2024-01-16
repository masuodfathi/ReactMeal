import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShowen, setCartIsShowen] = useState(false);

  const showCartHandler = () => {
    setCartIsShowen(!cartIsShowen);
  }
  return (
    <CartProvider>
      {cartIsShowen && <Cart onClose={showCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
