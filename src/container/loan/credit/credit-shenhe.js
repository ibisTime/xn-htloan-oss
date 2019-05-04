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
class ArchivesAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = true;
        // 信贷专员初审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    }
    checkForm = (approveResult) => {
        var params = {
            approveResult,
            creditUserList: this.props.pageData.creditUserList,
            operator: getUserId(),
            code: this.code
        };
        this.setState({ fetching: true });
        fetch(632113, params).then((data) => {
            this.setState({ fetching: false });
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        }).catch(() => this.setState({ fetching: false }));
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
            title: '审核意见',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            required: true,
            readonly: false
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632117, // 征信详情查询接口
            buttons: [{
                title: '通过',
                handler: (param) => {
                    this.checkForm(1);
                },
                check: true,
                type: 'primary'
            }, {
              title: '不通过',
              handler: (params) => {
                this.checkForm(0);
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

export default ArchivesAddEdit;
