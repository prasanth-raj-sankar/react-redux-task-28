import React, { useState } from "react";
import Product from "./Product";
import data from "./data.json";
import { useSelector } from 'react-redux';

const Header = () => {
    const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">All Products</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-dark" type="button">
              <i className="fa fa-shopping-cart me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
      
      <div className="container mt-5">
        <div className="row">
          {data.products.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              rating={item.rating}
              discountPercentage={item.discountPercentage}
              stock={item.stock}
              brand={item.brand}
              thumbnail={item.thumbnail}
            //   addToFavorites={handleAddFavorites}
            //   removeFromFavorites={removeFromFavorites}
              isFavorite={Boolean(cart.find((f) => f.id === item.id))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
