import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

function BuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <button
        className={classes.Less}
        onClick={props.ingRemoved}
        disabled={props.disabled}>
          Less
      </button>
      <div className={classes.Label}>
        {props.label}
      </div>
      <button
        className={classes.More}
        onClick={props.ingAdded}>
          More
      </button>
    </div>
  )
};

BuildControl.propTypes = {
  label : PropTypes.string.isRequired,
  ingAdded : PropTypes.func.isRequired,
  ingRemoved : PropTypes.func.isRequired
};

export default BuildControl;

