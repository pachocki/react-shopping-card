//Importing everything what it's needed
import React from 'react'
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
//Taking information from api*
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;
// Sort Cards from Low to Hight Price 
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
// Showing Cards by how many in stock 
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
// Showing Cards by Fast Deliver
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }
// Showing Cards by rating
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }
// Showing Cards by Searching 
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <div className="home">
    <Filters/>
        <div className="product-container">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
        </div>
    </div>
    
    
)
}

export default Home;
