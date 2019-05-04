import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/archives-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizArchivesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class archivesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.codeflag = !!getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
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
            field: 'userName',
            readonly: true,
            formatter: (v, d) => {
                return d ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            type: 'select',
            listCode: 632037,
            keyName: 'code',
            readonly: true,
            valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            min: '1',
            readonly: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            readonly: true
        }, {
            title: '业务归属',
            field: 'ywyUser',
            readonly: true,
            formatter: (v, d) => {
                return d && d.companyName ? d.companyName + '-' + d.teamName + '-' + d.saleUserName : '';
            }
        }, {
            title: '指派归属',
            field: 'zfStatus',
            readonly: true,
            formatter: (v, d) => {
                return d && d.companyName ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : '';
            }
        }, {
            title: '当前状态',
            field: 'status',
            key: 'cdbiz_status',
            type: 'select',
            readonly: true,
            formatter: (v, d) => {
                return d ? d.cdbiz.status : '';
            }
        }, {
            title: '派单给', // 派单给：默认为当前业务员
            field: 'insideJob',
            type: 'select',
            listCode: 630066,
            params: {
                roleCode: 'SR20180000000000000NQZY'
            },
            keyName: 'userId',
            valueName: 'realName',
            formatter: (v, d) => {
              return d ? d.insideJobName : '';
            },
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117, // 征信详情查询接口
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.operator = getUserId();
                    if (param.insideJob === this.props.pageData.insideJobName) {
                      param.insideJob = this.props.pageData.insideJob;
                    }
                    param.bizCode = this.code;
                    fetch(632119, param).then(() => {
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

export default archivesAddedit;
