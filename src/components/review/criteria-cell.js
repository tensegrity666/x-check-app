import React from 'react';
import PropTypes from 'prop-types';

const CriteriaCell = ({ title, description }) => {
  return (
    <>
      <b>{title}</b>
      <p>{description}</p>
    </>
  );
};

CriteriaCell.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CriteriaCell;
