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
} from '@redux/biz/footprint';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    getUserId,
    getUserName,
    dateTimeFormat
} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.footPrint,
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
class FootPrint extends React.Component {
    render() {
        const fields = [{
            title: '分类',
            field: 'type',
            key: 'action_type',
            type: 'select',
            search: true
        }, {
            title: '针对类型',
            key: 'action_to_type',
            type: 'select',
            field: 'toType',
            search: true
        }, {
            title: '针对对象',
            field: 'toCode',
            render: (v, d) => {
                return d.car ? d.car.name : d.carNews ? d.carNews.title : '';
            }
        }, {
            title: '操作人',
            field: 'creater',
            render: (v, d) => {
                return d.user ? d.user.loginName : d.user.realName;
            }
        }, {
            title: '操作时间',
            field: 'createDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630465
        });
    }
}

export default FootPrint;
