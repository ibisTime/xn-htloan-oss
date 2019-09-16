import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/home/toDoList';
import {
    showSucMsg,
    showWarnMsg,
    getRoleCode,
    getTeamCode,
    getUserId,
    getNowCurNodePageUrl
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import {getNodeList} from 'api/menu';
import fetch from 'common/js/fetch';
import {curNodePageUrl} from './../../../src/common/js/config';

@listWrapper(
    state => ({
        ...state.homeToDoList,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeDict: null
        };
    }
    componentDidMount() {
        getNodeList().then(nodeDict => {
            this.setState({nodeDict});
        });
    }
    render() {
        const {nodeDict} = this.state;
        const fields = [{
            field: 'bizCode',
            search: true,
            title: '业务编号'
        }, {
            title: '贷款人姓名',
            field: 'userName',
            search: true
        }, {
            title: '消息内容',
            field: 'content'
        }, {
            title: '推送节点',
            field: 'refNode',
            type: 'select',
            data: nodeDict,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '处理时间',
            field: 'finishDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632525,
            rowKey: 'code',
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                status: '0'
            },
            buttons: [{
                code: 'handle',
                name: '处理',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        if(selectedRows[0].refNode === 'a2') {
                            this.props.history.push(`/preLoan/Access/examine?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'a1x') {
                            this.props.history.push(`/preLoan/Access?code=${selectedRows[0].bizCode}&type=edit`);
                        }else if(selectedRows[0].refNode === 'c1') { // 理件打件
                            this.props.history.push(`/rationale/list/rationaleOk?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'c2') {
                            this.props.history.push(`/rationale/list/typingOk?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'b1') { // 财务垫资
                            this.props.history.push(`/financial/advance/afp?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'b2') {
                            this.props.history.push(`/financial/advance/afpOne?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'b3') {
                            this.props.history.push(`/financial/advance/afpTwo?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'b4') {
                            this.props.history.push(`/financial/advance/orderRecall?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'b5') {
                            this.props.history.push(`/financial/advance/orderMemory?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'd1') { // 银行放款
                            this.props.history.push(`/biz/bankMoney/cSs?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'd2') {
                            this.props.history.push(`/biz/bankMoney/cSs2?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'd3') {
                            this.props.history.push(`/biz/bankMoney/enterBk?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'd4') {
                            this.props.history.push(`/biz/bankMoney/cRs?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'e1') { // 车辆抵押
                            let param = {
                                code: selectedRows[0].bizCode,
                                operator: getUserId()
                            };
                            fetch(632581, param).then(() => {
                                showSucMsg('操作成功');
                                setTimeout(() => {
                                    this.props.getPageData();
                                }, 500);
                            });
                        }else if(selectedRows[0].refNode === 'e2') {
                            let param = {
                                code: selectedRows[0].bizCode,
                                operator: getUserId()
                            };
                            fetch(632580, param).then(() => {
                                showSucMsg('操作成功');
                                setTimeout(() => {
                                    this.props.getPageData();
                                }, 500);
                            });
                        }else if(selectedRows[0].refNode === 'f1') { // 入档
                            this.props.history.push(`/biz/archives/add?code=${selectedRows[0].bizCode}`);
                        }else if(selectedRows[0].refNode === 'f2') {
                            this.props.history.push(`/biz/archives/cmAdd?code=${selectedRows[0].bizCode}`);
                        }
                    }
                }
            }, {
                code: 'goback',
                name: '返回',
                handler: (selectedRowKeys, selectedRows) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ToDoList;
