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
} from '@redux/basedata/receivables';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.basedataReceivables,
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
class receivables extends React.Component {
    state = {
        companyData: [],
        o_companyData: []
    };
    componentDidMount() {
        fetch(632067).then(data => {
            this.setState({
                companyData: data
            });
        });
        fetch(630106, {typeList: [1]}).then(data => {
            this.setState({
                o_companyData: data
            });
        });
    }
    render() {
        const fields = [{
            title: '账号类型',
            field: 'type',
            required: true,
            type: 'select',
            key: 'collect_type',
            keyName: 'dkey',
            valueName: 'dvalue',
            search: true
        }, {
            title: '公司名称',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            search: true,
            valueName: 'name',
            required: true,
            hidden: true
        }, {
            title: '公司名称',
            field: 'companyName'
        }, {
            title: '开户行-支行',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            render(v, d) {
                return `${v}-${d.subbranch}`;
            },
            required: true
        }, {
            title: '账号',
            field: 'bankcardNumber'
        }, {
            title: '收款比例(%)',
            field: 'pointRate'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632005,
            deleteCode: 632001
        });
    }
}

export default receivables;
