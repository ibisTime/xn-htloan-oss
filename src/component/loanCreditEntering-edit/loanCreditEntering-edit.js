import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, isUndefined} from 'common/js/util';

class LoanCreditEnteringEdit extends React.Component {
    render() {
        let {code, key = 'creditUserCode', bizCode} = this.props;
        const options = {
            code: this.props.selectData.code,
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, {
                title: '银行征信结果',
                field: 'bankCreditResultPdf',
                type: 'img',
                required: true
            }, {
                title: '银行征信结果说明',
                field: 'bankCreditResultRemark',
                required: true
            }],
            buttons: [{
                title: '确认',
                handler: (params, doFetching, cancelFetching, handleCancel, selectData) => {
                    handleCancel();
                    this.props.creditEntryFun(params);
                },
                check: true
            }],
            useData: this.props.selectData
        };
        return (
            <ModalDetail
                title='录入银行查询结果'
                visible={this.props.entryVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default LoanCreditEnteringEdit;
