import React from 'react';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class AdvMoneyAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.check = !!getQueryString('check', this.props.location.search);
    }
    checkRecord(params) {
        this.doFetching();
        fetch(632463, params).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        }).catch(this.cancelFetching);
    }
    render() {
        let _this = this;
        let buttons = [];

        let fields = [{
            field: 'operator',
            hidden: true,
            value: getUserId(),
            readonly: false
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true,
            formatter: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                if (d.loanBankName) {
                    return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                } else if (d.repaySubbranch) {
                    return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                }
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            required: true,
            readonly: true
        }, {
            title: '业务归属',
            field: 'ywyUser',
            readonly: true,
            formatter: (v, d) => {
                return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName + '-' + d.saleUserName : '';
            }
        }, {
            title: '指派归属',
            field: 'zfStatus',
            readonly: true,
            formatter: (v, d) => {
                return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            }
        }, {
            title: '状态',
            field: 'fbhgpsNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            readonly: true,
            params: {type: 'g'}
        }];
        let config = {
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: 632464
        };
        if (this.check) {
            fields.push({
                title: '垫资说明',
                field: 'advanceNote',
                required: true,
                readonly: !this.check
            });
            config.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    this.checkRecord(params);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '0';
                    this.checkRecord(params);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            fields = fields.concat([{
                title: '汽车经销商',
                field: 'carDealerName',
                readonly: true
            }, {
                title: '资金划转授权书 ',
                field: 'advanceFundAmountPdf',
                type: 'img',
                readonly: true,
                formatter: (v, d) => {
                    let url = '';
                    d.attachments.forEach(item => {
                        if (item.vname === '资金划转授权书') {
                            url = item.url;
                        }
                    });
                    return url;
                }
            }, {
                title: '垫资日期',
                field: 'advanceFundDatetime',
                type: 'date',
                required: true
            }, {
                title: '垫资金额',
                field: 'advanceFundAmount',
                amount: true,
                required: true
            }, {
                title: '水单',
                field: 'billPdf',
                type: 'img',
                required: true
            }, {
                title: '出款账号',
                field: 'advanceCardCode',
                type: 'select',
                listCode: 632007,
                keyName: 'code',
                valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
                required: true,
                params: { type: 4, advanceType: 2 }
            }, {
                title: '收款账号',
                field: 'collectCardCodeList',
                type: 'select',
                listCode: 632007,
                keyName: 'code',
                valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
                required: true,
                params: { type: 4, advanceType: 1 },
                multiple: true
            }]);
            config.beforeSubmit = (params) => {
                if (params.collectCardCodeList) {
                    params.collectCardCodeList = params.collectCardCodeList.split(',');
                }
                return true;
            };
        }
        config.fields = fields;
        return this.buildDetail(config);
    }
}

export default AdvMoneyAddedit;
