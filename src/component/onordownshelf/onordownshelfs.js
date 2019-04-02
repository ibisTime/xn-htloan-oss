import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

export default class OnOrDownShelf extends React.Component {
  render() {
    const options = {
      fields: [{
        field: 'code',
        value: this.props.selectKey,
        hidden: true
      }, {
        field: 'location',
        title: 'UI位置',
        type: 'select',
        data: [{
          key: 0,
          value: '首页推荐'
        }, {
          key: 1,
          value: '普通'
        }],
        keyName: 'key',
        valueName: 'value',
        value: 0,
        required: true
      }, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
        help: '数字越小，排序越靠前',
        integer: true,
        maxlength: 30
      }],
      addCode: this.props.addCode,
      onOk: () => {
        this.props.onOk && this.props.onOk();
      }
    };
    return (
      <ModalDetail
        title='上架'
        visible={this.props.shelfVisible}
        hideModal={() => this.props.setShelfVisible(false)}
        options={options} />
    );
  }
}
