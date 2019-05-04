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
    showWarnMsg,
    getRoleCode,
    getTeamCode,
    getNowCurNodePageUrl
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import {getNodeList} from 'api/menu';
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
            type: 'select',
            search: true,
            listCode: 632517,
            valueName: '{{code.DATA}}',
            keyName: 'code',
            title: '业务编号'
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
            pageCode: 632528,
            rowKey: 'id',
            searchParams: {
                roleCode: getRoleCode(),
                teamCode: getTeamCode()
            },
            buttons: [{
                code: 'handle',
                name: '处理',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if(selectedRows[0].refNode === 'b1x') {
                        this.props.history.push(`/loan/credit/addedit?v=1&isEntry=1&code=${selectedRows[0].bizCode}`);
                    } else if(selectedRows[0].refNode === 'a3') {
                        this.props.history.push(`/loan/credit/shenhe?v=1&isEntry=1&code=${selectedRows[0].bizCode}`);
                    } else if(selectedRows[0].refNode === 'b7') {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckNq=1&code=${selectedRows[0].bizCode}`);
                    } else if(selectedRows[0].refNode === 'h2') {
                        this.props.history.push(`/loan/madeCard/addedit?v=1&hande=1&code=${selectedRows[0].bizCode}`);
                    } else if(selectedRows[0].refNode === 'b5') {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isCheckDirector=1&code=${selectedRows[0].bizCode}`);
                    } else if(selectedRows[0].refNode === 'b6') {
                        this.props.history.push(`/loan/admittance/shenhe?v=1&isbusinessCheck=1&code=${selectedRows[0].bizCode}}`);
                    } else {
                        showWarnMsg('您需要先处理完该笔业务的物流');
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
