import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

export default class cxpz extends React.Component {
  render() {
    const options = {
      fields: [{
        field: 'carCode',
        value: this.props.carCode,
        hidden: true
      }, {
        field: 'name',
        title: '选择配置',
        type: 'select',
        listCode: 630447,
        keyName: 'code',
        valueName: 'name',
        required: true
      }],
      addCode: this.props.addCode,
      onOk: (d) => {
        console.log(d);
        this.props.onOk && this.props.onOk();
      }
    };
    return (
      <ModalDetail
        title='选择配置'
        visible={this.props.shelfVisible}
        hideModal={() => this.props.setShelfVisible(false)}
        options={options} />
    );
  }
}
