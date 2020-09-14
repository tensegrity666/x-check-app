import React from 'react';
import { useParams } from 'react-router-dom';
import SessionAssignmentDialog from '../components/session-assignment-dialog';

const Sessions = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Crosscheck session#{id}</h1>
      <SessionAssignmentDialog />
    </>
  );
};

export default Sessions;
