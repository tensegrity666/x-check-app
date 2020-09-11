import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

const TableStudentsCell = ({ students }) => {
  return (
    <Space>
      {students && students.length > 0
        ? students.map((student, index) => {
            const IS_LAST = index === students.length - 1;
            return (
              <span key={student}>
                {student}
                {!IS_LAST && ', '}
              </span>
            );
          })
        : null}
    </Space>
  );
};

TableStudentsCell.propTypes = {
  students: PropTypes.arrayOf(PropTypes.string),
};

TableStudentsCell.defaultProps = {
  students: [],
};

export default TableStudentsCell;
