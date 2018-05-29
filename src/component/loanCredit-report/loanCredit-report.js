import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, isUndefined} from 'common/js/util';

class LoanCreditReport extends React.Component {
    render() {
        let {code, key = 'code', bizCode} = this.props;
        const options = {
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, {
                title: '姓名',
                field: 'userName',
                required: true,
                readonly: true
            }, {
                title: '与借款人关系',
                field: 'relation',
                type: 'select',
                key: 'credit_user_relation',
                required: true,
                readonly: true
            }, {
                title: '贷款角色',
                field: 'loanRole',
                type: 'select',
                key: 'credit_user_loan_role',
                required: true,
                readonly: true
            }, {
                title: '手机号',
                field: 'mobile',
                required: true,
                render: (v) => {
                    let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
                    return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
                },
                readonly: true
            }, {
                title: '身份证号',
                field: 'idNo',
                idCard: true,
                required: true,
                render: (v) => {
                    let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
                    return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
                },
                readonly: true
            }, {
                title: '面签照片',
                field: 'interviewPic',
                type: 'img',
                single: true,
                readonly: true
            }],
            buttons: [{
                title: '确认',
                handler: (params, doFetching, cancelFetching, handleCancel, selectData) => {
                    handleCancel();
                },
                check: true
            }],
            useData: this.props.selectData
        };
        return (
            <ModalDetail
                title='征信报告'
                visible={this.props.reportVisible}
                hideModal={() => this.props.setReportModalVisible(false)}
                options={options}/>
        );
    }
}

export default LoanCreditReport;
