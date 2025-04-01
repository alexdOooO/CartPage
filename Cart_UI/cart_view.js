import React, { useState } from 'react';
import './../../../sass/components/cart_view.scss';
import productImage from '../../../../resources/sass/img/tuf.svg';
import Header from '../HeaderContent/header';
import { IconX } from '@tabler/icons-react';
import CartEmpty from '../CartContent/cart_empty';
import { useNavigate } from 'react-router-dom';

const CartView = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "ASUS TUF GAMING A14",
      price: 2500,
      quantity: 1,
      image: productImage
    }
  ]);

  const navigate = useNavigate();

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Increment quantity
  const incrementQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrement quantity (prevent going below 1)
  const decrementQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="cart-view">
      <Header />
      <div className="cart-content">
        <h1 className="cart-title">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <CartEmpty onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="cart-container">
            <div className="cart-table-container">
              <div className="cart-table">
                <div className="cart-header">
                  <div className="header-item product-col">Product</div>
                  <div className="header-item">Price</div>
                  <div className="header-item">Quantity</div>
                  <div className="header-item">Subtotal</div>
                  <div className="header-item action-col"></div>
                </div>
                
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-details product-col">
                      <img src={item.image} alt={item.name} className="product-image" />
                      <div className="product-name">{item.name}</div>
                    </div>
                    <div className="item-price">₱{item.price.toLocaleString()}</div>
                    <div className="item-quantity">
                      <div className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() => decrementQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => incrementQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-subtotal">₱{(item.price * item.quantity).toLocaleString()}</div>
                    <div className="item-remove">
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <IconX size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cart-totals-container">
              <div className="cart-totals">
                <h2 className="totals-title">Cart Totals</h2>
                
                <div className="totals-row">
                  <span className="totals-label">Subtotal</span>
                  <span className="totals-value">₱{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="shipping-section">
                  <div className="shipping-title">Shipping to:</div>
                  <div className="shipping-address">
                    Purok 6 960-B RCES, Baan riverside. (Bgy. 19)<br />
                    Butuan City, Mindanao, Agusan Del Norte 8600
                  </div>
                  <button className="change-address-btn">Change address</button>
                </div>
                
                <div className="totals-row grand-total">
                  <span className="totals-label">Total</span>
                  <span className="totals-value">₱{subtotal.toLocaleString()}</span>
                </div>
                
                <button className="checkout-button">Proceed to checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
