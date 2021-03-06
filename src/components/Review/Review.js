import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
  const [cart,setCart] = useState([]);
  const [orderPlace,setOrderPlace] = useState(false)
const handlePlaceholder = () =>{
  setCart([]);
  setOrderPlace(true);
 processOrder();
}


  const RemoveProduct = (productKey)=>{
   
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }
  useEffect(()=>{
    //cart data
    const saveCart =getDatabaseCart();
    const productKeys =Object.keys(saveCart);
   const cartProducts= productKeys.map(key =>{
     const product = fakeData.find(pd =>pd.key ===key);
     product.quantity = saveCart[key];
     return product;
   });
    setCart(cartProducts);
  },[]);
  let thankYou;
  if(orderPlace){
thankYou =<img src={happyImage} alt=""/>
  }
    return (
        <div className="twin-container">
          <div className="product-container">
            { 
            
              cart.map(pd =><ReviewItem 
                key ={pd.key}
                RemoveProduct = {RemoveProduct}
                product={pd}></ReviewItem> )
              }
              {thankYou}
                
          </div>
          <div className="cart-container">
          <Cart cart={cart}>
            <button
             className="main-button"
             onClick={handlePlaceholder}
             >Place-Order</button>
          </Cart>
          </div>
        </div>
    );
};

export default Review;