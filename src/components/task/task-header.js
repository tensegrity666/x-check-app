import React from 'react';
import { useSelector } from 'react-redux';
import { PageHeader, Tag, Button, Statistic, Row } from 'antd';

const TaskHeader = () => {
  const total = useSelector(({ taskReducer }) => taskReducer.totalScore);
  const date = useSelector(({ taskReducer }) => taskReducer.dateOfCreate);
  const title = useSelector(({ taskReducer }) => taskReducer.taskTitle);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title="Редактирование задания"
        tags={<Tag color="blue">Изменено</Tag>}
        subTitle="This is a subtitle"
        extra={[
          <Button danger key="2">
            Удалить
          </Button>,
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

export default TaskHeader;
