import React from 'react';
import PropTypes from 'prop-types';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p className={classes.Price}>Current Price: {props.price.toFixed(2)}</p>
      {controls.map((ing) => (
        <BuildControl
          ingAdded={() => props.ingredientAdded(ing.type)}
          key={ing.label}
          label={ing.label}
          ingRemoved={() => props.ingredientRemoved(ing.type)}
          disabled={props.disabledInfo[ing.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        Order Now
      </button>
    </div>
  );
}

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabledInfo: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
};

export default BuildControls;
