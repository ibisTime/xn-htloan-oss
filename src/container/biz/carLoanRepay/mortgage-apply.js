import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class mortgageApply extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.check = !!getQueryString('check', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'operator',
            hidden: true,
            value: getUserId()
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href={`/ywcx/ywcx/addedit?v=1&code=${d.code}`} style={{marginLeft: 20}}>查看详情</a>
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
            field: 'teamName',
            readonly: true
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
            readonly: !this.check,
            required: this.check
        }, {
            title: '抵押代理人身份证号',
            field: 'pledgeUserIdCard',
            required: true,
            _keys: ['carPledge', 'pledgeUser'],
            idCard: true,
            readonly: !this.check
        }, {
            title: '抵押代理人身份证正面',
            field: 'pledgeUserIdCardFront',
            _keys: ['carPledge', 'pledgeUserIdCardFront'],
            type: 'img',
            readonly: !this.check,
            required: this.check
        }, {
            title: '抵押代理人身份证反面',
            field: 'pledgeUserIdCardReverse',
            _keys: ['carPledge', 'pledgeUserIdCardReverse'],
            type: 'img',
            readonly: !this.check,
            required: this.check
        }, {
            title: '抵押地点',
            field: 'pledgeAddress',
            _keys: ['carPledge', 'pledgeAddress'],
            readonly: true
        }, {
            title: '补充说明',
            field: 'supplementNote',
            type: 'textarea',
            normalArea: true,
            required: !this.check,
            readonly: this.check
        }];
        this.check && fields.push({
            title: '审核说明',
            field: 'approveNote',
            required: true
        });
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: this.check ? 632124 : 632144,
            afterFetch: (data) => {
                data.attachments.forEach(pic => {
                    if (pic.kname === 'pledge_user_id_card_front') {
                        data.carPledge.pledgeUserIdCardFront = pic.url;
                    } else if (pic.kname === 'pledge_user_id_card_reverse') {
                        data.carPledge.pledgeUserIdCardReverse = pic.url;
                    }
                });
                return data;
            }
        });
    }
}

export default mortgageApply;
