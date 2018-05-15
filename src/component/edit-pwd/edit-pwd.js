import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserId } from 'common/js/util';

class EditPwd extends React.Component {
  render() {
    const options = {
      fields: [{
        field: 'userId',
        hidden: true,
        value: getUserId()
      }, {
        field: 'oldLoginPwd',
        title: '旧登录密码',
        type: 'password',
        required: true,
        maxlength: 30
      }, {
        field: 'newLoginPwd',
        title: '新登录密码',
        type: 'password',
        required: true,
        maxlength: 30
      }],
      addCode: 627304
    };
    return (
      <ModalDetail
        title='修改密码'
        visible={this.props.editPwdVisible}
        hideModal={() => this.props.setEditPwdVisible(false)}
        options={options} />
    );
  }
}

export default EditPwd;
