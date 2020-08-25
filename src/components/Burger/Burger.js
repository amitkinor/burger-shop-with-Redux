import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

function Burger(props) {
  const { ingredients } = props;

  /*
    1.  Creating an array with nested arrays the size of "amount"
    2.  Inserting <BurgerIngredient> in all cells
  */
  let transformedIngredients = Object.keys(ingredients)
    .map(ingKey => {
      //console.log(Array(ingredients[ingKey]));
      return [...Array(ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />
      }
      );
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);

  /*
    notifying the user to add ingrds if empty
  */
  if (transformedIngredients.length === 0){
    transformedIngredients = <p>Please start adding ingredients!</p>
  };


  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default Burger;

