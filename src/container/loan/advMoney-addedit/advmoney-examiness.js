import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/advMoneyb';
import { getQueryString, showWarnMsg, getUserId, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@DetailWrapper(
    state => state.examineMoneyb, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class examineMoneyb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 页面详情数据
            pageData: {},
            // 是否自营企业
            isSelfCompany: false,
            // 婚姻状况
            isMarried: false,
            showMarry: false,
            activeKey: '0',
            brandData: [],
            carSeriesData: [],
            carShapeData: [],
            // o2m选中的keys
            selectedRowKeys: {},
            // o2m下拉框中的数据
            oSelectData: {},
            saleUserName: {}
        };
        this.code = getQueryString('code', this.props.location.search);
        this.check = getQueryString('isCheck', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.buttons = [];
        if (this.check) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    console.log(params);
                    if (!params.missionList) {
                        showWarnMsg('至少新增一条任务列表');
                        return false;
                    } else {
                        let data = {};
                        data.code = this.code;
                        data.approveResult = '1';
                        data.operator = getUserId();
                        data.missionList = params.missionList;
                        this.props.doFetching();
                        fetch(632462, data).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    }
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveResult = '0';
                    data.operator = getUserId();
                    this.props.doFetching();
                    fetch(632462, data).then(() => {
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
    }
    componentDidMount() {
        this.props.doFetching();
        fetch(632516, {
            code: this.code
        }).then((data) => {
            this.setState({
                pageData: data
            });
            this.props.cancelFetching();
        }).catch(this.props.cancelFetching);
    }

    render() {
        const pageData1 = this.state.pageData;
        const fields = [{
            field: 'operator',
            hidden: true,
            value: getUserId()
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href="javascript:void(0);" style={{marginLeft: 20}} onClick={() => {
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
            formatter: (v, d) => {
                return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName + '-' + d.saleUserName : '';
            },
            readonly: true
        }, {
            title: '指派归属',
            field: 'zfStatus',
            formatter: (v, d) => {
                return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            },
            readonly: true
        }, {
            title: '状态',
            field: 'fbhgpsNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            readonly: true,
            params: {type: 'g'}
        }, {
            field: 'saleUserName',
            hidden: true,
            formatter: (v) => {
                this.saleUserName = v;
            }
        }, {
            title: '任务清单',
            field: 'missionList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {x: 300},
                fields: [{
                    title: '执行人',
                    field: 'saleUserName',
                    readonly: true,
                    formatter: () => {
                        return this.saleUserName;
                    }
                }, {
                    title: '任务名称',
                    field: 'getUser',
                    required: true
                }, {
                    title: '任务时效(h)',
                    number: true,
                    field: 'time',
                    required: true
                }]}
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
            detailCode: 632516,
            editCode: 632462,
            buttons: this.buttons
        });
    }
}

export default examineMoneyb;
