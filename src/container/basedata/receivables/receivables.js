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
            field: 'companyCode1',
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
            field: 'companyCode',
            render: (v, d, props) => {
                if (d.type === '2') {
                    let company = this.state.companyData.filter(item => {
                        return item.code === v;
                    });
                    return company.length === 1 ? company[0].fullName : v;
                } else if (d.type === '3') {
                    let company = this.state.companyData.filter(item => {
                        return item.code === v;
                    });
                    return company.length === 1 ? company[0].fullName : v;
                }
                let oCompanyData = this.state.o_companyData.filter(item =>
                    item.code === v);
                return oCompanyData[0] && oCompanyData[0].name;
            }
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
