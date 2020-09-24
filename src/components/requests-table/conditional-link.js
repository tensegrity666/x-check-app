import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const ConditionalLink = ({ isDisabled, slug }) => {
  return (
    <RouterLink to={`/reviews/edit?request=${slug}`} disabled={isDisabled}>
      Review
    </RouterLink>
  );
};

ConditionalLink.propTypes = {
  slug: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

ConditionalLink.defaultProps = {
  isDisabled: false,
};

export default ConditionalLink;
