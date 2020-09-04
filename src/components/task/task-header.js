import React from 'react';
import { PageHeader, Tag, Button, Statistic, Row } from 'antd';

const TaskHeader = () => {
  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title="Вернуться к профилю"
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
          <Statistic title="Status" value="Pending" />
          <Statistic
            title="Price"
            prefix="$"
            value={568.08}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic title="Balance" prefix="$" value={3345.08} />
        </Row>
      </PageHeader>
    </>
  );
};

export default TaskHeader;
