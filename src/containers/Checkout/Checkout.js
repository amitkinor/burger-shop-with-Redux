import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.module.css';


class Checkout extends Component {
  
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price'){
        price = param[1];
      } else{
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, price });
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    const { ingredients, price } = this.state;
    const { match } = this.props;
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${match.path}/contact-data`}
          render={(props) => (
            <ContactData ingredients={ingredients} price={price} {...props} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
