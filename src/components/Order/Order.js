import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.module.css';

function Order(props) {
  const { price, ingredients } = props;
  let jsxIngsArr = [];
  jsxIngsArr = ingredients.map((ing) => {
    return (
      <p>
        {' '}
        {ing[0]} : {ing[1]}{' '}
      </p>
    );
  });

  const sprJsxIngs = [...jsxIngsArr];

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {sprJsxIngs}
      </span>
      <p>
        Price: <strong>{price.toFixed(2)}</strong>
      </p>
    </div>
  );
}

Order.propTypes = {
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
};

export default Order;
