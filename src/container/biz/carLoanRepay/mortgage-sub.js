import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg, getUserId, dateTimeFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class mortgageSub extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
                    {d.code}<a href={`/ywcx/ywcx/addedit?v=1&code=${d.code}`} style={{ marginLeft: 20 }}>查看详情</a>
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
            readonly: true
        }, {
            title: '抵押代理人身份证号',
            field: 'pledgeUserIdCard',
            _keys: ['carPledge', 'pledgeUserIdCard'],
            idCard: true,
            readonly: true
        }, {
            title: '抵押代理人身份证正面',
            field: 'pledgeUserIdCardFront',
            _keys: ['carPledge', 'pledgeUserIdCardFront'],
            type: 'img',
            readonly: true
        }, {
            title: '抵押代理人身份证反面',
            field: 'pledgeUserIdCardReverse',
            _keys: ['carPledge', 'pledgeUserIdCardReverse'],
            type: 'img',
            readonly: true
        }, {
            title: '抵押地点',
            field: 'pledgeAddress',
            formatter: (v, d) => {
                return d.carPledge ? d.carPledge.pledgeAddress : '';
            },
            readonly: true
        }, {
            title: '落户日期',
            field: 'carSettleDatetime',
            formatter: (v, d) => {
                return d.carInfoRes ? dateTimeFormat(d.carInfoRes.carSettleDatetime) : '';
            },
            type: 'date',
            readonly: true
        }, {
            title: '落户地点',
            field: 'settleAddress',
            _keys: ['carInfoRes', 'settleAddress'],
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            formatter: (v, d) => {
                return d.carInfoRes ? d.carInfoRes.carNumber : '';
            },
            readonly: true
        }, {
            title: '机动车登记证书',
            field: 'carRegcerti',
            _keys: ['carPledge', 'carRegcerti'],
            type: 'img',
            readonly: true
        }, {
            title: '批单',
            field: 'carPd',
            _keys: ['carPledge', 'carPd'],
            type: 'img',
            readonly: true
        }, {
            title: '车钥匙',
            field: 'carKey',
            _keys: ['carPledge', 'carKey'],
            type: 'img',
            readonly: true
        }, {
            title: '大本扫描件',
            field: 'carBigSmj',
            formatter: (v, d) => {
                let url = '';
                d.attachments.forEach(item => {
                    if(item.vname === '大本扫描件') {
                        url = item.url;
                    }
                });
                return url;
            },
            type: 'img',
            readonly: true
        }, {
            title: '车辆行驶证扫描件',
            field: 'carXszSmj',
            _keys: ['carPledge', 'carXszSmj'],
            type: 'img',
            readonly: true
        }, {
            title: '完税证明扫描件',
            field: 'dutyPaidProveSmj',
            _keys: ['carPledge', 'dutyPaidProveSmj'],
            type: 'img',
            readonly: true
        }, {
            title: '提交时间',
            field: 'pledgeBankCommitDatetime',
            type: 'date',
            required: true
        }, {
            title: '提交说明',
            field: 'pledgeBankCommitNot'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: 632132,
            afterFetch: (data) => {
                data.attachments.forEach(pic => {
                    if (pic.kname === 'pledge_user_id_card_front') {
                        data.carPledge.pledgeUserIdCardFront = pic.url;
                    } else if (pic.kname === 'pledge_user_id_card_reverse') {
                        data.carPledge.pledgeUserIdCardReverse = pic.url;
                    } else if (pic.kname === 'car_regcerti') {
                        data.carPledge.carRegcerti = pic.url;
                    } else if (pic.kname === 'car_pd') {
                        data.carPledge.carPd = pic.url;
                    } else if (pic.kname === 'car_key') {
                        data.carPledge.carKey = pic.url;
                    } else if (pic.kname === 'car_xsz_smj') {
                        data.carPledge.carXszSmj = pic.url;
                    } else if (pic.kname === 'duty_paid_prove_smj') {
                        data.carPledge.dutyPaidProveSmj = pic.url;
                    }
                });
                return data;
            }
        });
    }
}

export default mortgageSub;
