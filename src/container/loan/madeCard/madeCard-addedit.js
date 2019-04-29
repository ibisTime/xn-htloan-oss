import React from 'react';
import {Button, Form} from 'antd';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId,
    isExpressConfirm
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class FaceSignAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.hande = !!getQueryString('hande', this.props.location.search);
        console.log(this.hande);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            title: '业务编号',
            field: 'code',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + this.code;
                }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'userName',
            required: true,
            readonly: true,
            formatter: (v, d) => {
                return d ? d.creditUser.userName : '';
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
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            required: true,
            readonly: true
        }, {
            title: '业务归属',
            field: 'ywyUser',
            formatter: (v, d) => {
                return d ? d.companyName + '-' + d.teamName + '-' + d.saleUserName : '';
            },
            readonly: true
        }, {
            title: '指派归属',
            field: 'zfStatus',
            formatter: (v, d) => {
                return d ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : '';
            },
            readonly: true
        }, {
            title: '当前状态',
            field: 'makeCardStatus',
            key: 'make_card_status',
            type: 'select',
            readonly: true,
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '卡邮寄地址',
            field: 'cardPostAddress',
            hidden: this.hande
        }, {
            title: '卡号',
            field: 'repayCardNumber',
            hidden: !this.hande,
            readonly: false
        }];

        let bizCode = this.hande ? 632511 : 632510;
            buttons = [{
                title: '确认',
                handler: (params) => {
                    // console.log(params);
                    let data = {};
                    data.code = this.code;
                    data.operator = getUserId();
                    data.cardPostAddress = params.cardPostAddress;
                    data.repayCardNumber = params.repayCardNumber; // 卡号
                    this.doFetching();
                    fetch(bizCode, data).then((res) => {
                        showSucMsg('操作成功');
                        isExpressConfirm(res);
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
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