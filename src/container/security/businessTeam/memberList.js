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
} from '@redux/security/memberList';
import {getQueryString, showWarnMsg, showSucMsg, getUserId} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';
import fetch from 'common/js/fetch';
import {
    Modal
} from 'antd';

@listWrapper(
    state => ({
        ...state.securityMemberList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'realName',
            title: '成员名称'
        }, {
            field: 'companyName',
            title: '所属公司'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 630205,
            deleteCode: 630201,
            searchParams: {
                teamCode: this.code
            },
            buttons: [{
                code: 'add',
                name: '新增',
                handler: () => {
                    this.props.history.push(`/system/businessTeam/memberList/addedit?teamcode=${this.code}`);
                }
            }, {
                code: 'delete',
                name: '删除',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!this.state.selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (this.state.selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定删除？',
                            onOk: () => {
                                this.props.doFetching();
                                fetch(630201, {
                                    userId: this.state.selectedRows[0].userId,
                                    updater: getUserId()
                                }).then(() => {
                                    showSucMsg('操作成功');
                                    this.props.cancelFetching();
                                    setTimeout(() => {
                                        this.props.history.go(-1);
                                    }, 1000);
                                }).catch(this.props.cancelFetching);
                            }
                        });
                    }
                }
            }]
        });
    }
}

export default MemberList;
