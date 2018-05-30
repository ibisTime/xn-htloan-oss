import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class PostAdd extends React.Component {
  render() {
    let that = this;
    const options = {
      fields: [{
        field: 'type',
        hidden: true,
        value: '3'
      }, {
        field: 'parentCode',
        hidden: true,
        value: this.props.parentCode
      }, {
        field: 'name',
        title: '名称',
        required: true,
        maxlength: 30
      }],
      addCode: 630100,
      onOk: (data, params) => {
        that.props.addPost({
          ...params,
          code: data.code
        }, this.props.parentCode);
      }
    };
    return (
      <ModalDetail
        title='新增职位'
        visible={this.props.postVisible}
        hideModal={() => this.props.setPostVisible(false)}
        options={options} />
    );
  }
}

export default PostAdd;
