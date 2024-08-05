import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
// import { addProductToCart, updateProductQuantity, removeProductFromCart } from './store/store.js';
import { addProductToCart, updateProductQuantity, removeProductFromCart} from "../store/store";

const Product = ({ id, title, price, description, category, image, rating, discountPercentage, stock, brand, thumbnail }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const productInCart = cart.find(item => item.id === id) || {};
  const [quantity, setQuantity] = useState(productInCart.quantity || 1);
  const priceAfterDiscount = (price - price * (discountPercentage / 100)).toFixed(2);
  const [subTotal, setSubTotal] = useState((priceAfterDiscount * quantity).toFixed(2));

  useEffect(() => {
    setSubTotal((priceAfterDiscount * quantity).toFixed(2));
  }, [quantity, priceAfterDiscount]);

  const handleQuantitySub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateProductQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
    dispatch(updateProductQuantity({ id, quantity: quantity + 1 }));
  };

  const handleAddToCart = () => {
    dispatch(addProductToCart({ id, title, price, description, category, image, rating, discountPercentage, stock, brand, thumbnail, quantity }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <div className="col-12 d-flex justify-content-center align-items-center">
      <div className="card mb-3" style={{ width: "80%", borderRadius: "20px" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <img src={thumbnail} className="img-fluid product-img" alt={title} style={{ borderRadius: "30px" }} />
          </div>
          <div className="col-md-7">
            <div className="row g-0">
              <div className="col-md">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title">{title}</h5>
                    </div>
                    <div className="col">
                      <h5 className="card-title d-flex justify-content-end">
                        ${price}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">
                        <b>Brand: </b>{brand}
                      </p>
                    </div>
                    <div className="col">
                      <p className="card-text">
                        <b>Stock: </b>{stock}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">{description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col d-flex align-items-center">
                      <h5 className="review-stat">
                        Rating: {rating}
                      </h5>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                      <div>
                        <button className="btn btn-secondary" onClick={handleQuantitySub}>-</button>
                        <span> {quantity} </span>
                        <button className="btn btn-secondary" onClick={handleQuantityAdd}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col card-text d-flex align-items-center">
                      <small className="text-muted d-flex align-items-center">
                        Last updated 3 mins ago
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0 p-4 subtotal">
              <div className="col">
                <div className="row">
                  <div className="card-title col">
                    Original Price (1 item):
                  </div>
                  <div className="card-title col text-end">${price}</div>
                </div>
                <div className="row">
                  <div className="card-title col text-success">
                    Discount Amount:
                  </div>
                  <div className="card-title col text-end text-success">
                    ${(price * (discountPercentage / 100)).toFixed(2)}
                  </div>
                </div>
                <div className="row">
                  <div className="card-title col">
                    Final Price (1 item):
                  </div>
                  <div className="card-title col text-end">
                    ${priceAfterDiscount}
                  </div>
                </div>
                <div className="row">
                  <div className="card-title col">
                    <h5>Total Price:</h5>
                  </div>
                  <div className="card-title col text-end">
                    <h5>${subTotal}</h5>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                {productInCart.quantity ? (
                  <button className="btn btn-secondary" onClick={handleRemoveFromCart}>Remove from Cart</button>
                ) : (
                  <button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Product;
