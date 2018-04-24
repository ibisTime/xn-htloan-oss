import React from 'react';
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
import { O2MDetailWrapper } from 'common/js/build-o2m-detail';

@O2MDetailWrapper(
  state => state.modalDetail,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
export default class ModalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.props.restore();
  }
  handleCancel = () => {
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
    options = {
      ...options,
      okText,
      cancelText,
      onOk: this.handleCancel
    };
    if (options.buttons) {
      options.buttons = options.buttons.map(v => ({
        ...v,
        handler: (params) => {
          v.handler(params, this.props.doFetching, this.props.cancelFetching, this.handleCancel);
        }
      }));
      options.buttons.push({
        title: cancelText || '取消',
        handler: this.handleCancel
      });
    } else {
      options.onCancel = this.handleCancel;
    }
    return (
      <Modal
        className="build-modal-detail"
        destroyOnClose
        visible={visible}
        title={title}
        onCancel={this.handleCancel}
        style={{minWidth: 820}}
        footer={null}>
        {this.props.buildDetail(options)}
      </Modal>
    );
  }
}
