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
        this.isCheckNq = !!getQueryString('isCheckNq', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.newCar = true;
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '客户姓名',
            field: 'applyUserName',
            required: true,
            readonly: true
        }, {
            title: '业务编号',
            field: 'code1',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return d.code;
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            required: true,
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            required: true,
            readonly: true
        }, {
            title: '银行视频',
            field: 'bankVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '公司视频',
            field: 'companyVideo',
            type: 'file',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '其他视频',
            field: 'otherVideo',
            type: 'file',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '银行面签图片',
            field: 'bankPhoto',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '银行合同',
            field: 'bankContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '公司合同',
            field: 'companyContract',
            type: 'img',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '资金划转授权书',
            field: 'advanceFundAmountPdf',
            type: 'img',
            required: true,
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '其他资料',
            field: 'interviewOtherPdf',
            type: 'file',
            readonly: (this.isCheck || this.view) ? 'true' : false
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: !(this.isCheck || this.isCheckNq),
            hidden: !this.view
        }];
        let bizCode = this.isCheckNq ? 632137 : 632124;
        // 准入审查
        if (this.isCheck || this.isCheckNq) {
            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '1';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
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
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '0';
                    data.approveNote = params.approveNote;
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
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
            detailCode: 632146,
            addCode: 632123,
            editCode: 632123,
            buttons: buttons,
            beforeSubmit: (params) => {
                delete params.loanAmount;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default FaceSignAddedit;
