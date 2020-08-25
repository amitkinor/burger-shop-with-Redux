/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        this.setState({ loading: false });
        // const ordersStrings = Object.keys(res.data);
        const readyOrders = [];
        for (const iter in res.data) {
          readyOrders.push({
            ingredients: res.data[iter].ingredients,
            price: res.data[iter].price,
            key: iter,
          });
        }
        this.setState({ orders: readyOrders });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { orders, loading } = this.state;
    let jsxOrders = [];
    if (!loading) {
      jsxOrders = orders.map((order) => {
        const ingsArr = Object.entries(order.ingredients);
        return (
          <Order ingredients={ingsArr} price={+order.price} key={order.key} />
        );
      });
    }
    return <div>{jsxOrders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
