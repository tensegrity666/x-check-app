import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';

import RequestsTable from './requests-table';

const RequestsContainer = ({ reviewRequests, requestsForUser, userId }) => {
  const { Content } = Layout;

  const history = useHistory();

  return (
    <Layout>
      <Content>
        <PageHeader onBack={() => history.goBack()} title="Review Requests" />
        <RequestsTable
          reviewRequests={requestsForUser}
          userId={userId}
          title="Review Requests You Need to Review"
        />
        <RequestsTable
          reviewRequests={reviewRequests}
          userId={userId}
          title="All Review Requests"
        />
      </Content>
    </Layout>
  );
};

RequestsContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  reviewRequests: PropTypes.arrayOf(PropTypes.object),
  requestsForUser: PropTypes.arrayOf(PropTypes.object),
};

RequestsContainer.defaultProps = {
  reviewRequests: [],
  requestsForUser: [],
};

export default RequestsContainer;
