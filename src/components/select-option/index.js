import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  disabled: PropTypes.bool,
  text: PropTypes.string
};

const defaultProps = {
  value: null,
  disabled: false,
  text: ''
}

const Option = ({ value, disabled, text }) => (
  <option
    disabled={disabled}
    value={value}>
    {text}
  </option>
);

Option.defaultProps = defaultProps;
Option.propTypes = propTypes;

export default Option;
