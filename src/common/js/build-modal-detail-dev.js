import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal } from 'antd';
import DetailComp from 'common/js/lib/DetailComp';

class ModalDetail extends DetailComp {
  handleCancelModal = () => {
    let { hideModal } = this.props;
    hideModal && hideModal();
  }
  onCancel = () => {
    this.setState({ pageData: null, isLoaded: false });
    this.handleCancelModal();
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
          this.setState({ pageData: null, isLoaded: false });
          v.handler(params, this.doFetching, this.cancelFetching, this.handleCancelModal);
        }
      }));
      options.buttons.push({
        title: cancelText || '取消',
        handler: () => {
          options.beforeCancel && options.beforeCancel();
          this.onCancel();
        }
      });
    } else {
      options.onCancel = this.onCancel;
    }
    return (
      <Modal
        className="build-modal-detail"
        destroyOnClose
        visible={visible}
        title={title}
        onCancel={this.onCancel}
        style={{minWidth: 820}}
        footer={null}>
        {this.buildDetail(options)}
      </Modal>
    );
  }
}

export default Form.create()(ModalDetail);
