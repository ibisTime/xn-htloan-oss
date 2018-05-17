import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserName, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';

class EnchashmentHuilu extends React.Component {
  approve(params, payResult) {
    params.payResult = payResult;
    params.payUser = getUserName();
    params.codeList = this.props.codeList;
    this.props.doFetching();
    fetch(802753, params).then(() => {
      this.props.cancelFetching();
      showSucMsg('操作成功');
    }).catch(this.props.cancelFetching);
  }
  render() {
    const options = {
      fields: [{
        field: 'payNote',
        title: '回录说明',
        maxlength: 250,
        required: true
      }],
      buttons: [{
        title: '通过',
        handler: (params) => {
          this.approve(params, 1);
        },
        check: true
      }, {
        title: '不通过',
        handler: (params) => {
          this.approve(params, 0);
        },
        check: true
      }]
    };
    return (
      <ModalDetail
        title='修改密码'
        visible={this.props.visible}
        hideModal={() => this.props.setModalVisible(false)}
        options={options} />
    );
  }
}

export default EnchashmentHuilu;
