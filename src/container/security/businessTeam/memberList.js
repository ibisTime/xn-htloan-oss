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
import {getQueryString, showWarnMsg, showSucMsg, showDelConfirm, getUserId} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';
import fetch from 'common/js/fetch';

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
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        showDelConfirm({
                            onOk: () => {
                                this.props.doFetching();
                                fetch(630201, {
                                    userId: selectedRowKeys[0],
                                    updater: getUserId()
                                }).then(() => {
                                    showSucMsg('操作成功');
                                    this.props.getPageData();
                                    this.props.cancelFetching();
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
