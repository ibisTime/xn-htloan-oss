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
} from '@redux/recruit/post';
import {
    listWrapper,
    getUserId
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    receiveGoods,
    cancelBill
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.recruitPost,
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
class post extends React.Component {
    render() {
        const fields = [{
            title: '申请人',
            field: 'applyUser',
            render: (v, d) => {
                if(d && d.user) {
                    return d.user.realName;
                }
            }
        }, {
            title: '工号',
            field: 'jobNo',
            render: (v, d) => {
                if(d && d.user) {
                    return d.archice.jobNo;
                }
            }
        }, {
            title: '部门',
            field: 'departmentCode',
            listCode: 630106,
            render: (v, d) => {
                if(d && d.user) {
                    return d.user.departmentCode;
                }
            },
            params: {
              typeList: ['2']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '岗位',
            field: 'postCode',
            required: true,
            render: (v, d) => {
                if(d && d.user) {
                    return d.user.postCode;
                }
            },
            listCode: 630106,
            params: {
              typeList: ['3']
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '新岗位',
            field: 'newPosition'
        }, {
            title: '新部门',
            field: 'newDepartment'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'recruit_apply_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632885,
            btnEvent: {
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                    showWarnMsg('不是待审核的状态');
                } else {
                  this.props.history.push(`/recruit/post/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default post;