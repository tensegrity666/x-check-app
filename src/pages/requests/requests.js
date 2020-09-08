import React from 'react';
import RequestsTable from './components/requests-table';
import './requests.css';

const Requests = () => {
  return (
    <div className="review-requests">
      <h1>Review Requests</h1>
      <RequestsTable />
    </div>
  );
};

export default Requests;
