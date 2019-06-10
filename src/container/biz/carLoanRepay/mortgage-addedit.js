import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class mortgageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{marginLeft: 20}} onClick={() => {
                    window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
                }}>查看详情</a>
                </div>;
            },
            readonly: true
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true,
            formatter: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '业务团队',
            field: 'teamName'
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
            title: '区域经理',
            field: 'areaName',
            readonly: true
        }, {
            title: '信贷专员',
            field: 'saleUserName',
            readonly: true
        }, {
            title: '内勤专员',
            field: 'insideJobName',
            readonly: true
        }, {
            title: '抵押代理人',
            field: 'pledgeUser',
            _keys: ['carPledge', 'pledgeUser'],
            required: true,
            readonly: true
        }, {
            title: '抵押代理人身份证号',
            field: 'pledgeUserIdCard',
            _keys: ['carPledge', 'pledgeUser'],
            idCard: true,
            required: true,
            readonly: true
        }, {
            title: '抵押代理人身份证正面',
            field: 'pledgeUserIdCardFront',
            _keys: ['carPledge', 'pledgeUserIdCardFront'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '抵押代理人身份证反面',
            field: 'pledgeUserIdCardReverse',
            _keys: ['carPledge', 'pledgeUserIdCardReverse'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '补充说明',
            field: 'supplementNote',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            readonly: true
        }, {
            title: '抵押地点',
            field: 'pledgeAddress',
            _keys: ['carPledge', 'pledgeAddress'],
            required: true,
            readonly: true
        }, {
            title: '落户日期',
            field: 'carSettleDatetime',
            _keys: ['carPledge', 'carSettleDatetime'],
            type: 'date',
            required: true,
            readonly: true
        }, {
            title: '落户地点',
            field: 'settleAddress',
            _keys: ['carPledge', 'settleAddress'],
            required: true,
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            _keys: ['carPledge', 'carNumber'],
            required: true,
            readonly: true
        }, {
            title: '机动车登记证书',
            field: 'carRegcerti',
            _keys: ['carPledge', 'carRegcerti'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '批单',
            field: 'carPd',
            _keys: ['carPledge', 'carPd'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '车钥匙',
            field: 'carKey',
            _keys: ['carPledge', 'carKey'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '大本扫描件',
            field: 'carBigSmj',
            _keys: ['carPledge', 'carBigSmj'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '车辆行驶证扫描件',
            field: 'carXszSmj',
            _keys: ['carPledge', 'carXszSmj'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '完税证明扫描件',
            field: 'dutyPaidProveSmj',
            _keys: ['carPledge', 'dutyPaidProveSmj'],
            type: 'img',
            required: true,
            readonly: true
        }, {
            title: '提交时间',
            field: 'pledgeBankCommitDatetime',
            _keys: ['carPledge', 'pledgeBankCommitDatetime'],
            type: 'date',
            required: true
        }, {
            title: '提交说明',
            field: 'pledgeBankCommitNot',
            _keys: ['carPledge', 'pledgeBankCommitNot']
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true,
            detailCode: 632516
        });
    }
}

export default mortgageAddedit;
