import React from "react";
import "./ProductCard.css";

const ProductCard = () => {
  const products = ["item1", "item2", "item2", "item2"];

  const productCard = products.map((prodcut, index) => (
    <div className="card" key={index}>{prodcut}</div>
  ));

  return productCard;
};

export default ProductCard;
