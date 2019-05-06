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
    render() {
        const fields = [{
            title: '账号类型',
            field: 'type',
            required: true,
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '分公司收款账号'
            }, {
                dkey: '2',
                dvalue: '经销商收款账号'
            }, {
                dkey: '3',
                dvalue: '经销商返点账号'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
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
            // render: (v, d, props) => {
            //     if (d.type === '2') {
            //         fetch(632067, {}).then(data => {
            //             data.forEach(d => d.name = d.fullName);
            //         });
            //         return
            //     }
            // },
            required: true
        }, {
            title: '户名',
            field: 'bankcardNumber'
        }, {
            title: '开户行',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '支行',
            field: 'subbranch',
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
