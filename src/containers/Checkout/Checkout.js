import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.module.css';

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const { match, redIngredients } = this.props;
    return (
      <div className={classes.Checkout}>
        <CheckoutSummary
          ingredients={redIngredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redIngredients: state.ingredients,
  redTotalPrice: state.totalPrice,
});

export default connect(mapStateToProps)(Checkout);
