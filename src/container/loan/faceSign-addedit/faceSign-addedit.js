import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/faceSign-addedit';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {COMPANY_CODE} from 'common/js/config';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanFaceSignAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class FaceSignAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 审核
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '客户姓名',
            field: 'username',
            required: true,
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            required: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            searchName: 'bankName',
            required: true,
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '面签视频',
            field: 'xszFront',
            type: 'img',
            readonly: !this.isCheck,
            single: true
        }, {
            title: '面签合同',
            field: 'xszFront1',
            type: 'img',
            readonly: !this.isCheck,
            single: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !this.isCheck,
            hidden: !this.view
        }];

        // 准入审查
        if (this.isCheck) {
            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632114, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117,
            addCode: 632110,
            editCode: 632110,
            buttons: buttons
        });
    }
}

export default FaceSignAddedit;
