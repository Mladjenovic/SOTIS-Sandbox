import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  // get's triggered when the component reloads or state value changes
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]); // empty [] means that we want this to tirgger only when the component loads not when the state changes

  return (
    <div>
      <h1>Latest products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
