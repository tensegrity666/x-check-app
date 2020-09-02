import React from 'react';
import { useParams } from 'react-router-dom';

const ReviewerDetails = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Reviewer#{id} details</h1>
    </>
  );
};

export default ReviewerDetails;
