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
import {
    Button,
    Upload,
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
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [ {
            title: '业务编号',
            field: 'bizCode',
            required: true,
            nowrap: true
        }, {
            title: '姓名',
            field: 'userName',
            nowrap: true,
            required: true
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            nowrap: true,
            required: true
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            nowrap: true,
            key: 'credit_user_loan_role'
        }, {
            title: '手机号',
            field: 'mobile',
            mobile: true,
            required: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632518,
            searchParams: {
                bizCode: this.code
            },
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/tdunzhengxing/detail?code=${selectedRowKeys[0]}`);
                    }
                }
            }]
        });
    }
}

export default MemberList;
