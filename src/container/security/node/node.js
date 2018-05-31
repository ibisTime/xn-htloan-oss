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
} from '@redux/security/node';
import {listWrapper} from 'common/js/build-list';
import {getNodeList} from 'api/menu';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.securityNode,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class node extends React.Component {
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
            title: '节点名称',
            field: 'currentNode',
            type: 'select',
            data: nodeDict,
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '流程类型',
            field: 'type',
            type: 'select',
            key: 'node_type',
            search: true
        }, {
            title: '下一个节点',
            field: 'nextNode',
            type: 'select',
            data: nodeDict,
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '返回节点',
            field: 'backNode',
            type: 'select',
            data: nodeDict,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.state.nodeDict ? this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 630155,
            btnEvent: {
                setMateriallist: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/node/setMateriallist?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        }) : null;
    }
}

export default node;
