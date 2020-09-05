import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader, Tag, Button, Statistic, Row } from 'antd';

const TaskHeader = ({ taskIndex }) => {
  const total = useSelector(
    ({ taskReducer }) => taskReducer[taskIndex].totalScore
  );
  const date = useSelector(
    ({ taskReducer }) => taskReducer[taskIndex].dateOfCreate
  );
  const title = useSelector(
    ({ taskReducer }) => taskReducer[taskIndex].taskTitle
  );

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title="Редактирование задания"
        tags={<Tag color="blue">Изменено</Tag>}
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">Очистить</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Сохранить
          </Button>,
        ]}>
        <Row>
          <Statistic title="Название задания" value={title} />
          <Statistic
            title="Total score"
            value={total}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic title="Date" value={date} />
        </Row>
      </PageHeader>
    </>
  );
};

TaskHeader.propTypes = {
  taskIndex: PropTypes.number.isRequired,
};

export default TaskHeader;
