import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  switchShelf: PropTypes.func
};

const defaultProps = {
  switchShelf: () => {},
  value: null
}

const Select = ({ children, value, switchShelf }) => (
  <select value={value} onChange={(event) => switchShelf(event.target.value)}>
    {children}
  </select>
);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
