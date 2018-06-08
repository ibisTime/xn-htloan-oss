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
} from '@redux/recruit/register';
import {
    listWrapper
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
        ...state.recruitRegister,
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
class register extends React.Component {
    render() {
        const fields = [{
            title: '应聘岗位',
            field: 'position',
            required: true,
            type: 'select',
            listCode: 630106,
            params: {
              typeList: ['3']
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '姓名',
            field: 'realName',
            search: true
        }, {
            title: '性别',
            field: 'gender',
            type: 'select',
            key: 'gender'
        }, {
            title: '出生日期',
            field: 'birthday',
            type: 'date'
        }, {
            title: '籍贯',
            field: 'nativePlace'
        }, {
            title: '民族 ',
            field: 'nation'
        }, {
            title: '手机号码',
            field: 'contactMobile'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'employ_apply_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632855,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '1') {
                    showWarnMsg('不是面试已通过的状态');
                } else {
                  this.props.history.push(`/recruit/register/apply?code=${selectedRowKeys[0]}`);
                }
              },
              enter: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                    showWarnMsg('不是待面试的状态');
                } else {
                  this.props.history.push(`/recruit/register/enter?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default register;