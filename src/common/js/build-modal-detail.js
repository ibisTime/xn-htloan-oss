import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Button } from 'antd';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/modal/build-modal-detail';
import fetch from 'common/js/fetch';
import DetailComp from './lib/DetailComp';

class ModalDetail extends DetailComp {
  constructor(props) {
    super(props);
    this.props.restore();
  }
  handleCancelModal = () => {
    let { hideModal } = this.props;
    hideModal && hideModal();
  }
  render() {
    let {
      cancelText = '取消',
      okText = '确认',
      visible = false,
      title = '标题',
      fetching,
      options = {}
    } = this.props;
    if (options.onOk) {
      let onOk = options.onOk;
      options.onOk = (data) => {
        onOk(data, this.props.form.getFieldsValue());
        this.handleCancelModal();
      };
    }
    options = {
      onOk: this.handleCancelModal,
      ...options,
      okText,
      cancelText
    };
    if (options.buttons) {
      options.buttons = options.buttons.map(v => ({
        ...v,
        handler: (params) => {
          v.handler(params, this.props.doFetching, this.props.cancelFetching, this.handleCancelModal);
        }
      }));
      options.buttons.push({
        title: cancelText || '取消',
        handler: this.handleCancelModal
      });
    } else {
      options.onCancel = this.handleCancelModal;
    }
    return (
      <Modal
        className="build-modal-detail"
        destroyOnClose
        visible={visible}
        title={title}
        onCancel={this.handleCancelModal}
        style={{minWidth: 820}}
        footer={null}>
        {this.buildDetail(options)}
      </Modal>
    );
  }
}

export default Form.create()(
  connect(state => state.modalDetail,
    { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
  )(ModalDetail));
