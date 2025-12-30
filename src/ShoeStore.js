import React, { useState } from "react";

const shoes = [
  { id: 1, name: "Running Shoes", price: 100, image: "https://media.istockphoto.com/id/1337191336/photo/black-fashion-sport-shoe-on-white-background.jpg?s=612x612&w=0&k=20&c=7Z8JNZ-nDPpDMHC7olOXrQm6uT3fG9Ya3h8uh_hpVbw=" },
  { id: 2, name: "Sneakers", price: 80, image: "https://media.istockphoto.com/id/1417090656/photo/white-leather-sneaker.jpg?s=612x612&w=0&k=20&c=mF0ZLSz0DKnuVgR1KEPhPnGV4xTvWB2R_zsWJIKoko0=" },
  { id: 3, name: "Boots", price: 120, image: "https://media.istockphoto.com/id/474862754/photo/yellow-boots.jpg?s=612x612&w=0&k=20&c=wlaxHn6a5BOjOPGi92VypLutLfumhp6Woru6P_gFAww=" }
];

function ShoeStore() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    const found = cart.find((item) => item.id === shoe.id);
    if (found) {
      setCart(
        cart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }
  };

  const removeFromCart = (shoe) => {
    const found = cart.find((item) => item.id === shoe.id);
    if (found.quantity === 1) {
      setCart(cart.filter((item) => item.id !== shoe.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          display: flex;
          flex-direction: row;
          gap: 40px;
          padding: 20px;
          min-height: 100vh;
        }
        @media (max-width: 900px) {
          .container {
            flex-direction: column;
            padding: 15px;
          }
        }
        .shoes-section, .cart-section {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .section-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #2874f0;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .shoes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
          gap: 20px;
        }
        @media (max-width: 500px) {
          .shoes-grid {
            grid-template-columns: repeat(auto-fill,minmax(140px,1fr));
            gap: 15px;
          }
        }
        .shoe-card {
          background-color: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .shoe-card:hover, .shoe-card:focus {
          transform: translateY(-5px);
          outline: none;
        }
        .shoe-image {
          width: 100%;
          max-width: 150px;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .shoe-name {
          margin: 5px 0;
          font-size: 1.1rem;
          text-align: center;
        }
        .shoe-price {
          margin: 5px 0;
          font-weight: bold;
          font-size: 1rem;
        }
        .add-btn {
          margin-top: auto;
          width: 100%;
          padding: 10px;
          border: none;
          background-color: #2874f0;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1em;
          transition: background-color 0.3s;
        }
        .add-btn:hover, .add-btn:focus {
          background-color: #165dc1;
          outline: none;
        }
        .cart-empty {
          font-style: italic;
          color: #666;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .cart-item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .cart-item-details {
          margin-left: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-item-name {
          margin: 5px 0;
          font-size: 1.1rem;
        }
        .cart-item-price {
          margin: 5px 0;
          font-size: 1rem;
          color: #333;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }
        .qty-btn {
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          color: white;
          font-size: 1rem;
          user-select: none;
          transition: background-color 0.3s;
        }
        .qty-btn.decrease {
          background-color: #dc3545;
        }
        .qty-btn.decrease:hover, .qty-btn.decrease:focus {
          background-color: #a72832;
          outline: none;
        }
        .qty-btn.increase {
          background-color: #28a745;
        }
        .qty-btn.increase:hover, .qty-btn.increase:focus {
          background-color: #1f7633;
          outline: none;
        }
        .quantity-display {
          font-weight: bold;
          min-width: 25px;
          text-align: center;
          font-size: 1rem;
        }
        .cart-total {
          margin-top: auto;
          border-top: 2px solid #2874f0;
          padding-top: 15px;
          font-size: 1.3rem;
          font-weight: 700;
          text-align: right;
        }
        @media (max-width: 420px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .cart-item-image {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
          }
          .cart-item-details {
            margin-left: 0;
            width: 100%;
          }
          .quantity-controls {
            justify-content: flex-start;
          }
          .cart-total {
            text-align: left;
          }
        }
      `}</style>
      <div className="container" role="main">
        {/* Available Shoes Section */}
        <section className="shoes-section" aria-label="Available Shoes">
          <h2 className="section-header">Available Shoes</h2>
          <div className="shoes-grid">
            {shoes.map((shoe) => (
              <div
                key={shoe.id}
                className="shoe-card"
                onClick={() => addToCart(shoe)}
                onKeyPress={(e) => e.key === "Enter" && addToCart(shoe)}
                tabIndex={0}
                role="button"
                aria-pressed="false"
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="shoe-image"
                />
                <h4 className="shoe-name">{shoe.name}</h4>
                <p className="shoe-price">${shoe.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(shoe);
                  }}
                  className="add-btn"
                  aria-label={`Add ${shoe.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Shopping Cart Section */}
        <section className="cart-section" aria-label="Shopping Cart">
          <h2 className="section-header">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">${item.price}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="qty-btn decrease"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="qty-btn increase"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default ShoeStore;
