/* eslint-disable react/state-in-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axiosInstance
    //   .get('/ingredients.json')
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => {
        return ingredients[ing];
      })
      .reduce((totalSum, el) => {
        return totalSum + el;
      }, 0);
    return sum > 0;
  };

  purchaseToggleHandler = (bool) => {
    this.setState({ purchasing: bool });
  };

  PurchaseContinueHandler = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const { purchasing, loading, error } = this.state;
    const {
      addIngredientHandler,
      removeIngredientHandler,
      redIngredients,
      redTotalPrice,
    } = this.props;

    const disabledInfo = {
      ...redIngredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burgerBundle = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (redIngredients) {
      burgerBundle = (
        <>
          <Burger ingredients={redIngredients} />
          <BuildControls
            ingredientAdded={(type) => addIngredientHandler(type)}
            ingredientRemoved={removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(redIngredients)}
            price={redTotalPrice}
            ordered={() => this.purchaseToggleHandler(true)}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={redIngredients}
          purchaseCancelled={() => this.purchaseToggleHandler(false)}
          PurchaseContinue={this.PurchaseContinueHandler}
          price={redTotalPrice}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={purchasing}
          modalClosed={() => this.purchaseToggleHandler(false)}
        >
          {orderSummary}
        </Modal>
        {burgerBundle}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  redIngredients: state.ingredients,
  redTotalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  removeIngredientHandler: (ingredientName) =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  addIngredientHandler: (ingredientName) =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axiosInstance));
