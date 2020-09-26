import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const ModalWindow = ({ modalVisible, setModalVisible, jsonTask }) => {
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
      <p>{jsonTask}</p>
    </Modal>
  );
};

ModalWindow.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  jsonTask: PropTypes.string.isRequired,
};

export default ModalWindow;
