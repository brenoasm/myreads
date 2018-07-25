import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  switchState: PropTypes.func
};

const defaultProps = {
  switchState: () => {},
  value: null
}

const Select = ({ children, value, switchState }) => (
  <select value={value} onChange={(event) => switchState(event.target.value)}>
    {children}
  </select>
);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
