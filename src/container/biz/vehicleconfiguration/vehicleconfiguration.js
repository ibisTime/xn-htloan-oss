import React from 'react';
import {Modal} from 'antd';
import fetch from 'common/js/fetch';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/vehicleconfiguration';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getUserId,
    getUserName,
    dateTimeFormat
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.bizVehicleconfiguration,
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
class Vehicleconfiguration extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630445,
            deleteCode: 630444
        });
    }
}

export default Vehicleconfiguration;
