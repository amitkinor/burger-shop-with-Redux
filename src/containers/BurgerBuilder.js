/* eslint-disable react/state-in-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axiosInstance
      .get('/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;

    const updatedIngredients = { ...ingredients };

    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;

    const updatedIngredients = { ...ingredients };

    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    updatedIngredients[type] = updatedCount;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceSubtraction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => {
        return ingredients[ing];
      })
      .reduce((totalSum, el) => {
        return totalSum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseToggleHandler = (bool) => {
    this.setState({ purchasing: bool });
  };

  PurchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
    const { history } = this.props;
    const queryParams = [];
    for (const i in ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`,
      );
    }
    queryParams.push(`price=${totalPrice}`);
    const queryString = queryParams.join('&');
    history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    const {
      ingredients,
      purchasing,
      totalPrice,
      purchasable,
      loading,
      error,
    } = this.state;

    const disabledInfo = {
      ...ingredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burgerBundle = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
      burgerBundle = (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={purchasable}
            price={totalPrice}
            ordered={() => this.purchaseToggleHandler(true)}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={() => this.purchaseToggleHandler(false)}
          PurchaseContinue={this.PurchaseContinueHandler}
          price={totalPrice}
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
export default withErrorHandler(BurgerBuilder, axiosInstance);
