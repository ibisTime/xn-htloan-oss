import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, isUndefined} from 'common/js/util';

class LoanCreditEnteringEdit extends React.Component {
    render() {
        let {code, key = 'code', bizCode} = this.props;
        const options = {
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, {
                title: '贷款抵押笔数',
                field: 'dkdyCount',
                number: true,
                required: true
            }, {
                title: '贷款抵押贷款余额',
                field: 'dkdyAmount',
                amount: true,
                required: true
            }, {
                title: '贷款抵押近两年逾期次数',
                field: 'dkdy2yearOverTimes',
                number: true,
                required: true
            }, {
                title: '贷款抵押最高逾期金额',
                field: 'dkdyMaxOverAmount',
                amount: true,
                required: true
            }, {
                title: '贷款抵押当前逾期金额',
                field: 'dkdyCurrentOverAmount',
                amount: true,
                required: true
            }, {
                title: '贷款抵押近6个月平均月还款额',
                field: 'dkdy6monthAvgAmount',
                amount: true,
                required: true
            }, {
                title: '贷款信用未结清贷款笔数',
                field: 'hkxyUnsettleCount',
                number: true,
                required: true
            }, {
                title: '贷款信用未结清贷款余额',
                field: 'hkxyUnsettleAmount',
                amount: true,
                required: true
            }, {
                title: '贷款信用近两年逾期次数',
                field: 'hkxy2yearOverTimes',
                number: true,
                required: true
            }, {
                title: '贷款信用单月最高逾期金额',
                field: 'hkxyMonthMaxOverAmount',
                amount: true,
                required: true
            }, {
                title: '贷款信用当前逾期金额',
                field: 'hkxyCurrentOverAmount',
                amount: true,
                required: true
            }, {
                title: '贷款信用近6个月平均月还款额',
                field: 'hkxy6monthAvgAmount',
                amount: true,
                required: true
            }, {
                title: '信用卡张数',
                field: 'xykCount',
                number: true,
                required: true
            }, {
                title: '信用卡授信总额',
                field: 'xykCreditAmount',
                amount: true,
                required: true
            }, {
                title: '信用卡近6个月使用额',
                field: 'xyk6monthUseAmount',
                amount: true,
                required: true
            }, {
                title: '信用卡近两年逾期次数',
                field: 'xyk2yearOverTimes',
                number: true,
                required: true
            }, {
                title: '信用卡单月最高逾期金额',
                field: 'xykMonthMaxOverAmount',
                amount: true,
                required: true
            }, {
                title: '信用卡当前逾期金额',
                field: 'xykCurrentOverAmount',
                amount: true,
                required: true
            }, {
                title: '对外担保笔数',
                field: 'outGuaranteesCount',
                number: true,
                required: true
            }, {
                title: '对外担保余额',
                field: 'outGuaranteesAmount',
                amount: true,
                required: true
            }, {
                title: '对外担保备注',
                field: 'outGuaranteesRemark',
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
