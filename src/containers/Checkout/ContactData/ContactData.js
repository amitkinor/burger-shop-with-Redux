/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Forms/Input/Input';

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        value: '',
        name: 'name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        value: '',
        name: 'street',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zip: {
        value: '',
        name: 'ZIP Code',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        validation: {
          required: true,
          minLength: 2,
          maxLength: 8,
        },
        valid: false,
        touched: false,
      },
      country: {
        value: '',
        name: 'country',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        value: '',
        name: 'email',
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        value: 'fastest',
        name: 'deliveryMethod',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', selected: 'selected', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const { ingredients, price, history } = this.props;
    const { orderForm } = this.state;
    this.setState({ loading: true });

    const formData = {};
    for (const iter in orderForm) {
      formData[iter] = orderForm[iter].value;
    }

    const order = {
      ingredients,
      price,
      orderData: formData,
    };

    axiosInstance
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;
    const updatedFormData = { ...orderForm };
    const updateFormElement = { ...updatedFormData[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation,
    );
    updateFormElement.touched = true;
    updatedFormData[inputIdentifier] = updateFormElement;

    let curFormIsValid = true;
    for (const inputToCheck in updatedFormData) {
      if (!updatedFormData[inputToCheck].valid) {
        curFormIsValid = false;
      }
    }
    console.log(curFormIsValid);
    this.setState({ orderForm: updatedFormData, formIsValid: curFormIsValid });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if(!rules){
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength && rules.maxLength) {
      isValid =
        value.length >= rules.minLength &&
        (isValid = value.length <= rules.maxLength);
    }

    return isValid;
  }

  render() {
    const { loading, orderForm, formIsValid } = this.state;
    const formInputs = [];
    const orderFormKeys = Object.keys(orderForm);
    orderFormKeys.map((iter) => {
      formInputs.push(
        <Input
          elementType={orderForm[iter].elementType}
          elementConfig={orderForm[iter].elementConfig}
          valid={orderForm[iter].valid}
          shouldValidate={orderForm[iter].validation}
          label={orderForm[iter].name}
          id={iter}
          key={iter}
          value={orderForm[iter].value}
          touched={orderForm[iter].touched}
          inputChangedHandler={(e) => this.inputChangedHandler(e, iter)}
        />,
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputs}
        <Button disabled={!formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}
