import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

function CheckoutSummary(props) {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Checkout Summary</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        Continue
      </Button>
    </div>
  );
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
