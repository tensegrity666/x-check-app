import React from 'react';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Divider, Avatar } from 'antd';

const { Meta } = Card;

const ReviewerDetails = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Reviewer#{id} details</h1>
      <Divider />
      <Row>
        <Col>
          <UserOutlined style={{ marginTop: 24 }} />
        </Col>
        <Col span={20}>
          <Card bordered={false}>
            <Meta
              avatar={
                <Avatar
                  src="https://github.com/newqwes.png?size=48"
                  style={{ width: 24, height: 24 }}
                />
              }
              title="Reviewer#1"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewerDetails;
