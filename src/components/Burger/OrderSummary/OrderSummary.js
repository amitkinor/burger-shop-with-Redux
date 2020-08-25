import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    const {
      price,
      purchaseCancelled,
      PurchaseContinue,
      ingredients,
    } = this.props;

    const ingredientSummary = Object.keys(ingredients).map((ing) => {
      return (
        <li key={ing}>
          <span style={{ textTransform: 'capitalize' }}>{ing}</span>:
          {ingredients[ing]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order</h3>
        <p>1 burger with:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout</p>
        <Button clicked={purchaseCancelled} btnType="Danger">
          Cancel
        </Button>
        <Button clicked={PurchaseContinue} btnType="Success">
          Checkout
        </Button>
      </>
    );
  }
}

OrderSummary.propTypes = {
  purchaseCancelled: PropTypes.func.isRequired,
  PurchaseContinue: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderSummary;
