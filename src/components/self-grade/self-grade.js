/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  PageHeader,
  Layout,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Row,
  Col,
} from 'antd';
import { CATEGORIES, RATES } from './constants';
import styles from './index.module.css';

const SelfGrade = ({
  state,
  loading,
  handleSelectChange,
  history,
  commentTaskItem,
  inputValue,
  onTextChange,
  onSelfGradeSubmit,
  deployLink,
  setDeployLink,
  prLink,
  setPrLink,
}) => {
  const { Content } = Layout;
  const { TextArea } = Input;
  const { Option } = Select;
  const { Column } = Table;

  const { items, taskTitle, deadline, maxScore, totalScore } = state;
  const { fines } = CATEGORIES;
  const { nope, partially, fully } = RATES;
  const { wrapper, textArea, inputLink, pageWrapper } = styles;

  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  const scores = (
    <>
      <span style={{ color: 'green' }}>maximum score: {maxScore} /</span>
      <span style={{ color: 'tomato' }}> current score: {totalScore}</span>
    </>
  );

  return (
    <Layout>
      <PageHeader
        className={pageWrapper}
        onBack={() => history.goBack()}
        title={`${taskTitle}, deadline: ${deadline}`}
        subTitle={scores}
      />
      <Content className={pageWrapper}>
        <Table
          pagination={{ defaultPageSize: 150 }}
          rowKey="uid"
          loading={loading}
          dataSource={items}>
          <Column key="1" title="Score" dataIndex="score" />
          <Column key="2" title="Min" dataIndex="minScore" />
          <Column key="3" title="Max" dataIndex="maxScore" />
          <Column
            key="4"
            title="Category"
            dataIndex="category"
            render={(category) => (
              <Tag color={category === fines ? 'volcano' : 'blue'}>
                {category.toUpperCase()}
              </Tag>
            )}
          />
          <Column
            width="30%"
            key="5"
            title="Description"
            dataIndex="description"
          />
          <Column
            width="30%"
            key="6"
            title="Add comment"
            render={(record) => (
              <TextArea
                placeholder="Leave a comment..."
                allowClear
                onChange={({ target: { value } }) =>
                  commentTaskItem(record.id, value)
                }
              />
            )}
          />
          <Column
            key="7"
            title="Result"
            render={(record) => (
              <Space size="middle">
                <span>{record.category === fines ? 'Fines:' : 'Done: '}</span>
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={(value) =>
                    handleSelectChange(
                      record.id,
                      record.maxScore,
                      record.minScore,
                      record.category,
                      value
                    )
                  }>
                  <Option value={nope}>
                    {record.category === fines ? 'Not working' : 'No'}
                  </Option>
                  <Option value={partially}>Partially</Option>
                  <Option value={fully}>
                    {record.category === fines ? 'Without fines' : 'Fully'}
                  </Option>
                </Select>
              </Space>
            )}
          />
        </Table>
        <Row justify="start">
          <Input
            className={inputLink}
            addonBefore={selectBefore}
            placeholder="Link to Pull Request"
            value={prLink}
            onChange={({ target: { value } }) => setPrLink(value)}
          />
          <Input
            className={inputLink}
            addonBefore={selectBefore}
            placeholder="Link to deployed project"
            value={deployLink}
            onChange={({ target: { value } }) => setDeployLink(value)}
          />
        </Row>
        <Row justify="space-between" className={wrapper}>
          <TextArea
            className={textArea}
            placeholder="Add comment to reviewer"
            rows={7}
            onChange={({ target: { value } }) => onTextChange(value)}
            value={inputValue}
          />
          <Col style={{ width: '18%' }}>
            <Button
              style={{ marginBottom: '30px' }}
              onClick={onSelfGradeSubmit}
              type="primary"
              block>
              Save and submit
            </Button>
            <Button type="default" block>
              Save draft
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

SelfGrade.propTypes = {
  state: PropTypes.PropTypes.object.isRequired,
  history: PropTypes.PropTypes.object.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  commentTaskItem: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  deployLink: PropTypes.string.isRequired,
  prLink: PropTypes.string.isRequired,
  setDeployLink: PropTypes.func.isRequired,
  setPrLink: PropTypes.func.isRequired,
  onSelfGradeSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  loading: PropTypes.PropTypes.bool.isRequired,
};

export default SelfGrade;
