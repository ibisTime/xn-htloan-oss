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
} from '@redux/recruit/formal';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
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
        ...state.recruitFormal,
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
class formal extends React.Component {
    render() {
        const fields = [{
            title: '申请人',
            field: 'applyUser',
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date',
            nowrap: true
        }, {
            title: '部门',
            field: 'departmentCode',
            type: 'select',
            render: (v, d) => {
                return d.user.departmentCode;
            },
            listCode: 630106,
            params: {
              typeList: ['2']
            },
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '员工姓名',
            field: 'realName',
            render: (v, d) => {
                if(d.user) {
                    return d.user.realName;
                }
            }
        }, {
            title: '员工职位',
            field: 'postCode',
            required: true,
            render: (v, d) => {
                return d.user.postCode;
            },
            type: 'select',
            listCode: 630106,
            params: {
              typeList: ['3']
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '入职日期',
            field: 'entryDatetime',
            render: (v, d) => {
                return formatDate(d.archice.entryDatetime);
            },
            nowrap: true
        }, {
            title: '试用期开始',
            field: 'probationStartDatetime',
            render: (v, d) => {
                return d.entryApply ? formatDate(d.entryApply.probationStartDatetime) : '-';
            }
        }, {
            title: '试用期结束',
            field: 'probationEndDatetime',
            render: (v, d) => {
                return d.entryApply ? formatDate(d.entryApply.probationEndDatetime) : '-';
            }
        }, {
            title: '生效日期',
            field: 'effectDatetime',
            type: 'date'
        }, {
            title: '总分数',
            field: 'requireDatetime',
            render: (v, d) => {
                if(d.probationAssessesList[0]) {
                    return d.probationAssessesList[0].grade;
                }
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'recruit_apply_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632875,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '1') {
                    showWarnMsg('不是审核已通过的状态');
                } else {
                  this.props.history.push(`/recruit/formal/apply?code=${selectedRowKeys[0]}&entryCode=${selectedRows[0].entryCode}`);
                }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                    showWarnMsg('不是待审核的状态');
                } else {
                  this.props.history.push(`/recruit/formal/check?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default formal;