//Importing all stuff needed
import React from 'react'
import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";
import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';
const Cart = createContext();
faker.seed(99);
//Mapping over information from API and create Array
const Context = ({ children }) => {
  const products = [...Array(12)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.company.bsAdjective(),
    price: faker.commerce.price(100, 700, 0),
    image: faker.image.abstract(0, 0, true),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));
//States and Reducers
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [productState,productDispatch] = useReducer(productReducer,{
    byStock:false,
    byFastDelivery:false,
    byRating:0,
    searchQuery:"",
  });


  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;