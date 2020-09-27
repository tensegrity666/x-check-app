import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import store from '../../redux/store';

const ModalWindow = ({ modalVisible, setModalVisible }) => {
  const task = store.getState().taskReducer;
  const jsonTask = JSON.stringify(task, null, '\t');

  return (
    <Modal
      title=""
      centered
      bodyStyle={{ width: '100%' }}
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setModalVisible(false)}>
          Return
        </Button>,
      ]}>
      <pre>{jsonTask}</pre>
    </Modal>
  );
};

ModalWindow.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default ModalWindow;
