import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

// eslint-disable-next-line react/prefer-stateless-function
export default class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { show, children } = this.props;
    return nextProps.show !== show || nextProps.children !== children;
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </>
    );
  }
}
