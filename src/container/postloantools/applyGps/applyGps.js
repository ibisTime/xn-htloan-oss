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
} from '@redux/postloantools/applyGps';
import { showWarnMsg, dateTimeFormat } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.postloantoolsApplyGps,
        parentCode: state.menu.subMenuCode,
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData,
    }
)
class applyGps extends React.Component {
    render() {
        const fields = [{
            title: '所属公司',
            field: 'companyName',
            search: true
        }, {
            title: '申领人',
            field: 'applyUserName',
            search: true
        }, {
            title: '所属团队',
            field: 'teamName'
        }, {
            title: '申领时间',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat
        }, {
            title: '申领个数',
            field: 'applyCount'
        },
            {
            title: '发货时间',
            field: 'sendDatetime',
            type: 'datetime'
        }, {
            title: '收货时间',
            field: 'receiveDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'gps_apply_status',
            search: true
        }, {
                title: '备注',
                field: 'remark',
                render: (v, d) => {
                    return d.remark ? d.remark : '无';
                }
            }];
        return this.props.buildList({
            fields,
            pageCode: 632715,
            btnEvent: {
              // 0 待审核、1 审核通过,待发货、2 审核不通过、3 已发货、4 已收货
              apply: (keys, items) => {
                let code = keys ? keys[0] : '';
                if (code) {
                  if (items[0].status !== '2') {
                    showWarnMsg('该状态不可申领');
                  } else {
                    this.props.history.push(`/postloantools/applyGps/apply?code=${code}`);
                  }
                } else {
                  this.props.history.push('/postloantools/applyGps/apply');
                }
              },
              check: (keys, items) => {
                if (!keys.length) {
                  showWarnMsg('请选择记录');
                } else if (keys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (items[0].status !== '0') {
                  showWarnMsg('该状态不可审核');
                } else {
                  this.props.history.push(`/postloantools/applyGps/check?code=${keys[0]}`);
                }
              }
            }
        });
    }
}

export default applyGps;
