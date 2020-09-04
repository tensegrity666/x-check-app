import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ onDeleted, onToggleImportant }) => {
  return (
    <div className="btn-group" role="group" aria-label="delete or mark task">
      <button
        type="button"
        className="btn btn-danger btn-lg"
        onClick={onDeleted}>
        <span className="visually-hidden">delete task</span>
        <i className="fa fa-trash-o" />
      </button>
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={onToggleImportant}>
        <span className="visually-hidden">mark as important</span>
        <i className="fa fa-exclamation" />
      </button>
    </div>
  );
};

ButtonGroup.propTypes = {
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
};

ButtonGroup.defaultProps = {
  onDeleted: () => {},
  onToggleImportant: () => {},
};

export default ButtonGroup;
