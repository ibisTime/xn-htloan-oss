import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgage-sub';
import { getQueryString, showSucMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.bizMortgageSub, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgageSub extends React.Component {
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
                    {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
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
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
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
            readonly: true
        }, {
            title: '抵押代理人身份证复印件',
            field: 'pledgeUserIdCardCopy',
            type: 'img',
            readonly: true
        }, {
            title: '抵押地点',
            field: 'pledgeAddress',
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
            title: '车牌号',
            field: 'carNumber',
            readonly: true
        }, {
            title: '机动车登记证书',
            field: 'carRegcerti',
            type: 'img',
            readonly: true
        }, {
            title: '批单',
            field: 'carPd',
            type: 'img',
            readonly: true
        }, {
            title: '车钥匙',
            field: 'carKey',
            type: 'img',
            readonly: true
        }, {
            title: '大本扫描件',
            field: 'carBigSmj',
            type: 'img',
            readonly: true
        }, {
            title: '车辆行驶证扫描件',
            field: 'carXszSmj',
            type: 'img',
            readonly: true
        }, {
            title: '完税证明扫描件',
            field: 'dutyPaidProveSmj',
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
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '提交',
              handler: (param) => {
                param.approveResult = '1';
                param.approveNote = this.projectCode;
                param.approveUser = getUserId();
                this.props.doFetching();
                fetch(632132, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true,
              type: 'primary'
            }, {
                title: '确认',
                handler: (param) => {
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632503, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default mortgageSub;
