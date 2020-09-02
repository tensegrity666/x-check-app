import React from 'react';
import { useParams } from 'react-router-dom';

const Session = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Crosscheck session#{id}</h1>
    </>
  );
};

export default Session;
