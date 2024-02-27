import React from "react";
import "./Products.css";
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  return (
    <div className="products">
      <h3>Products</h3>
      <div className="allProducts">
        <ProductCard />
      </div>
    </div>
  );
};

export default Products;
