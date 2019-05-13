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
} from '@redux/tool/shaddess';
import {
    showWarnMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getUserId
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    creditWithdraw
} from 'api/biz';
import { Modal } from 'antd';

@listWrapper(
    state => ({
        ...state.ShAddedit,
        parentCode: state.menu.subMenuCode
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
class Tool extends React.Component {
    render() {
        const fields = [{
            title: '收货人',
            field: 'addressee'
        }, {
            title: '收获手机号',
            field: 'mobile'
        }, {
            title: '收货地址',
            field: 'loanAmount',
            render: (v, d) => {
                return d.province + d.city + d.area + d.detail;
            }
        }, {
            title: '客户',
            field: 'startDatetime',
            type: 'datetime'
        }, {
            title: '所属客户编号',
            field: 'userId',
            search: true
        }, {
            title: '是否默认',
            field: 'isDefault',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        return this.props.buildList({
            fields,
            pageCode: 805167
        });
    }
}

export default Tool;
