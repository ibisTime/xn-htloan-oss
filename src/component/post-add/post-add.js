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
        field: 'orderNo',
        hidden: true,
        value: 0
      }, {
        field: 'parentCode',
        title: '上级',
        type: 'treeSelect',
        listCode: 630106,
        keyName: 'code',
        valueName: 'name',
        bParams: ['type'],
        disabled: (item) => item.type !== '2',
        params: {
          status: 1,
          typeList: [1, 2]
        },
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
        });
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
