import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserName } from 'common/js/util';

class UpDown extends React.Component {
  render() {
    let { code, key = 'code', biz } = this.props;
    const options = {
      fields: [{
        field: key,
        value: code,
        hidden: true
      }, {
        field: 'location',
        title: 'UI位置',
        type: 'select',
        data: [{
          key: '0',
          value: '普通'
        }, {
          key: '1',
          value: '首页推荐'
        }],
        keyName: 'key',
        valueName: 'value',
        required: true
      }, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
        help: '数字越小，排序越靠前',
        integer: true,
        maxlength: 30
      }],
      addCode: biz
    };
    return (
      <ModalDetail
        title='修改密码'
        visible={this.props.updownVisible}
        hideModal={() => this.props.setModalVisible(false)}
        options={options} />
    );
  }
}

export default UpDown;
