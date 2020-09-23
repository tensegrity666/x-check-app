import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, PageHeader } from 'antd';

const Review = () => {
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParam = new URLSearchParams(search).get('request');
    console.log(searchParam);
  }, [search]);

  return (
    <Layout>
      <PageHeader onBack={history.goBack} title="Review" />
    </Layout>
  );
};

export default Review;
