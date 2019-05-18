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
    getUserId,
    getNowCurNodePageUrl
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import {getNodeList} from 'api/menu';
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
            // type: 'select',
            search: true,
            // // listCode: 632517,
            // valueName: '{{code.DATA}}',
            // keyName: 'code',
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
                        this.props.history.push(`${curNodePageUrl[selectedRows[0].refNode]}${selectedRows[0].refOrder}`);
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
